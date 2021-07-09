from django.urls import path
from maps import views

app_name = 'maps'
urlpatterns = [
    path('', views.map, name='map'),
]
