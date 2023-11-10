from selenium import webdriver
from selenium.webdriver.common.by import By

from selenium.webdriver.common.actions.wheel_input import ScrollOrigin

from selenium.webdriver.common.action_chains import ActionChains


from bs4 import BeautifulSoup
from time import sleep


def find(driver, name):
    element = driver.find_element(By.CLASS_NAME, name)
    if element:
        return element
    else:
        return False

driver = webdriver.Chrome()
#55916789, 37.370664 moscow
#54798177, 32.006566 smolensk
#54.752870, 32.112603
for lat in range(32006566, 32112603, 3000):
    for lon in range(54798177, 54752870, -3000):
        try:
            print(f'{str(lat)[:2]}.{str(lat)[2:]}%2C{str(lon)[:2]}.{str(lon)[2:]}')
            # driver.get(f'https://yandex.ru/maps/213/moscow/search/%D0%93%D0%B4%D0%B5%20%D0%BF%D0%BE%D0%B5%D1%81%D1%82%D1%8C/filter/rating_threshold/gt4.7/?indoorLevel=1&ll={lat // 1000000}.{lat % 1000000}%2C{lon // 1000000}.{lon % 1000000}&sctx=ZAAAAAgBEAAaKAoSCUZe1sQCw0JAEXmT36KT40tAEhIJdjV5ymq6bj8RkGtDxTh%2FUz8iBgABAgMEBSgKOABAppIHSAFiK3JlYXJyPXNjaGVtZV9Mb2NhbC9HZW8vRW5hYmxlQmVhdXR5RmlsdGVyPTFqAnJ1nQHNzEw9oAEAqAEAvQFwh4NswgEGgauP%2BJAE6gEA8gEA%2BAEAggIT0JPQtNC1INC%2F0L7QtdGB0YLRjIoCXDE4NDEwNjM5MCQxODQxMDYzODYkMTg0MTA2Mzk2JDE4NDEwNjM5MiQxODQxMDYzODQkMTg0MTA2Mzk0JDM1MTkzMTE0OTM3JDEzODc3ODg5OTYkNzcwOTMxNTM3kgIAmgIMZGVza3RvcC1tYXBz&sll={lat // 1000000}.{lat % 1000000}%2C{lon // 1000000}.{lon % 1000000}&sspn=0.004220%2C0.001339&z=19.5')
            # driver.get(f"https://yandex.ru/maps/12/smolensk/search/%D0%93%D0%B4%D0%B5%20%D0%BF%D0%BE%D0%B5%D1%81%D1%82%D1%8C/filter/rating_threshold/gt4.7/?ll={lat // 1000000}.{lat % 1000000}%2C{lon // 1000000}.{lon % 1000000}&sctx=ZAAAAAgBEAAaKAoSCahXyjLEBUBAEXbgnBGlY0tAEhIJpBthURGnYz8RXYlA9Q8iST8iBgABAgMEBSgKOABA%2F6YNSAFqAnJ1nQHNzEw9oAEAqAEAvQFwh4Ns6gEA8gEA%2BAEAggIT0JPQtNC1INC%2F0L7QtdGB0YLRjIoCXDE4NDEwNjM5MCQxODQxMDYzODYkMTg0MTA2Mzk2JDE4NDEwNjM5MiQxODQxMDYzODQkMTg0MTA2Mzk0JDM1MTkzMTE0OTM3JDEzODc3ODg5OTYkNzcwOTMxNTM3kgIAmgIMZGVza3RvcC1tYXBzqgJQMTQxNzU0OTY0MiwxNTc1OTg5NzY0OSw3MDg5MTI2NjUwMiwyMTQ3MTA5OTYzNjgsMzgxOTIzNjAyODAsNjAwMzQ0MCwxNTM3MDgxMjk1ODk%3D&sll={lat // 1000000}.{lat % 1000000}%2C{lon // 1000000}.{lon % 1000000}&sspn=0.003636%2C0.001163&utm_source=ntp_chrome&z=19.5")
            driver.get(f"https://yandex.ru/maps/12/smolensk/category/sauna/184106356/?indoorLevel=1&ll={str(lat)[:2]}.{str(lat)[2:]}%2C{str(lon)[:2]}.{str(lon)[2:]}&sctx=ZAAAAAgBEAAaKAoSCZWBA1q6BEBAESKq8Gd4Y0tAEhIJelORCmMLuT8R9n8O8%2BUFoD8iBgABAgMEBSgKOABA%2B6YNSAFqAnJ1nQHNzEw9oAEAqAEAvQGvkR4p6gEA8gEA%2BAEAggIXY2F0ZWdvcnlfaWQ6KDE4NDEwNTg5NCmKAgkxODQxMDU4OTSSAgCaAgxkZXNrdG9wLW1hcHOqAgwxOTY2MzcyMzA5NTQ%3D&sll={str(lat)[:2]}.{str(lat)[2:]}%2C{str(lon)[:2]}.{str(lon)[2:]}&sspn=0.015695%2C0.005018&utm_source=ntp_chrome&z=17.69")
            sleep(2)
            soup = BeautifulSoup(driver.page_source, features="html.parser")
            scroll_origin = ScrollOrigin.from_element(driver.find_element(By.CLASS_NAME, 'search-snippet-view__link-overlay'), 0, 0)
            res = ''
            for j in range(100):
                ActionChains(driver) \
                        .scroll_from_origin(scroll_origin, 0, 999999999) \
                        .perform()
                sleep(1.5)
                res1 = res
                res = driver.find_elements(By.CLASS_NAME, 'search-snippet-view__link-overlay')
                scroll_origin = ScrollOrigin.from_element(res[-1], 0, 0)
                if res != '' and res1 != '':
                    if res[-1] == res1[-1]:
                        sleep(3)
                        res = driver.find_elements(By.CLASS_NAME, 'search-snippet-view__link-overlay')
                        if res[-1] == res1[-1]:
                            break
            for i in res:
                print(i.get_attribute('href'))
                with open('sauna.txt', 'a') as f:
                    f.write(i.get_attribute('href') + '\n')
            print(len(res))
        except Exception as e:
            print('ERROR D:')