import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LocationObject } from "expo-location";
import { SysVarContext } from "@/hooks/useSysVar";

const useFetchStations = (location: LocationObject) => {
  const { apiAdress } = useContext(SysVarContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true); // Set loading to true while fetching data

        const response = await axios.get(`${apiAdress}/stations`, {
          params: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });
        setData(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des données");
      } finally {
        setLoading(false); // Set loading to false after data fetching completes
      }
    };

    if (location) {
      fetchStations();
    }
  }, [location, apiAdress]);

  return { data, loading, error };
};

export default useFetchStations;
