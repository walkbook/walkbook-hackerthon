from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth

def signup(request):
  if request.method  == 'POST':
    if request.POST['password1'] == request.POST['password2']:
      user = User.objects.create_user(username=request.POST['userid'], password=request.POST['password1'])
      user.profile.username=request.POST['username']
      user.profile.sex=request.POST['sex']
      user.profile.age=request.POST['age']
      user.profile.location=request.POST['location']
      user.save()
      
      auth.login(request, user)
      return redirect('/')

  return render(request, 'accounts/signup.html')
  