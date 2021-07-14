from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Tag(models.Model):
    content = models.CharField(max_length=20)

    def __str__(self):
        return self.content

class MapImage(models.Model):
    url = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

class Walkroad(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    
    title = models.TextField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    start = models.TextField(blank=True)
    finish = models.TextField(blank=True)
    tmi = models.TextField(blank=True)
    distance = models.IntegerField(default=0)
    time = models.IntegerField(default=0)
    path = models.JSONField(default=dict)
    like_users = models.ManyToManyField(User, blank=True, related_name='like_walkroads', through='Like')
    tags = models.ManyToManyField(Tag, blank=True, related_name='walkroads')
    images = models.ManyToManyField(MapImage, blank=True, related_name='walkroads')

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    
    def update_date(self):
        self.update_at = timezone.now()
        self.save()

    def __str__(self):
        return f'walkroad id={self.id}, user_id={self.author.id}, username={self.author.profile.username}, title={self.title}, description={self.description}, tmi={self.tmi}'

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    walkroad = models.ForeignKey(Walkroad, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

class Comment(models.Model):
    content = models.TextField()
    walkroad = models.ForeignKey(Walkroad, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'[walkroad: {self.walkroad}] {self.content}'
