from django.http.response import JsonResponse
from maps.models import Walkroad
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'maps/index.html')

def map(request):
    return render(request, 'maps/map.html')

def post(request):
    return render(request, 'maps/post.html')

def show(request, id):
    return render(request, 'maps/show.html')

def new(request):
    if request.method == 'POST':
        username = request.POST['username']
        walkroad_name = request.POST['walkroad_name']
        walkroad_map = request.POST['walkroad_map']

        Walkroad.objects.create(user_id=request.user.id, username=username, walkroad_name=walkroad_name, walkroad_map=walkroad_map)
        return JsonResponse({
            'walkRoad': walkroad_map
        })

    if request.method == 'GET':
        return render(request, 'maps/new.html')
        