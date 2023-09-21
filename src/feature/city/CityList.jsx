import React from "react";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import { useCityContext } from "../../contexts/CityContext";
import Message from "../../components/Message";

export default function CityList() {
  const { cityData } = useCityContext();
  const renderCityList = cityData.map((city) => (
    <CityItem city={city} key={city.id} />
  ));
  return (
    <ul
      className={`lg:px-[35px] flex flex-col gap-6 max-h-72  overflow-y-scroll mb-10 md:mb-0 ${styles.cityList}`}
    >
      {renderCityList.length < 1 ? (
        <Message>No City Found 😅</Message>
      ) : (
        renderCityList
      )}
    </ul>
  );
}
