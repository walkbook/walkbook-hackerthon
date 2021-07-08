from django.urls import path
from walkMaps import views

app_name = 'walkMaps'
urlpatterns = [
    path('', views.index, name='index'),
]
