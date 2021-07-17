from django.db import connections
from django.http import request
from django.http.response import JsonResponse
from maps.models import Walkroad, Like
from django.shortcuts import redirect, render
from django.db.models import Q, Count
from django.views.generic import ListView

# Create your views here.
def index(request):
    return render(request, 'maps/index.html')

def map(request):
    return render(request, 'maps/map.html')

class PostView(ListView):
    model = Walkroad
    template_name = 'maps/post.html'
    context_object_name = 'walkroads'
    def get_queryset(self):
        type = self.request.GET.get('type', '')
        keyword = self.request.GET.get('keyword', '')
        sort = self.request.GET.get('sort', '')

        if sort == 'date':
            walkroads = Walkroad.objects.all().annotate(count=Count('like_users')).order_by('-created_at', '-count')
        else :
            walkroads = Walkroad.objects.all().annotate(count=Count('like_users')).order_by('-count', '-created_at')
        
        if type == 'all':
            walkroads = walkroads.filter(Q(title__icontains=keyword) | Q(description__icontains=keyword))
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

        context['keyword'] = keyword
        context['type'] = type
        context['sort'] = sort
        
        return context

def show(request, id):
    walkroad = Walkroad.objects.get(id=id)
    return render(request, 'maps/show.html', { 
        'walkroad': walkroad,
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
            infowindow = infowindow
            )
        
        return JsonResponse({
            'id': walkroad.id
        })

    if request.user.is_anonymous:
        return redirect('login')
    else:
        return render(request, 'maps/new.html')

def update(request, id):
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']
        start = request.POST['start']
        finish = request.POST['finish']
        tmi = request.POST['tmi']
        Walkroad.objects.filter(id=id).update(title=title, description=description, start=start, finish=finish, tmi=tmi)
        return redirect('maps:show', id)
        
    walkroad = Walkroad.objects.get(id=id)
    if request.user == walkroad.author:
        return render(request, 'maps/update.html', { 'walkroad': walkroad })
    else:
        return redirect('maps:show', id)

def delete(request, id):
    walkroad = Walkroad.objects.get(id=id)
    walkroad.delete()
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
