import { useEffect, useState } from "react";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { useNavigate } from "react-router";
import { useCityContext } from "../../contexts/CityContext";
import Message from "../../components/Message";
import { useAuthentication } from "../../contexts/Authentication";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const {
    state: { currentUser },
  } = useAuthentication();
  const { postCityData, cityData } = useCityContext();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [countryEmoji, setCountryEmoji] = useState("");
  const [errorInCode, setErrorInCode] = useState("");
  useEffect(() => {
    async function fetchGeolocationDetials() {
      try {
        setErrorInCode("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );

        if (!res.ok)
          throw new Error(
            `Network response was not ok (${res.status} ${res.statusText})`
          );

        const data = await res.json();
        if (!data.countryCode) {
          throw new Error("City Does Not Exist, Click Somewhere");
        }
        setCityName(data.name || data.locality || "");
        setCountry(data.countryName || "");
        setCountryEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorInCode(err.message);
      }
    }
    fetchGeolocationDetials();
  }, [lat, lng]);
  function handleFormSubmit(e) {
    e.preventDefault();
    navigate("/map/location");
    const newCityData = {
      cityName,
      country,
      emoji: countryEmoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
      owner: currentUser.userName,
    };
    const isDuplicate = findDuplicate(cityData, newCityData);
    console.log(isDuplicate);
    if (!isDuplicate) postCityData(newCityData);
    setErrorInCode("Duplicate City Data");
  }
  if (errorInCode) return <Message hasBackButton>{errorInCode}</Message>;

  return (
    <form
      className="text-white bg-slate-800 px-4 py-6 lg:px-8 md:py-4 lg:py-8 rounded-lg mb-10 md:mb-0 w-fit mx-auto flex flex-col lg:max-w-[26rem] gap-5"
      onSubmit={handleFormSubmit}
    >
      <div className="">
        <label htmlFor="cityName" className="lg:text-xl opacity-80">
          Country name
        </label>
        <div className="relative mt-1">
          <input
            id="countryName"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            className="relative w-full px-2 lg:px-3 lg:py-0.5 rounded-md text-lg  text-text-primary-color"
          />
          <span className="absolute right-2 text-xl lg:text-2xl">
            {countryEmoji}
          </span>
        </div>
      </div>
      <div className="">
        <label htmlFor="cityName" className="lg:text-xl opacity-80">
          City name
        </label>
        <div className="relative mt-1">
          <input
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
            className="w-full px-2 lg:px-3  lg:py-0.5 rounded-md text-lg  text-text-primary-color"
          />
        </div>
      </div>

      <div className="">
        <label htmlFor="date" className="lg:text-xl opacity-80">
          When did you go to {cityName}?
        </label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className="mt-1 w-full px-2 lg:px-3 lg:py-0.5 rounded-md text-lg text-text-primary-color"
        />
      </div>

      <div className="">
        <label htmlFor="notes" className="lg:text-xl opacity-80">
          Notes about your trip to {cityName}
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          className="w-full px-2 lg:px-3 lg:py-0.5 rounded-md text-lg text-text-primary-color mt-1"
        />
      </div>
      <div>
        <button className="text-white bg-primay-color rounded text-lg lg:text-2xl w-full py-1">
          Add To List
        </button>
      </div>
    </form>
  );
}

function findDuplicate(allCityData, singleCityData) {
  allCityData.forEach((city) => {
    console.log(singleCityData);

    if (city.cityName === singleCityData.cityName) return true;
  });

  return false;
}

export default Form;
