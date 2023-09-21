import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCityContext } from "../../contexts/CityContext";
import { useNavigate } from "react-router";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Button from "../../components/Button";
import styles from "./Map.module.css";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../contexts/Authentication";
import User from "../../components/User";
export default function Map() {
  const navigate = useNavigate();
  const { cityData, currentCity } = useCityContext();
  const { user, logout } = useAuthentication();
  const [urlLat, urlLng] = useUrlPosition();
  const {
    isLoading,
    position: currentPosition,
    getPosition,
  } = useGeolocation();
  const [position, setPosition] = useState({
    lat: urlLat || 0,
    lng: urlLng || 40,
  });
  useEffect(() => {
    if (urlLat && urlLng) setPosition({ lat: urlLat, lng: urlLng });
  }, [urlLat, urlLng]);
  useEffect(() => {
    if (currentCity.position?.lat && currentCity.position?.lng) {
      setPosition({
        lat: currentCity.position.lat,
        lng: currentCity.position.lng,
      });
    }
  }, [currentCity]);
  useEffect(() => {
    if (currentPosition?.lat && currentPosition?.lng) {
      navigate(`form?lat=${currentPosition?.lat}&lng=${currentPosition?.lng}`);
    }
  }, [currentPosition]);
  const renderMarker = cityData.map((city) => {
    return (
      <Marker position={city.position} key={city.id}>
        <Popup>
          <p>
            {city.emoji} {city.notes || city.cityName}
          </p>
        </Popup>
      </Marker>
    );
  });
  return (
    <div className={` ${styles.mapContainer} w-full md:w-1/2 lg:w-[68%]`}>
      {currentPosition ? (
        ""
      ) : (
        <Button classname="text-xs md:text-xl position" onClick={getPosition}>
          {isLoading ? "Loading..." : "Current Location"}
        </Button>
      )}
      <User />
      <MapContainer
        center={[position.lat || 0, position.lng || 10]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarker}
        <ChangeCityPostion position={[position.lat || 0, position.lng || 10]} />
        <HandleMapClick />
      </MapContainer>
    </div>
  );
}

function ChangeCityPostion({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function HandleMapClick() {
  const navigate = useNavigate();
  const map = useMapEvents({
    click(e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
