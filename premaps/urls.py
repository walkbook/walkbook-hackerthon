from django.urls import path
from premaps import views

app_name = 'premaps'
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new')
]
