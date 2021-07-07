from django.urls import path
from walkMaps import views

app_name = 'walkMaps'
urlpatterns = [
    path('', views.main_map, name='main_map'),
]
