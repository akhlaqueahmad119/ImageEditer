import React, { useState } from "react";
import axios from "axios";
import styles from "./SearchPage.module.css";
import Card from "../Card/Card";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY; 
const API_URL = import.meta.env.VITE_UNSPLASH_API_URL; 

function SearchPage({ onSelectImage }) {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search term");
      return;
    }

    setLoading(true);
    setImages([]); 
    setErrorMessage(""); 

    try {
      const response = await axios.get(API_URL, {
        params: {
          query,
          client_id: API_KEY,
          per_page: 12,
        },
      });

      if (response.data.results.length === 0) {
        setErrorMessage("😔 No data available for your search term.");
      } else {
        setImages(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setErrorMessage("Failed to fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.header}>
        <p className={styles.userInfo}>
          <strong>Name:</strong> Akhlaque Ahmad
          <br />
          <strong>Email:</strong> akhlaque0979@gmail.com
        </p>
      </div>

      <div className={styles.searchContainer}>
        <h1>Image Search</h1>
        <input
          type="text"
          placeholder="Enter your search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          {" "}
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {errorMessage && (
        <div className={styles.noData}>
          <p>{errorMessage}</p>
        </div>
      )}
      <Card images={images} onSelectImage={onSelectImage} />
    </div>
  );
}

export default React.memo(SearchPage);
