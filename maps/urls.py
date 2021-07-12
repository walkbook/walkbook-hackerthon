from django.urls import path
from maps import views

app_name = 'maps'
urlpatterns = [
    path('map/', views.map, name='map'),
    path('post/', views.post, name='post'),
    path('new/', views.new, name='new'),
    path('<int:id>/', views.show, name='show'),
    path('<int:id>/update', views.update, name='update'),
    path('<int:id>/delete', views.delete, name='delete'),
]
