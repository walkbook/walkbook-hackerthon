from os import walk
from django.http.response import JsonResponse
from maps.models import Walkroad, Like, Comment, CommentLike, Tag
from django.shortcuts import redirect, render
from django.db.models import Q, Count
from django.views.generic import ListView
from itertools import chain
import json

def index(request):
    return render(request, 'maps/index.html')

def map(request):
    if request.method == 'GET':
        type = request.GET.get('type', '')
        keyword = request.GET.get('keyword', '')

        walkroads = Walkroad.objects.all().annotate(like_count=Count('like_users'))

        if type == 'all':
            walkroads = walkroads.filter(Q(title__icontains=keyword) | Q(description__icontains=keyword) | Q(tmi__icontains=keyword))
        elif type == 'title':
            walkroads = walkroads.filter(Q(title__icontains=keyword))
        elif type == 'titlecontent':
            walkroads = walkroads.filter(Q(title__icontains=keyword) | Q(description__icontains=keyword))

        walkroad_paths = list(walkroads.values('id', 'path'))
        walkroads = json.dumps(list(walkroads.values('author', 'title', 'description', 'distance', 'time', 'like_count', 'id')))

        return render(request, 'maps/map.html', { 
            'walkroads': walkroads,
            'walkroad_paths': walkroad_paths,
            'type' : type,
            'keyword': keyword
        })

class PostView(ListView):
    model = Walkroad
    template_name = 'maps/post.html'
    context_object_name = 'walkroads'
    def get_queryset(self):
        type = self.request.GET.get('type', '')
        keyword = self.request.GET.get('keyword', '')
        sort = self.request.GET.get('sort', '')
        tag_content = self.request.GET.get('tag', '')

        if tag_content != '':
            tag = Tag.objects.get(content=tag_content)
            walkroads = Walkroad.objects.filter(tags=tag)
        else:
            walkroads = Walkroad.objects.all()

        if sort == 'date':
            walkroads = walkroads.annotate(count=Count('like_users')).order_by('-created_at', '-count')
        else :
            walkroads = walkroads.annotate(count=Count('like_users')).order_by('-count', '-created_at')
        
        if type == 'all':
            walkroads = walkroads.filter(Q(title__icontains=keyword) | Q(description__icontains=keyword) | Q(tmi__icontains=keyword))
        elif type == 'title':
            walkroads = walkroads.filter(Q(title__icontains=keyword))
        elif type == 'titlecontent':
            walkroads = walkroads.filter(Q(title__icontains=keyword) | Q(description__icontains=keyword))
        
        return walkroads

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        type = self.request.GET.get('type', '')
        keyword = self.request.GET.get('keyword', '')
        sort = self.request.GET.get('sort', '')
        tag_content = self.request.GET.get('tag', '')

        context['keyword'] = keyword
        context['type'] = type
        context['sort'] = sort
        context['tag_content'] = tag_content

        context['tags'] = Tag.objects.all().annotate(count=Count('walkroads')).order_by('-count')[:8]
        
        return context

def show(request, id):
    walkroad = Walkroad.objects.get(id=id)
    tags = Tag.objects.filter(walkroads=walkroad)
    return render(request, 'maps/show.html', { 
        'walkroad': walkroad,
        'tags': tags,
        })

def new(request):
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']
        start = request.POST['start']
        finish = request.POST['finish']
        tmi = request.POST['tmi']
        distance = request.POST['distance']
        time = request.POST['time']
        path = request.POST['path']
        infowindow = request.POST['infowindow']

        walkroad = Walkroad.objects.create(
            author = request.user,
            title = title,
            description = description,
            start = start,
            finish = finish,
            tmi = tmi,
            distance = distance,
            time = time,
            path = path,
            infowindow = infowindow,
            )

        tags = request.POST.getlist('tags')
        for tag in tags:
            newTag = Tag.objects.get(id = tag)
            walkroad.tags.add(newTag)
        deleteUnusedTag()
        images = request.FILES.getlist('images')

        if len(images) > 0:
            walkroad.thumbnail = images[0]
            walkroad.save()

        return JsonResponse({
            'id': walkroad.id
        })

    if request.user.is_anonymous:
        return redirect('login')
    else:
        return render(request, 'maps/new.html')

def deleteUnusedTag():
    for tag in Tag.objects.all():
        if tag.walkroads.count() == 0:
            tag.delete()

def update(request, id):
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']
        start = request.POST['start']
        finish = request.POST['finish']
        tmi = request.POST['tmi']
        walkroad = Walkroad.objects.filter(id=id)
        walkroad.update(title=title, description=description, start=start, finish=finish, tmi=tmi)

        tags = request.POST.getlist('tags')
        walkroad.first().tags.clear()
        for tag in tags:
            newTag = Tag.objects.get(content = tag)
            walkroad.first().tags.add(newTag)

        deleteUnusedTag()

        if bool(request.FILES.get('thumbnail', False)) == True:
            walkroad = Walkroad.objects.get(id=id)
            walkroad.thumbnail = request.FILES['thumbnail']
            walkroad.save()
            
        return redirect('maps:show', id)
        
    walkroad = Walkroad.objects.get(id=id)
    tags = Tag.objects.filter(walkroads=walkroad)
    if request.user == walkroad.author:
        return render(request, 'maps/update.html', { 'walkroad': walkroad, 'tags': tags })
    else:
        return redirect('maps:show', id)

def delete(request, id):
    walkroad = Walkroad.objects.get(id=id)
    walkroad.delete()
    deleteUnusedTag()
    return redirect('maps:post')

class LikeView:
    def create(request, id):
        walkroad = Walkroad.objects.get(id=id)
        like_list = walkroad.like_set.filter(user_id=request.user.id)
        if like_list.count() > 0:
            walkroad.like_set.get(user=request.user).delete()
        else:
            Like.objects.create(user=request.user, walkroad=walkroad)
        return JsonResponse({
            'walkroadLikeOfUser': like_list.count(), 
            'walkroadLikeCount': walkroad.like_set.count(),
		})

class CommentView:
    def create(request, id):
        content = request.POST['content']
        comment = Comment.objects.create(walkroad_id=id, content=content, author=request.user)
        current_time = comment.created_at.strftime('%Y/%m/%d %H:%M')
        walkroad = Walkroad.objects.get(id=id)
        return JsonResponse({
            'commentId': comment.id,
            'commentCount': walkroad.comment_set.count(),
            'commentLikeCount': comment.like_users.count(), 
            'createdTime': current_time,
            'authorName': request.user.profile.username,
            'authorId': request.user.id
        })
        
    def delete(request, id, cid):
        comment = Comment.objects.get(id=cid)
        comment.delete()
        walkroad = Walkroad.objects.get(id=id)
        return JsonResponse({'commentCount': walkroad.comment_set.count()})

class CommentLikeView:
    def create(request, cid):
        comment = Comment.objects.get(id=cid)
        like_list = comment.commentlike_set.filter(user_id=request.user.id)
        if like_list.count() > 0:
            comment.commentlike_set.get(user=request.user).delete()
        else:
            CommentLike.objects.create(user=request.user, comment=comment)
        return JsonResponse({'commentLikeCount': comment.commentlike_set.count()})

class TagView:
    def create(request):
        tag = Tag.objects.filter(content=request.POST['content'])
        if tag.count() == 0:
            newTag = Tag.objects.create(content=request.POST['content'])
            return JsonResponse({
                'tag': newTag.id
            })
        return JsonResponse({
                'tag': tag.first().id
        })
            