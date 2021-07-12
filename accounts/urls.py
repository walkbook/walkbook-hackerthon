from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

import maps.views
import accounts.views

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('signup/', accounts.views.SignUpView.signup, name='signup'),
    path('signup/checkid/', accounts.views.SignUpView.checkid, name='checkid'),
    path('myinfo/', accounts.views.MyinfoView.myinfo, name='myinfo'),
    path('checkpw/', accounts.views.MyinfoView.checkpw, name='checkpw'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
