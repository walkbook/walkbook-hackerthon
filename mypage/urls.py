from django.urls import path
from mypage import views

app_name = 'mypage'
urlpatterns = [
    path('<int:id>/', views.mypage, name='mypage'),
    path('<int:id>/profile/', views.profile, name='profile'),
]
