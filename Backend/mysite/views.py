import time
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def POSTrequestsView(request):
    if request.method == 'POST':
        body = json.loads(request.body) 
        requestsPerSecond = int(body['requestsPerSecond'])
        
        response_delay = random.randint(1, 1000) 
        time.sleep(response_delay / 1000)  
        
        response_data = {'index': body['index']}
        
        if requestsPerSecond > 50:
            return JsonResponse({'error': 'Too many requests per second'}, status=429)
        
        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'})