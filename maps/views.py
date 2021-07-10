from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'maps/index.html')

def map(request):
    return render(request, 'maps/map.html')

def post(request):
    return render(request, 'maps/post.html')

def show(request):
    return render(request, 'maps/show.html')

def new(request):
    return render(request, 'maps/new.html')
    