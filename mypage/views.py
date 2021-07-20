from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from accounts.models import Profile
from maps.models import Walkroad
import json

# Create your views here.
def mypage(request):
    if request.user.is_authenticated == False:
        return redirect('login')    
    if request.method == 'GET':
        user = User.objects.get(id=request.user.id)      
        registeredWalkroads = Walkroad.objects.filter(author=user)
        likedWalkroads = user.like_walkroads.all()
        
        my_walkroads = json.dumps(list(registeredWalkroads.values('author', 'title', 'description', 'distance', 'time', 'like_users', 'id')))
        my_walkroad_paths = list(registeredWalkroads.values('id', 'path'))

        like_walkroads = json.dumps(list(likedWalkroads.values('author', 'title', 'description', 'distance', 'time', 'like_users', 'id')))
        like_walkroad_paths = list(registeredWalkroads.values('id', 'path'))

        return render(request, 'mypage/mypage.html', {
          'user': user,
          'registeredWalkroads': registeredWalkroads,
          'likedWalkroads': likedWalkroads,
          'my_walkroads': my_walkroads,
          'my_walkroad_paths': my_walkroad_paths,
          'like_walkroads': like_walkroads,
          'like_walkroad_paths': like_walkroad_paths
        })

def profile(request):
    if request.user.is_authenticated == False:
        return redirect('login')
    if request.method =='GET':    
        user = User.objects.get(id=request.user.id) 
        return render(request, 'mypage/profile.html', {'user': user})

    elif request.method =='POST':
        user = User.objects.get(id=request.user.id)     
        profile = Profile.objects.filter(user = user) 
        
        feature = request.POST['feature']
        likehour = request.POST['likehour']
        introduce = request.POST['introduce']
        profile.update(feature=feature, likehour=likehour, introduce=introduce)

        return redirect('mypage:mypage')
