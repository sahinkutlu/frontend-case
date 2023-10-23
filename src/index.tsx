import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import MultiSelect from './components/MultiSelect/MultiSelect';
import reportWebVitals from './reportWebVitals';
import data from '../src/data/items.json'
import image from '../src/assets/images/multi-select-filter.jpg'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <main className={"container"}>
        <article>
            <h1>Olması gereken:</h1>
            <img src={image} alt={"Olması Gereken"} width={327} />
        </article>
        <article>
            <h1>Pixel-Perfect Çıktı</h1>
            <MultiSelect title={'Kategoriler'} items={data} placeholder={"kategori ara..."} searchText={"Ara"} errorText={"Sonuç Bulunamadı"}/>
        </article>
    </main>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
