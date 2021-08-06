import os
from uuid import uuid4
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Tag(models.Model):
    content = models.CharField(max_length=20)

    def __str__(self):
        return self.content

class Walkroad(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.TextField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    start = models.TextField(blank=True)
    finish = models.TextField(blank=True)
    tmi = models.TextField(blank=True)
    distance = models.IntegerField(default=0)
    time = models.IntegerField(default=0)
    path = models.JSONField(default=dict)
    infowindow = models.JSONField(default=dict)
    like_users = models.ManyToManyField(User, blank=True, related_name='like_walkroads', through='Like')
    tags = models.ManyToManyField(Tag, blank=True, related_name='walkroads')

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    
    def update_date(self):
        self.update_at = timezone.now()
        self.save()

    def __str__(self):
            return f'walkroad id={self.id}, user_id={self.author.id}, title={self.title}'

class MapImage(models.Model):
    def date_upload_to(instance, filename):
      ymd_path = timezone.now().strftime('%Y/%m/%d') 
      uuid_name = uuid4().hex
      extension = os.path.splitext(filename)[-1].lower()
      return '/'.join([
        'walkroad/image',
        ymd_path,
        uuid_name + extension,
      ])

    image = models.ImageField(upload_to=date_upload_to, null=True)
    walkroad = models.ForeignKey(Walkroad, on_delete=models.CASCADE, null=True)
    thumbnail = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    walkroad = models.ForeignKey(Walkroad, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

class Comment(models.Model):
    content = models.TextField()
    walkroad = models.ForeignKey(Walkroad, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(User, blank=True, related_name='like_comments', through='CommentLike')

    def __str__(self):
        return f'walkroad: {self.walkroad}, content: {self.content}, created_at:{self.created_at}'

class CommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
