import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import "../twicon/twicon.css";


// function component
const HomePage = ({ location }) => {
    return (
      <div>
        <h1 className="py-3">HomePage</h1>
        <Breadcrumb locationPath={location.pathname} />
        <p>透過上方之按鈕，『找景點？』可前往所有景點，『找縣市？』為各個縣市之景點集合。</p>
        <p>Nav 上之台灣標示則可返回 HomePage</p>
      </div>
    );
};

export { HomePage }
