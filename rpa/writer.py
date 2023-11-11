from selenium import webdriver
from selenium.webdriver.common.by import By
from requests import post

from time import sleep
from json import dumps

from selenium.webdriver.common.actions.wheel_input import ScrollOrigin
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options


chrome_options = Options()
chrome_options.add_argument("--headless")


driver = webdriver.Chrome()


with open('museums.txt') as f:
    places = f.readlines()

for i in places:
    try:
        driver.get(i)
        # input()
        # sleep(10)

        name = driver.find_element(By.CLASS_NAME, 'orgpage-header-view__header').text

        try:
            phone = driver.find_element(By.CLASS_NAME, 'orgpage-phones-view__phone-number').text
        except:
            phone = 'Телефон не указан'

        try:
            adress = driver.find_element(By.CLASS_NAME, 'orgpage-header-view__address').text
        except:
            adress = 'Адрес не у казан'

        time_btn = driver.find_element(By.CLASS_NAME, 'business-working-status-flip-view')
        time_btn.click()

        time_days = driver.find_elements(By.CLASS_NAME, 'business-working-intervals-view__day')
        time_hours = driver.find_elements(By.CLASS_NAME, 'business-working-intervals-view__interval')
        time = {}
        for j in range(len(time_days)):
            try:
                time[time_days[j].text] = [time_hours[j].text]
            except Exception:
                time[time_days[j].text] = ['Выходной']

        link = 'https://yandex.ru/maps/?text=' + name + ' ' + adress
        driver.find_element(By.CLASS_NAME, 'close-button').click()

        driver.get(driver.current_url.replace('/?ll=', '/features/?ll=', 1))

        tags = []
        for j in driver.find_elements(By.CLASS_NAME, 'business-features-view__bool-item'):
            tags.append(j.text)

        features = {}
        featuresTitle = driver.find_elements(By.CLASS_NAME, 'business-features-view__valued-title')
        featuresValue = driver.find_elements(By.CLASS_NAME, 'business-features-view__valued-value')
        for j in range(len(featuresTitle)):
            features[featuresTitle[j].text.rstrip(':')] = featuresValue[j].text.split(', ')

        if 'Особенности заведения' in list(features.keys()):
            tags += list(map(lambda x: x.capitalize(), features['Особенности заведения']))

        new_tags = []
        for k in tags:
            new_tags.append({"name": k})



        bill = []
        if 'Цены' in features.keys():
            bill.append(str(features['Цены'][0]))
        if 'Средний счёт' in features.keys():
            bill.append(str(features['Средний счёт'][0]))
        if bill == []:
            bill = ['Цены не указаны']


        if 'Кухня' in features.keys():
            cusine = features['Кухня']
        else:
            cusine = None

        driver.get(driver.current_url.replace('features', 'gallery', 1))

        photos = {}
        sleep(.5)

        for j in driver.find_elements(By.CLASS_NAME, '_view_secondary-gray'):
            # if j.text == 'Внутри':
            j.click()
            scroll_origin = ScrollOrigin.from_element(driver.find_element(By.CLASS_NAME, 'media-wrapper__media'), 0, 0)
            ActionChains(driver) \
                .scroll_from_origin(scroll_origin, 0, 999999999) \
                .perform()
            sleep(.5)
            photos[j.text] = []
            for k in driver.find_elements(By.CLASS_NAME, 'media-wrapper__media'):
                photos[j.text].append(k.get_attribute('src'))
            # elif j.text == 'Еда':
            #     j.click()
            #     scroll_origin = ScrollOrigin.from_element(driver.find_element(By.CLASS_NAME, 'media-wrapper__media'), 0, 0)
            #     ActionChains(driver) \
            #         .scroll_from_origin(scroll_origin, 0, 999999999) \
            #         .perform()
            #     sleep(.5)
            #     for k in driver.find_elements(By.CLASS_NAME, 'media-wrapper__media'):
            #         food_photos.append(k.get_attribute('src'))
            # elif j.text == 'Снаружи':
            #     j.click()
            #     scroll_origin = ScrollOrigin.from_element(driver.find_element(By.CLASS_NAME, 'media-wrapper__media'), 0, 0)
            #     ActionChains(driver) \
            #         .scroll_from_origin(scroll_origin, 0, 999999999) \
            #         .perform()
            #     sleep(.5)
            #     for k in driver.find_elements(By.CLASS_NAME, 'media-wrapper__media'):
            #         outside_photos.append(k.get_attribute('src'))

        menu = {}
        for j in driver.find_elements(By.CLASS_NAME, 'tabs-select-view__title'):
            if j.text == 'Меню':
                j.click()
                sleep(1)
                scroll_origin = ScrollOrigin.from_element(driver.find_element(By.CLASS_NAME, 'business-full-items-grouped-view__item'), 0, 0)
                ActionChains(driver) \
                    .scroll_from_origin(scroll_origin, 0, 999999999) \
                    .perform()
                for k in driver.find_elements(By.CLASS_NAME, 'business-full-items-grouped-view__item'):
                    try:
                        img = k.find_element(By.CLASS_NAME, 'image__img')
                        info = k.find_element(By.CLASS_NAME, 'related-item-photo-view__info')
                        title = info.find_element(By.CLASS_NAME, 'related-item-photo-view__title')
                        try:
                            description = info.find_element(By.CLASS_NAME, 'related-item-photo-view__description').text
                        except:
                            description = None
                        try:
                            volume = info.find_element(By.CLASS_NAME, 'related-product-view__volume').text
                            if 'гр' in volume:
                                weight = volume
                                volume = None
                            else:
                                weight = None
                        except:
                            volume = None
                            weight = None

                        price = info.find_element(By.CLASS_NAME, 'related-product-view__price')
                        final = {"img": img.get_attribute("src"), "price": price.text}
                        if description is not None:
                            final["description"] = description
                        if volume is not None:
                            final["volume"] = volume
                        if weight is not None:
                            final["weight"] = weight
                        menu[title.text] = final
                    except:
                        pass

        try:
            # if inside_photos and outside_photos and food_photos and cusine != None:
            print(name)
            print(adress)
            print(link)
            print(phone)
            # print(description)
            # print(description_vector)
            print(time)
            print(photos)
            print(menu)
            print(features)
            # print(features_vector)
            print(new_tags)
            # print(tags_vector)
            req = post('http://92.53.105.117:8080/place/create', json={
                "name": name,
                "address": adress,
                "link": link,
                "phone_number": phone,
                "work_hours": time,
                "photos": photos,
                "menu": menu,
                "features": features,
                "tags": new_tags
            })
            print(name, req.text)
        except Exception as e:
            print(e)

        sleep(1)
    except Exception as e:
        print('ебаный бобаный', e)


