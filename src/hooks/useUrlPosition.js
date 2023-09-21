import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [location] = useSearchParams();
  return [location.get("lat"), location.get("lng")];
}

export { useUrlPosition };
