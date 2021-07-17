from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
from django.http import JsonResponse
from .models import Profile
from django import forms
from django.contrib.auth.forms import AuthenticationForm

class SignUpView:
  def signup(request):
    if request.method  == 'POST':
      user = User.objects.create_user(username=request.POST['userid'], password=request.POST['password1'])
      user.profile.username=request.POST['username']
      user.profile.sex=request.POST['sex']
      user.profile.age=request.POST['age']
      user.profile.location=request.POST['location']
      user.save()
      
      auth.login(request, user, backend='django.contrib.auth.backends.ModelBackend')
      return redirect('/')
    return render(request, 'accounts/signup.html')
    
  def checkid(request):
    if request.method == 'POST':
      try:
        user = User.objects.get(username=request.POST['userid'])
      except Exception as e:
        user = None
      return JsonResponse({
        'isAvailable': True if user is None else False 
      })

class MyinfoView:
  def myinfo(request):
    if request.method == 'GET':
      user = User.objects.get(id=request.user.id)
      return render(request, 'accounts/myinfo.html',{ 'user': user })
    
    elif request.method == 'POST':
      user = User.objects.get(id=request.user.id)
      profile = Profile.objects.filter(user = request.user)

      profile.update(username=request.POST['username'], sex=request.POST['sex'], age=request.POST['age'], location=request.POST['location'])

      user.set_password(request.POST['password1'])
      user.save()
      auth.login(request, user, backend='django.contrib.auth.backends.ModelBackend')
      return redirect('/')
  
  def checkpw(request):
    if request.method == 'GET':
      user = User.objects.get(id=request.user.id)
      return render(request, 'accounts/checkpw.html')

    elif request.method == 'POST':
      user = User.objects.get(id=request.user.id)
      password = request.POST['password']
      return JsonResponse({
        'result': user.check_password(password)
      })
