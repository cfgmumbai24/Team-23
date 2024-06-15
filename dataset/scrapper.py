# website: https://www.myehaat.in/en/store/my-e-haat/sellers/janardan-prasad-memorial-multipurpose-social-service-society

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import json

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=chrome_options)

driver.get("https://www.myehaat.in/en/store/my-e-haat/sellers/janardan-prasad-memorial-multipurpose-social-service-society")

def scroll_to_end(driver):
    SCROLL_PAUSE_TIME = 2
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(SCROLL_PAUSE_TIME)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

scroll_to_end(driver)

a_tags = driver.find_elements(By.TAG_NAME, 'a')
product_links = []

for a_tag in a_tags:
    href = a_tag.get_attribute('href')
    if href and '/product/' in href:
        product_links.append(href)

def extract_product_details(driver, link):
    driver.get(link)
    time.sleep(2)  # Ensure the page loads

    # Extract images
    img_tags = driver.find_elements(By.TAG_NAME, 'img')
    images = [img.get_attribute('src') for img in img_tags if img.get_attribute('src').endswith(('240x240.JPG', '640x640.JPG'))]

    # Extract name
    name_element = driver.find_element(By.CLASS_NAME, 'name.ms-m-0.ms-fs-20')
    name = name_element.text

    # Extract price
    price_element = driver.find_element(By.CLASS_NAME, 'price-new.ms-fs-26.ng-binding')
    price = price_element.text

    # Extract stock
    stock_element = driver.find_element(By.CSS_SELECTOR, '[class*="stock_left"]')
    stock = stock_element.text

    # Extract features
    features_element = driver.find_element(By.CLASS_NAME, 'row.features.ng-scope')
    features = features_element.text

    # Extract description
    description_element = driver.find_element(By.CLASS_NAME, 'product-description.ng-scope')
    description = description_element.text

    # Extract specifications
    specifications_element = driver.find_element(By.CLASS_NAME, 'table.table-responsive.table-bordered.specification')
    specifications = {}
    for row in specifications_element.find_elements(By.TAG_NAME, 'tr'):
        cols = row.find_elements(By.TAG_NAME, 'td')
        if len(cols) == 2:
            key = cols[0].text
            value = cols[1].text
            specifications[key] = value

    return {
        'product': link,
        'details': {
            'images': images,
            'name': name,
            'price': price,
            'stock': stock,
            'features': features,
            'description': description,
            'specifications': specifications
        }
    }

all_products = []
for link in product_links:
    product_details = extract_product_details(driver, link)
    all_products.append(product_details)

with open('product_details.json', 'w') as f:
    json.dump(all_products, f, indent=4)

driver.quit()
