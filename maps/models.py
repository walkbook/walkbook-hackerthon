from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Walkroad(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=20, blank=True)
    
    walkroad_name = models.CharField(max_length=100, default=username)
    walkroad_info = models.TextField(blank=True)
    walkroad_start = models.TextField(blank=True)
    walkroad_finish = models.TextField(blank=True)
    walkroad_tmi = models.TextField(blank=True)
    walkroad_picpath = models.TextField(blank=True)
    walkroad_time = models.TextField(blank=True)
    walkroad_map = models.JSONField(default=dict)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    
    def update_date(self):
        self.update_at = timezone.now()
        self.save()

    def __str__(self):
        return f'walkroad id={self.id}, user_id={self.user.id}, username={self.username}, walkroad_name={self.walkroad_name}, walkroad_info={self.walkroad_info}, walkroad_tmi={self.walkroad_tmi}'
