import axios from 'axios';
import jsSHA from "jssha" 

// Base URL
const AllCityURL = axios.create({
    baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism'
  });

// GET all City

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
const APItest = url => AllCityURL.get(url, GetAuthorizationHeader());

export { APItest };
