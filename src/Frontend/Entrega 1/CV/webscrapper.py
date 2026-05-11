import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def baixar_imagens_google(query, pasta="imagens", limite=50):
    if not os.path.exists(pasta):
        os.makedirs(pasta)

    # Configura navegador
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    # Acessa Google Imagens
    driver.get("https://www.google.com/imghp")

    # Aceitar cookies (caso apareça)
    try:
        botao = driver.find_element(By.XPATH, "//button[contains(., 'Aceitar')]")
        botao.click()
    except:
        pass

    # Pesquisa
    caixa_pesquisa = driver.find_element(By.NAME, "q")
    caixa_pesquisa.send_keys(query)
    caixa_pesquisa.send_keys(Keys.RETURN)

    time.sleep(2)

    # Scroll para carregar imagens
    for _ in range(5):
        driver.find_element(By.TAG_NAME, "body").send_keys(Keys.END)
        time.sleep(2)

    imagens = driver.find_elements(By.CSS_SELECTOR, "img")

    urls = set()

    for img in imagens:
        src = img.get_attribute("src")
        if src and "http" in src:
            urls.add(src)

    print(f"Encontradas {len(urls)} imagens")

    count = 0

    for url in urls:
        try:
            img_data = requests.get(url, timeout=5).content
            with open(os.path.join(pasta, f"img_{count}_06.jpg"), "wb") as f:
                f.write(img_data)
            print(f"Baixado {count}")
            count += 1
            if count >= limite:
                break
        except:
            pass
    driver.quit()
# EXEMPLO
baixar_imagens_google("oléo mercado", "dataset/oleo", 220)