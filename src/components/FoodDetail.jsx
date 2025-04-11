import React, { useEffect, useState } from "react";
import styles from "./foodDetail.module.css";

const FoodDetail = React.forwardRef(({ foodId }, ref) => {
  const [food, setFood] = useState({});
  const URL = `${import.meta.env.VITE_FETCH_INFO}${foodId}/information`;
  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await fetch(
          `${URL}?apiKey=${import.meta.env.VITE_API_KEY}`
        );

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        setFood(data);
      } catch (error) {
        console.error("Failed to fetch food details:", error);
        setFood(null);
      }
    }

    if (foodId) {
      fetchFood();
    }
  }, [foodId]);

  return (
    <div ref={ref} className={styles.foodDetailContainer}>
      <div className={styles.foodHeader}>
        <h1 className={styles.foodTitle}>{food.title}</h1>
        <div className={styles.metaInfo}>
          <span className={styles.metaItem}>
            <strong>Time: {food.readyInMinutes} mins</strong>
          </span>
          <span className={styles.metaItem}>
            <strong>Servings: {food.servings}</strong>
          </span>
        </div>
      </div>

      <div className={styles.instructionsSection}>
        <h2 className={styles.sectionTitle}>Instructions</h2>
        <ul className={styles.instructionsList}>
          {food.analyzedInstructions?.[0]?.steps?.map((step) => (
            <li key={step.number} className={styles.instructionStep}>
              <span className={styles.stepNumber}>Step {step.number}</span>
              {step.step}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.ingredientsSection}>
        <h2 className={styles.sectionTitle}>Ingredients</h2>
        <div className={styles.ingredientsList}>
          {food.extendedIngredients?.map((item) => (
            <div key={item.id} className={styles.ingredientsItems}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default FoodDetail;
