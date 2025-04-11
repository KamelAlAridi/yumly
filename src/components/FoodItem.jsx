import React from "react";
import styles from "./fooditem.module.css";

export default function FoodItem({ food, setfoodId, scrollToDetails }) {
  const handler = () => {
    setfoodId(food.id);
    scrollToDetails();
  };
  return (
    <div className={styles.container}>
      <img
        className={styles.imgitem}
        src={food.image}
        alt={food.title + "Photo"}
      />
      <div className={styles.itemContent}>
        <p className={styles.name}>{food.title}</p>
      </div>
      <div className={styles.buttoncont}>
        <button onClick={handler} className={styles.itembutton}>
          View Recipe
        </button>
      </div>
    </div>
  );
}
