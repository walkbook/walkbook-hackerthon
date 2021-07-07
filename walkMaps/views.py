from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'walkMaps/index.html')

def main_map(request):
  return render(request, 'walkMaps/main_map.html')