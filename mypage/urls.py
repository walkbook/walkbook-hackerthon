from django.urls import path
from mypage import views

app_name = 'mypage'
urlpatterns = [
    path('', views.index, name='index'),
]
