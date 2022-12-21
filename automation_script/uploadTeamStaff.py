import json
from selenium import webdriver
import time
web = webdriver.Chrome()
web.maximize_window()

data = json.load(
    open(r'backend-sdk/json-olddata/teamhome.json', encoding='utf-8'))
n = len(data)

urllogin = "http://localhost:3000/login"
web.get(urllogin)
time.sleep(1)
user = web.find_element_by_xpath(
    """//*[@id="root"]/main/div/div[2]/div/input""")
user.send_keys("admin")
pas = web.find_elements_by_xpath(
    """//*[@id="root"]/main/div/div[3]/div/input""")
pas[0].send_keys("admin")

login = web.find_elements_by_xpath("""//*[@id="root"]/main/div/button""")
login[0].click()
time.sleep(1)

sidebar = web.find_element_by_xpath(
    """//*[@id="root"]/main/nav/div[2]/a[4]/div""").click()

r = {
    "Chief Patron": 2,
    "Patron": 3,
    "Dean - Student Affairs": 4,
    "Associate Dean - Finance": 5,
    "Student Welfare & Councelling": 6,
    "General Functioning": 7,
    "Tech Music, Dramatics Club, Astronomy Club, Animal Welfare Club, WDC, Martial Arts Club": 8,
    "CAP & Nature Club, ELS, Entrepreneurs Club, NSS, Tamil Mandram, Fine Arts Club, YRC, Rotaract Club, Radio Hub": 9,
    "Higher Education Forum, Pathshala Club, GLF, SRC, Industry (Alumni) - Interaction Forum, Book Readers Club": 10
}

p = {
    "Managing Trustee, PSG & Sons' Charity": 2,
    "Principal": 3,
    "Associate Dean": 4,
    "Faculty Advisor": 5
}

for i in range(0, n):

    name = data[i]["Name"]
    role = data[i]["Role"]
    pos = data[i]["Position"]
    img = data[i]["img"]

    nd = web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[1]/div[1]/div/input""")

    nd.send_keys(name)

    web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[1]/div[2]/div/select""").click()
    web.find_element_by_xpath(
        f'//*[@id="root"]/main/div/section/section/div[2]/div[1]/div[2]/div/select/option[{r[role]}]').click()

    if (pos != "NULL"):
        web.find_element_by_xpath(
            """//*[@id="root"]/main/div/section/section/div[2]/div[2]/div[1]/div/select""").click()
        web.find_element_by_xpath(
            f'//*[@id="root"]/main/div/section/section/div[2]/div[2]/div[1]/div/select/option[{p[pos]}]').click()

    im = web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[2]/div[2]/div/div/div/label/input""")
    im.send_keys(img)

    web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[3]/button""").click()

    time.sleep(6)
