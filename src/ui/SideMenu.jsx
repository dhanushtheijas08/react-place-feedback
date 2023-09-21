import React from "react";
import CityList from "../feature/city/CityList";
import { useCityContext } from "../contexts/CityContext";
import Spinner from "../components/Spinner";
export default function SideMenu() {
  const { isLoading } = useCityContext();
  return (
    <div>
      <h3 className="text-xl md:text-2xl mx-auto w-fit text-white bg-slate-800 px-3 py-1 rounded-lg my-3 md:my-5 ">
        City List
      </h3>
      {isLoading ? <Spinner /> : <CityList />}
    </div>
  );
}
