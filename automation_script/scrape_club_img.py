import requests 
from bs4 import BeautifulSoup 
from urllib3.exceptions import InsecureRequestWarning
from urllib3 import disable_warnings
import os

disable_warnings(InsecureRequestWarning)
def getdata(url): 
    r = requests.get(url,verify=False) 
    return r.text 
    
htmldata = getdata("https://su.psgtech.ac.in/clubs.php") 
soup = BeautifulSoup(htmldata, 'html.parser') 

for item in soup.find_all('img'):
    img=item.get('src')
    # print(img)
    parenturl="https://su.psgtech.ac.in"
    if img[:2]=='..':
        img=parenturl+img[2:]
    else:
        img=parenturl+"/"+img
    name=img.split('/')
    if len(name)==7:
        name=name[-2]+".png"
    else:
        name=name[-1]
    # print(name)
    r = requests.get(img,verify=False).content
    try:
        # possibility of decode
        r = str(r, 'utf-8')
        print("Im here")
    except UnicodeDecodeError:
        if not os.path.exists(os.getcwd()+"/automation_script/scrapeclubimages"):
            os.mkdir(os.getcwd()+"/automation_script/scrapeclubimages")
        with open(f"{os.getcwd()}/automation_script/scrapeclubimages/{name}", "wb+") as f:
            f.write(r)

