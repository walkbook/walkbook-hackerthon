import os
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from uuid import uuid4

class Profile(models.Model):
  SEX_CHOICES = [
		('M', '남자'),
		('F', '여자'),
		('U', '선택안함'),
	]
  
  AGE_CHOICES = [
		('0', '10세 미만'),
		('10', '10대'),
		('20', '20대'),
		('30', '30대'),
		('40', '40대'),
		('50', '50대'),
		('60', '60대이상'),
		('U' , '선택안함'),
	]

  def date_upload_to(instance, filename):
    ymd_path = timezone.now().strftime('%Y/%m/%d') 
    uuid_name = uuid4().hex
    extension = os.path.splitext(filename)[-1].lower()
    return '/'.join([
      ymd_path,
      uuid_name + extension,
    ])

  avatar = models.ImageField(upload_to=date_upload_to, null=True)
  user = models.OneToOneField(User, on_delete=models.CASCADE)
	#django에선 문자열 타입은 null이 아닌 빈 문자열이 convention
  username = models.CharField(max_length=20, blank=True) 
  sex = models.CharField(max_length=1, choices=SEX_CHOICES, blank=True)
  age = models.CharField(max_length=2, choices=AGE_CHOICES, blank=True)
  location = models.TextField(blank=True)

  feature = models.TextField(blank=True)
  likehour = models.TextField(blank=True)
  introduce = models.TextField(blank=True)
  
  def __str__(self):
    return f'id={self.id}, user_id={self.user.id}, username={self.username}, sex={self.sex}, age={self.age}, location={self.location}'
  
  @receiver(post_save, sender=User) #user가 저장된 이후(post) signal을 받는 receiver
  def create_user_profile(sender, instance, created, **kwargs):
    if created:
      Profile.objects.create(user=instance)
	
  @receiver(post_save, sender=User)
  def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
