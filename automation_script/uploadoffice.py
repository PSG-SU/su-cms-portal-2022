import json
from selenium import webdriver
import time
web = webdriver.Chrome()
web.maximize_window()

data = json.load(
    open(r'backend-sdk/json-olddata/subearers.json', encoding='utf-8'))
n = len(data)
assn = []
club = []
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

cm = web.find_element_by_xpath(
    """//*[@id="root"]/main/nav/div[2]/a[5]/div""").click()

d = {
    "Chairperson": 2,
    "Co-Chairperson": 3,
    "Secretary(Men)": 4,
    "Secretary(Women)": 5,
    "Secretary(Science)": 6,
    "Associate Chairperson": 7
}

y = {
    "2022-2023": 2,
    "2021-2022": 3,
    "2020-2021": 4,
    "2019-2020": 5,
    "2018-2019": 6,
    "2017-2018": 7,
    "2016-2017": 8,
    "2015-2016": 9,
    "2014-2015": 10,
    "2013-2014": 11,
}

for i in range(0, n):

    name = data[i]["name"]
    roll = data[i]["roll"]
    year = data[i]["year"]
    dept = data[i]["dept"]
    img = data[i]["imge"]

    nd = web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[1]/div[1]/div/input""")

    # z = True
    # while z:
    #     x = nd.text
    #     if x == "":
    #         z = False

    nd.send_keys(name)

    web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[1]/div[2]/div/select""").click()
    web.find_element_by_xpath(
        f'//*[@id="root"]/main/div/section/section/div[2]/div[1]/div[2]/div/select/option[{d[roll]}]').click()

    web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[2]/div[1]/div/select""").click()
    web.find_element_by_xpath(
        f'//*[@id="root"]/main/div/section/section/div[2]/div[2]/div[1]/div/select/option[{y[year]}]').click()

    cd = web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[2]/div[2]/div/input""")
    cd.send_keys(dept)

    im = web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[3]/div/div/div/div/label/input""")
    im.send_keys(img)

    web.find_element_by_xpath(
        """//*[@id="root"]/main/div/section/section/div[2]/div[4]/button""").click()

    time.sleep(6)
