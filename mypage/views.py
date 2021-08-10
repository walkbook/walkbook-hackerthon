from botocore.retries import bucket
from main.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.db.models import Count
from accounts.models import Profile
from maps.models import Walkroad
import json, boto3

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
        profile = Profile.objects.get(user = user)
        
        profile.feature = request.POST['feature']
        profile.likehour = request.POST['likehour']
        profile.introduce = request.POST['introduce']
        
        if len(request.FILES) != 0:
          s3_client = boto3.client(
              's3',
              aws_access_key_id=AWS_ACCESS_KEY_ID,
              aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
          )
          s3_client.delete_object(
            Bucket='walkbook',
            Key=profile.avatar.url.split("amazonaws.com/",1)[1]
          )
          avatar = request.FILES['avatar']
          profile.avatar = avatar

        profile.save()

        return redirect('mypage:mypage', id=user.id)
