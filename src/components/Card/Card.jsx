import React from 'react'
import styles from "../SearchPage/SearchPage.module.css";

const Card = ({ images, onSelectImage }) => {
  console.log(styles)
  return (
    <div className={styles.imageGrid}>
      {images.map((img) => (
        <div key={img.id} className={styles.imageItem}>
          <img
            src={img.urls.small}
            alt={img.alt_description || "Unsplash Image"}
            onClick={() => onSelectImage(img.urls.regular)}
          />
          <button onClick={() => onSelectImage(img.urls.regular)}>
            Add Caption
          </button>
        </div>
      ))}
    </div>
  );
};
export default Card
