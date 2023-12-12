/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import styles from './page.module.css'
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [cookies, setCookie] = useCookies(['']);

  useEffect(() => {
    const savedSelectedItems = cookies.selectedItems;
    if (savedSelectedItems?.length>0 && products) {
      setSelectedItems(savedSelectedItems);
      const filteredProducts_ = products.filter(product =>
        savedSelectedItems.some(selectedItem => product.includes(selectedItem))
      );
      sortSelectedFilterElements()

      setFilteredProducts(filteredProducts_);
    }
  }, [cookies,products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch('assets/categories.json'),
          fetch('assets/items.json')
        ]);

        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json()
        ]);

        const filteredCategories = categoriesData.data.filter(element =>
          element.toLowerCase().includes(filterText.toLowerCase())
        ).sort();
        setCategories(filteredCategories);
  
        setFilteredCategories(filteredCategories);
        setProducts(productsData.data);
        setFilteredProducts(productsData.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    return ()=>{
      setSelectedItems([])
    }
  }, []);

  useEffect(() => {
    if (filterText.length < 1) {
      setFilteredCategories(categories);
      const nonSelected = categories.filter(value => !selectedItems.includes(value)).sort();
      const newSelected = categories.filter(value => selectedItems.includes(value)).sort();

      const newArr = [...newSelected, ...nonSelected];
      setCookie('selectedItems', selectedItems, { path: '/' });
      setFilteredCategories(newArr);
    } else {
      const filteredCategories_ = categories.filter(value =>
        value.toLowerCase().includes(filterText.toLowerCase())
      );
      const nonSelected = filteredCategories_.filter(value => !selectedItems.includes(value)).sort();
      const newSelected = filteredCategories_.filter(value => selectedItems.includes(value)).sort();

      const newArr = [...newSelected, ...nonSelected];
      setCookie('selectedItems', selectedItems, { path: '/' });
      setFilteredCategories(newArr);
      //setFilteredCategories(filteredCategories_);
    }
  }, [filterText]);

  useEffect(() => {
    sortSelectedFilterElements();
  }, [selectedItems]);

  const handleCheckboxChange = (value) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(value)) {
        return prevSelectedItems.filter((item) => item !== value);
      } else {
        return [...prevSelectedItems, value];
      }
    });
  };

  const sortSelectedFilterElements = () => {
    const nonSelected = categories.filter(value => !selectedItems.includes(value)).sort();
    const newArr = [...selectedItems, ...nonSelected];
    setCookie('selectedItems', selectedItems, { path: '/' });
    setFilteredCategories(newArr);
  };

  const handleSearchClick = () => {
    if (selectedItems.length < 1) {
      setFilteredProducts(products);
    } else {
      const filteredProducts_ = products.filter(product =>
        selectedItems.some(item => product.toLowerCase().includes(item.toLowerCase()))
      );
      setFilteredProducts(filteredProducts_);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.categories}>
          <div className={styles.categoriesHeader}>Kategoriler</div>
          <input
            className={styles.categoriesInput}
            type="text"
            id="myInput"
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Kategori ara..."
            title="Type in a name"
          />
          <div className={styles.categoriesBox}>
            {filteredCategories.map((value, index) => (
              <div key={index} className={styles.categoriesElements}>
                <input
                  type="checkbox"
                  id={`category-${index}`}
                  name="interest"
                  value={value}
                  checked={selectedItems.includes(value)}                  
                  onChange={() => handleCheckboxChange(value)}
                />
                <label htmlFor={`category-${index}`} className={selectedItems.includes(value)?styles.selectedTextInputStyle:styles.textInputStyle}>
                  {value}
                </label>
              </div>
            ))}
          </div>
          <button className={styles.button} onClick={handleSearchClick}>
            Ara
          </button>
        </div>
        <div className={styles.products}>
          {filteredProducts.map((value, index) => (
            <div key={index} className={styles.cardElements}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
