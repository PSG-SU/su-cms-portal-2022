import json
from selenium import webdriver
import time
web = webdriver.Chrome()

data = json.load(open(r'..\backend-sdk\json-olddata\general.json',encoding='utf-8'))
n=len(data)
assn=[]
club=[]
urllogin="http://localhost:3000/login"
web.get(urllogin)
time.sleep(1)
user=web.find_element_by_xpath("""//*[@id="root"]/main/div/div[2]/div/input""")
user.send_keys("admin")
pas=web.find_elements_by_xpath("""//*[@id="root"]/main/div/div[3]/div/input""")
# pas.click()
# print(pas)
pas[0].send_keys("admin")

login=web.find_elements_by_xpath("""//*[@id="root"]/main/div/button""")
login[0].click()
time.sleep(1)
# url="http://localhost:3000/admin/club-management"
cm=web.find_element_by_xpath("""//*[@id="root"]/main/nav/div[2]/a[3]/div/p""").click()
for i in range(0,n):
    
    name=data[i]["CNAME"]
    cid = data[i]["CID"]
    if data[i]["CAT"]=='assn':
        web.find_element_by_xpath("""//*[@id="root"]/main/div/section/section/div[2]/div[1]/div/div/select""").click()
        web.find_element_by_xpath("""//*[@id="root"]/main/div/section/section/div[2]/div[1]/div/div/select/option[3]""").click()
    if data[i]["CAT"]=="club":
        web.find_element_by_xpath("""//*[@id="root"]/main/div/section/section/div[2]/div[1]/div/div/select""").click()
        web.find_element_by_xpath("""//*[@id="root"]/main/div/section/section/div[2]/div[1]/div/div/select/option[2]""").click()

    cd=web.find_element_by_xpath("""//*[@id="root"]/main/div/section/section/div[2]/div[2]/div[1]/div/input""")
    cd.send_keys(cid)
    nd=web.find_element_by_xpath("""//*[@id="root"]/main/div/section/section/div[2]/div[2]/div[2]/div/input""")
    nd.send_keys(name)
    web.find_element_by_xpath("""//*[@id="root"]/main/div/section/section/div[2]/div[3]/button""").click()
    time.sleep(1)
