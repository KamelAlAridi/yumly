import React from "react";
import FoodItem from "./FoodItem";
import styles from "./foodlist.module.css";

export default function Foodlist({ foodData, setfoodId, scrollToDetails }) {
  return (
    <div className={styles.container}>
      {foodData.map((food) => (
        <FoodItem
          key={food.id}
          food={food}
          setfoodId={setfoodId}
          scrollToDetails={scrollToDetails}
        />
      ))}
    </div>
  );
}
