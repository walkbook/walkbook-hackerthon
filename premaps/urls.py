from django.urls import path
from premaps import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'premaps'
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)