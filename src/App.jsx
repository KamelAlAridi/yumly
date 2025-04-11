import React, { useRef, useState } from "react";
import Search from "./components/Search";
import Foodlist from "./components/Foodlist";
import Nav from "./components/Nav";
import styles from "./app.module.css";
import FoodDetail from "./components/FoodDetail";
import Footer from "./components/Footer";
import ImageSlider from "./components/ImageSlider";

export default function App() {
  const [foodData, setFoodData] = useState([]);
  const [foodId, setfoodId] = useState("");
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("pizza");
  const foodDetailRef = useRef(null);
  const slides = [
    {
      url: "/images/slider/pizza.jpg",
      alt: "Delicious Pizza",
      caption: "Pizza",
    },
    {
      url: "/images/slider/sushi.jpg",
      alt: "Japanese Sushi",
      caption: "Sushi",
    },
    {
      url: "/images/slider/soup.jpg",
      alt: "Hot Soup",
      caption: "Soup",
    },
    {
      url: "/images/slider/pasta.jpg",
      alt: "Italian Pasta",
      caption: "Pasta",
    },
    {
      url: "/images/slider/pancake.jpg",
      alt: "Sweet Pancake",
      caption: "Pancake",
    },
    {
      url: "/images/slider/friedChicken.jpg",
      alt: "Crispy Fried Chicken",
      caption: "Fried Chicken",
    },
    {
      url: "/images/slider/cake.jpg",
      alt: "Cake",
      caption: "Cake",
    },
    {
      url: "/images/slider/burger.jpg",
      alt: "Perfect Burger",
      caption: "Burger",
    },
  ];

  const handleSlideClick = (index) => {
    setQuery(slides[index].caption);
  };

  const scrollToDetails = () => {
    if (foodDetailRef.current) {
      foodDetailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={styles.appContainer}>
      {apiError ? (
        <div>
          <Nav />
          <div className={styles.mainContent}>
            <div className={styles.test}>
              <div className={styles.errorContainer}>
                <h2>Oops! Something went wrong</h2>
                <p>{apiError}</p>
                <p>Please try again later.</p>
              </div>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Nav />
          <ImageSlider
            slides={slides}
            onSlideClick={handleSlideClick}
            slideInterval={5000}
          />
          <Search
            foodData={foodData}
            setFoodData={setFoodData}
            setApiError={setApiError}
            setIsLoading={setIsLoading}
            query={query}
            setQuery={setQuery}
          />
          {isLoading ? (
            <div className={styles.loading}>Loading recipes...</div>
          ) : (
            <Foodlist
              foodData={foodData}
              setfoodId={setfoodId}
              scrollToDetails={scrollToDetails}
            />
          )}
          <FoodDetail foodId={foodId} ref={foodDetailRef} />
          <Footer />
        </div>
      )}
    </div>
  );
}
