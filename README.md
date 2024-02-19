# DevIT Task

<h3 align="left">Implement client-server data fetch logic by following the next steps:</h3>

1. Display an input (required, type number, from 0 to 100) and the "Start" button. Clicking the "Start" button you will disable it and start sending 1000 asynchronous HTTP requests to a server's "/api" endpoint in the following way:
    - 1) The input value should be used as a concurrency limit, e.g. if concurrency is 10 - you should always have 10 active requests in your browser network console. 
    - 2) The input value should be used as requests limit per second, e.g. 10 requests per second.
    - 3) Send a request index (1, 2, 3, ....) to a server
2. Server-side logic should handle requests to "/api" endpoint:
    - 1) Make a random delay before sending a response: from 1ms to 1000ms
    - 2) A successful response data should be an index from a request
    - 3) Return 429-code error response if received more than 50 requests per second
3. Client-side JS should render the results of server responses (request indexes) to one list immediately after each response

You can choose any technology stack that you will use to implement the logic.

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/django.svg" alt="django" width="40" height="40"/> </a> <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg" alt="flask" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>  <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a> </p>

> [!IMPORTANT]
> For correct operation, you must download certain libraries and frameworks!

In working dir download Django:

`py -m pip install Django`

Install Flask:

`py -m pip install Flask`

Additional you need to install 'Access-Control-Allow-Origin' lib for Flask and Django:

For Django:

`pip install django-cors-headers`

For Flask:

`pip install flask-cors`

# Start 

First you have to start the backend part, and then start the Frontend. Since Django performs the back part, you need to start from it:

 - Start Django (Backend). Open cmd or other console. Open working dir and run server:

   - `cd /Backend`
   - `python manage.py runserver`

 - Start Flask (Frontend). Open cmd or other console. Open working dir and run client:

   - `cd /Frontend`
   - `python app.py` 

> [!WARNING]
> Django starts on localhost on port 8000 and Flask starts on all available hosts and port 8080.</br>
> If these ports are already taken, the applications will not run!

# Preview

After start backend and frontand open **http://127.0.0.1:8080**: 

![image](https://github.com/GoldSatan/DevIT_Task/assets/73445130/3f5dcdd7-86b3-45b2-ae85-b5ddf124b417)

Input two required fields and click submit:

![image](https://github.com/GoldSatan/DevIT_Task/assets/73445130/ca706851-0157-4050-a7ce-a3d2f88553b8)

After this steps request to server start!

![image](https://github.com/GoldSatan/DevIT_Task/assets/73445130/b3a83cc9-805e-4da7-8263-9664879635ea)

> [!WARNING]
> If you enter a number of requests greater than 50 (51 to 100), nothing will be logged because the backend will return a 429 error.
> You can see it in the developer console:

![image](https://github.com/GoldSatan/DevIT_Task/assets/73445130/3709d16d-9359-4a40-a443-4b9cb15afd6a)


**This is achieved using a view on the server side:**

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



<h3 align="left">Connect with me:</h3>
telegram: @vadimromaniukhere
gmail: vadim.romaniuk.here@gmail.com


