import { Link } from "react-router-dom";
import { useCityContext } from "../../contexts/CityContext";
import deleteIcon from "../../assets/delete.svg";
import { useAuthentication } from "../../contexts/Authentication";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    year: "numeric",
    month: "long",
  }).format(new Date(date));
function CityItem({ city }) {
  const {
    state: { currentUser },
  } = useAuthentication();
  const { cityName, emoji, date, id, position, owner } = city;
  const { currentCity, deleteCityData } = useCityContext();
  const handleDelete = function () {
    deleteCityData(id);
  };
  return (
    <li className="flex relative w-full justify-center">
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`w-full flex text-white bg-slate-800  py-2 rounded-lg px-3 justify-between items-center ${
          currentCity.id === id
            ? "border-l-indigo-500 border-l-4"
            : "border-l-transparent"
        }`}
      >
        <div>
          <span className="text-3xl mr-2"> {emoji} </span>
          <h3 className="text-2xl inline"> {cityName} </h3>
        </div>
        <time className="hidden lg:block text-lg pr-10">
          {formatDate(date)}
        </time>
      </Link>
      {currentUser.userName === owner && (
        <span className="absolute right-2 cursor-pointer top-[50%] translate-y-[-50%]">
          <img
            onClick={handleDelete}
            src={deleteIcon}
            alt="Delete"
            className="rounded-full hover:bg-indigo-500 p-1"
          />
        </span>
      )}
    </li>
  );
}

export default CityItem;
