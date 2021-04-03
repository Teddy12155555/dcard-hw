# 2021 Web Frontend Intern Homework 說明文件

串接交通部觀光景點 API (​MOTC Transport API V2​)，並使用​ ​React​ 實作一個瀏覽景 點的網站

![](https://i.imgur.com/YNlMmyj.jpg)


![](https://i.imgur.com/JhdHOqb.jpg)


全部​景點列表:
* 串接​GET​/v2/Tourism/ScenicSpot​回傳的資料
* 第一次只會載入 30 個景點
* 列表在滾到頁面底部時會再自動發送 API 請求 (stop 與 skip)，載入額外 30 個景點，直到沒有更多景點
* 會顯示 ID（按照 index 排序），Name（景點名稱），Description（有些景點之 Description 為空白字串）

縣市​景點列表
* 串接​ GET​ ​/v2/Tourism/ScenicSpot/{City}​ 回傳的資料
* 第一次只會載入 30 個景點
* 列表在滾到頁面底部時會再自動發送 API 請求 (stop 與 skip)，載入額外 30 個景點，直到沒有更多景點
* 會顯示 ID（按照 index 排序），Name（景點名稱），Description（景點之 DescriptionDetail）

# Installation

提供以下安裝方式:

 * `docker` 
 * `npm` 


A) Give it a try with Docker

      docker run -d \
      -p 3000:3000 \
      --name=grafana \
      -e "GF_INSTALL_PLUGINS=https://github.com/vsergeyev/loudml-grafana-app/raw/master/loudml-grafana-app-latest.zip;loudml-grafana-app" \
      grafana/grafana

Setup LoudML if needed (please refer to https://hub.docker.com/r/loudml/loudml for config.yml setup)

      docker run -p 8077:8077 \
      -v $PWD/lib/loudml:/var/lib/loudml:rw \
      -v $PWD/config.yml:/etc/loudml/config.yml:ro \
      -ti \
      loudml/loudml

B) NPM

  * Clone Repo

        cd /var/lib/grafana/plugins
  * Download loudml-grafana-app-latest.zip zip file:

        wget https://github.com/vsergeyev/loudml-grafana-app/raw/master/loudml-grafana-app-latest.zip
  * Unpack it there

        unzip loudml-grafana-app-latest.zip
  * You may remove the downloaded archive
  * Restart Grafana

C) From sources (note - default `master` branch is for Grafana 7.x)

 * Plugin should be placed in `.../grafana/data/plugins`
 * git clone https://github.com/vsergeyev/loudml-grafana-app.git
 * cd loudml-grafana-app
 * yarn
 * yarn dev --watch
 * restart Grafana
 * LoudML app should be in plugins list, you may need to activate it
 * enjoy :)

# Architecture


