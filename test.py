import requests
url = 'http://127.0.0.1:3000/unsecure'
files = {'file': open('image.jpg', 'rb')}
r = requests.post(url, files = files)
