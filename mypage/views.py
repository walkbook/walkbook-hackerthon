from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.db.models import Count
from accounts.models import Profile
from maps.models import Walkroad
import json, boto3, os
from main.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

from django.utils import timezone
from uuid import uuid4

# Create your views here.
def mypage(request, id):
    user = User.objects.get(id=id)      
    if (user is None) :
        return redirect('login')    
    if request.method == 'GET':
        registeredWalkroads = Walkroad.objects.filter(author=user).annotate(like_count=Count('like_users'))
        likedWalkroads = user.like_walkroads.all().annotate(like_count=Count('like_users'))
        
        my_walkroads = json.dumps(list(registeredWalkroads.values('author', 'title', 'description', 'distance', 'time', 'like_count', 'id')))
        my_walkroad_paths = list(registeredWalkroads.values('id', 'path'))

        like_walkroads = json.dumps(list(likedWalkroads.values('author', 'title', 'description', 'distance', 'time', 'like_count', 'id')))
        like_walkroad_paths = list(likedWalkroads.values('id', 'path'))

        return render(request, 'mypage/mypage.html', {
          'user': user,
          'registeredWalkroads': registeredWalkroads,
          'likedWalkroads': likedWalkroads,
          'my_walkroads': my_walkroads,
          'my_walkroad_paths': my_walkroad_paths,
          'like_walkroads': like_walkroads,
          'like_walkroad_paths': like_walkroad_paths
        })

def profile(request, id):
    if request.user.is_authenticated == False:
        return redirect('login')
    if request.method =='GET':    
        user = User.objects.get(id=id) 
        return render(request, 'mypage/profile.html', {'user': user})

    elif request.method =='POST':
        user = User.objects.get(id=id)     
        profile = Profile.objects.filter(user = user) 
        
        feature = request.POST['feature']
        likehour = request.POST['likehour']
        introduce = request.POST['introduce']
        
        if len(request.FILES) != 0:
       	  s3_client = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
          )
          avatar = request.FILES['avatar']
          filename = '/'.join([timezone.now().strftime('%Y/%m/%d'), uuid4().hex + os.path.splitext(str(avatar))[-1].lower()])
          print(filename)   # 여기서 'media/2021/07/30/a0c33eb5d58e47a59227cd64c8bb14df.jpeg' -> amazon에서 제대로 upload됨 
          # 근데 html에서 '/media/media..' 이런 식으로 불러옴..
          s3_client.upload_fileobj(
            avatar,
            "walkbook",
            filename,
            ExtraArgs={
                "ContentType": avatar.content_type,
            }
          )
          profile.update(feature=feature, likehour=likehour, introduce=introduce, avatar=filename)
        else: 
          profile.update(feature=feature, likehour=likehour, introduce=introduce)

        return redirect('mypage:mypage', id=user.id)
