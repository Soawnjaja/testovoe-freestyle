'use client'
import { useState, useEffect } from "react";
import { cityData } from "./components/cityData";
import { regionData } from "./components/cityData";
import styles from './page.module.css';

export default function Home() {
  const [searchType, setSearchType] = useState('city');
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  const cities = cityData;
  const regions = Object.entries(regionData).map(([region, cities]) => ({
    region,
    cities
  }));

  function filterCities(searchText) {
    if (!searchText) return cities;
    return cities.filter(city => city.toLowerCase().includes(searchText.toLowerCase()));
  }

  function filterRegions(searchText) {
    if (!searchText) return regions;
    return regions.filter(region =>
      region.region.toLowerCase().includes(searchText.toLowerCase()) ||
      region.cities.some(city => city.toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  useEffect(() => {
    if (searchType === 'city') {
      setResults(filterCities(searchText));
    } else if (searchType === 'region') {
      setResults(filterRegions(searchText));
    }
  }, [searchType, searchText]);

  return (
    <div>
    <main className={styles.main}>
      <section>
      <h1 className={styles.page__title}>Поиск по городам и регионам</h1>
      <div className={styles.container__buttons}>
      <button className={`${styles.switch__btn} ${searchType === 'city' ? styles.active : ''}`} onClick={() => setSearchType('city')}>Поиск по названию города</button>
      <input className={styles.search__input}
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Введите название"
      />
      <button className={`${styles.switch__btn} ${searchType === 'region' ? styles.active : ''}`} onClick={() => setSearchType('region')}>Поиск по названию региона</button>
      </div>
      
      </section>
      <div className={styles.container__list}>
        <ul className={styles.list}>
          {searchType === 'city' ? (
            Object.values(filterCities(searchText)).map((city, index) => (
              <li key={index}>{city}</li>
            ))
          ) : (
            filterRegions(searchText).map(({ region, cities }, index) => (
              <li className={styles.list__item} key={index}>
                {region}:   
                {cities.join(', ')}
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  </div>
  );
}