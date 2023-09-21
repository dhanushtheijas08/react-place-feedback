import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9210";
const CitiesContexts = createContext();
function CityContextProvider({ children }) {
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  async function fetchCityData() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      setCityData(data);
    } catch {
      console.log("Error");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(function () {
    fetchCityData();
  }, []);

  async function fetchCurrentCityData(id) {
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();
    setCurrentCity(data);
  }
  async function postCityData(cityData) {
    const url = "http://localhost:9210/cities/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cityData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setCityData((prev) => [...prev, responseData]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  }
  async function deleteCityData(id) {
    const url = "http://localhost:9210/cities";
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setCityData((prev) => {
        const newCity = prev.filter((city) => city.id !== id);
        return newCity;
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  }
  return (
    <CitiesContexts.Provider
      value={{
        cityData,
        isLoading,
        currentCity,
        fetchCurrentCityData,
        postCityData,
        deleteCityData,
      }}
    >
      {children}
    </CitiesContexts.Provider>
  );
}

function useCityContext() {
  const context = useContext(CitiesContexts);
  return context;
}
export default CityContextProvider;
export { useCityContext };
