from django.urls import path
from mypage import views

app_name = 'mypage'
urlpatterns = [
    path('', views.mypage, name='mypage'),
    path('profile/', views.profile, name='profile'),
]
