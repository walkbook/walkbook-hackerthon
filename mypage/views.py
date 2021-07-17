from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from accounts.models import Profile
from maps.models import Walkroad

# Create your views here.
def mypage(request):
    if request.user.is_authenticated == False:
        return redirect('login')    
    user = User.objects.get(id=request.user.id)      
    user.likecount = user.like_walkroads.count()     
    return render(request, 'mypage/mypage.html', {'user': user})

def profile(request):
    if request.user.is_authenticated == False:
        return redirect('login')
    if request.method =='GET':    
        user = User.objects.get(id=request.user.id) 
        registered = Walkroad.objects.filter(author=user)
        liked = Walkroad.like_set.filter(user_id=request.user.id)
        return render(request, 'mypage/profile.html', {'user': user, 'registered': registered})

    elif request.method =='POST':
        user = User.objects.get(id=request.user.id)     
        profile = Profile.objects.filter(user = user) 
        
        feature = request.POST['feature']
        likehour = request.POST['likehour']
        introduce = request.POST['introduce']
        profile.update(feature=feature, likehour=likehour, introduce=introduce)

        user.likecount = user.like_walkroads.count()     
        return render(request, 'mypage/mypage.html', {'user': user})
