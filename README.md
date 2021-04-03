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


A) Docker

  * Build docker container

        sudo docker run -d \
        -p 3000:3000 \
        --name=dcardhw \
        teddy12155555/dcardreacthw
  * Check the Website on **localhost:3000**
        


B) NPM

  * Clone repository first:

        git clone https://github.com/Teddy12155555/dcard-hw.git
  * Into folder root:

        cd dcard-hw
  * Install all requirements

        npm install
  * Start the React Server

        npm start
  * Check the Website on **localhost:3000**



# Architecture
此次架構是設計版面的話使用 Bootstrap 做排版，因為比較快速簡單，又不會太醜，處理 API 服務的則是使用 Axios，使用了 TW icon 的一個小 icon，關於路由的設定是使用了 react-router-dom 來達成此專案之要求。

以下為此專案之 src/ 下重要的 File Structure

```
index.js
App.js
route.js

components/
  allcity.js
  api.js
  Breadcrumb.js
  dataloader.js
  homepage.js
  navbar.js
  scenicspot.js 
```

### App.js
因為要求要每個頁面都能跳轉所有景點或是縣市之景點，因此放在 Navbar 上面即可。

這邊使用預先建立好的 route 做不同 route 的 render。

```javascript=
class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar /> // Navbar component
        {renderRoutes(routes)} // use react-router-dom
      </div>
    );
  }
}
```
### routes.js
此次設計有主要的頁面為 Haom Page 跟 ScenicSpot 因此在這邊只有這兩個 component，但是因為要符合縣市之 route，因此加入 /:id 讓網址可以讀取縣市之 route。

```javascript=
const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    breadcrumbName: 'Home Page'
  },
  {
    path: '/scenicSpot',
    component: ScenicSpot,
    breadcrumbName: 'Scenic Spot',
    routes: [
      {
        path: '/scenicSpot/:id',
        component: ScenicSpot,
      }
    ]
  }
];
```
### Navbar

在導覽列的部分就加入了 [TW icon](https://www.twicon.page) 可愛的 icon，以及有全部景點及下拉式選的的縣市景點。
![](https://i.imgur.com/SriUrHy.png)

全部縣市則是定義在 ***allcity.js***，這樣如果要增減會比較方便。

```javascript=
// allcity.js

const citysList = ['Taipei','NewTaipei','Taoyuan','Taichung','Tainan','Kaohsiung','Keelung','Hsinchu','HsinchuCounty','MiaoliCounty','ChanghuaCounty','NantouCounty','YunlinCounty','YunlinCounty','Chiayi','PingtungCounty','YilanCounty','HualienCounty','TaitungCounty','KinmenCounty','PenghuCounty','LienchiangCounty']

export { citysList };
```

### Breadcrumb.js
此設計是可以透過 route 來實作麵包屑，讓使用者可以知道目前的位置。
因此不管在 Home Page 還是顯示景點列表的 Page 都能看到此 component。

### api.js
在 ***api.js*** 中負責管理 api，先建立共同 base 網址。
```javascript=
// Base URL
const AllCityURL = axios.create({
    baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism'
  });

```
因為 v2 需要在 header 放 AppID、AppKey 跟日期做 sha 加密的認證，因此在這裡也定義 Request 的 Header。

```javascript=
const GetAuthorizationHeader = () => {
    //var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    var AppID = 'f08a670a8da84f10bc48956541a162ae';
    //var AppKey = 'z0HRyC8EpYidJC+a7J6PdgKIwhU=';
    var AppKey = 'LOG_5CbrfmIb6OYE-20XsNQNws8';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString ,'Accept-Encoding': 'gzip'};
}
```

最後定義 call Request 的 function，輸入 url 跟認證 header 來發 request。
```javascript=
const APItest = url => AllCityURL.get(url, GetAuthorizationHeader());
```


### homepage.js, scenicspot.js 
這兩個為負責 render 首頁跟景點列表的 component，其中在 **scenicspot** 中可以透過 route 的 */:id* 中 match 出不同的縣市。

在 **scenicspot** 中負責 render 景點列表的為 ***dataloader.js***。

**dataloader** 負責根據不同的縣市或是全部的景點，經由 api.js 中的 function 去發 request ，並實作出第一次載入 30 筆，滑到頁面最下面再依序發 request。


### 架構圖
- Home Page
![](https://i.imgur.com/At4ZUZU.png)

- 景點列表
![](https://i.imgur.com/4nYNBOE.png)




