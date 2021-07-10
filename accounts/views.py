from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
from django.http import JsonResponse

class SignUpView:
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
    
  def checkid(request):
    if request.method == 'POST':
      print(request.POST['userid'])
      try:
        user = User.objects.get(username=request.POST['userid'])
      except Exception as e:
        user = None
        print(user)
      return JsonResponse({
        'isAvailable': True if user is None else False 
      })
