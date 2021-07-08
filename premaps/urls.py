from django.urls import path
from premaps import views

app_name = 'premaps'
urlpatterns = [
    path('', views.index, name='premap_index'),
]
