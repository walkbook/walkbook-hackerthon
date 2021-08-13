from django.urls import path
from maps import views

app_name = 'maps'
urlpatterns = [
    path('map/', views.map, name='map'),
    path('post/', views.PostView.as_view(), name='post'),
    path('new/', views.new, name='new'),
    path('<int:id>/', views.show, name='show'),
    path('<int:id>/update', views.update, name='update'),
    path('<int:id>/delete', views.delete, name='delete'),
    path('<int:id>/like/', views.LikeView.create, name='like'),
    path('<int:id>/comments/', views.CommentView.create, name='comment_create'),
    path('<int:id>/comments/<int:cid>/', views.CommentView.delete, name='comment_delete'),
    path('<int:cid>/commentlike/', views.CommentLikeView.create, name='commentlike'),
    path('tag/', views.TagView.create, name='tag'),
]
