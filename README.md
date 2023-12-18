Live: https://multiselect-case.vercel.app

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Case:

Adcreative.ai frontend developer pozisyonu icin hazirladigimiz bu case'de sizden React.js kullanarak multi-select autocomplete component implement etmenizi istiyoruz.
Daha sonra bu componenti "Rick and Morty" api'daki karakterleri aramak ve select etmek icin kullanacaksiniz.

Api linki: https://rickandmortyapi.com/documentation/#introduction

## Verilen assetler:

- Ornek tasarım assets/multi-select.png.

## Gereksinimler:

- React vs Typescript
- Tasarima uygun multi-select implementasyonu
- input alanina yazilan query ile api sorgulanip popup content'de listelenmesi
- Listelenen sonuclarda her bir karater icin karater resmi, ismi ve kac bolumde oynadigi bilgisinin gosterilmesi
- query icin yazilan sozcugun listelenen sonuclarda vurgulanmasi (ornek tasarimda 'ric' aramasi sonuclarinda 'Ric' bold seklinde gosterilmistir)
- secilen sonuclarin input alanina eklenmesi ve cikarilmasi
- Keyboard navigation desteklenmeli. Yon tuslari ve tab kullanarak tum islemler yapilabilmeli, input alanindaki secili ogeler veya sonuc listesindeki satirlar gezinebilmeli ve silme/secme islemleri yapilabilmeli.
- Loading state gosterimi
- Exception handling ve error statelerinin arayuzde gosterilmesi
- Ve tabi ki yazdiginiz kodun mimarisi, temiz ve okunakli olmasi belki de en onemli kriter olacaktir.

## Olsa iyi olur

- Deploy edilmis calisan hali ve linki (i.e vercel)
