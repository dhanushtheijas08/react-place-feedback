import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./SingleCity.module.css";
import { useCityContext } from "../../contexts/CityContext";
import BackButton from "../../components/BackButton";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function SingleCity() {
  const { fetchCurrentCityData, currentCity } = useCityContext();

  const { id } = useParams();
  useEffect(
    function () {
      fetchCurrentCityData(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className="mx-auto lg:max-w-md bg-slate-800 px-5 py-8 rounded-lg my-5">
      <div>
        <h6 className="text-sm text-text-secondary-color">CITY NAME</h6>
        <h3 className="text-xl lg:text-2xl  text-white opacity-80 mt-1 mb-5 md:mb-6">
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div>
        <h6 className="text-sm text-text-secondary-color uppercase ">
          You went to {cityName} on
        </h6>
        <p className="md:text-xl text-white opacity-80 mt-1 mb-6">
          {formatDate(date || null)}
        </p>
      </div>

      {notes && (
        <div>
          <h6 className="text-sm text-text-secondary-color uppercase ">
            Your notes
          </h6>
          <p className="lg:text-xl text-white opacity-80 mt-1 mb-6">{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6 className="text-sm text-text-secondary-color uppercase ">
          Learn more
        </h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
          className="md:text-xl text-white opacity-80 mb-6"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>

        <BackButton />
      </div>
    </div>
  );
}

export default SingleCity;
