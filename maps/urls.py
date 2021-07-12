from django.urls import path
from maps import views

app_name = 'maps'
urlpatterns = [
    path('map/', views.map, name='map'),
    path('post/', views.post, name='post'),
    path('new/', views.new, name='new'),
    path('<int:id>/', views.show, name='show'),
    path('<int:id>/edit', views.edit, name='edit'),
]
