import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";

// Création du contexte
export const SysVarContext = createContext();

// Fournisseur du contexte qui gère l'état de la location
export const SysVarProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [detLocation, setDetLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const apiAdress = "http://api-server-woad.vercel.app";

  const getLocationDetail = async () => {
    try {
      const response = await axios.get(apiAdress + `/locationDetails`, {
        params: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
      setDetLocation(response.data);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    getLocationDetail();
  }, [location]);

  useEffect(() => {
    getLocation();
  }, []);

  const refreshLocation = () => {
    getLocation();
  };

  return (
    <SysVarContext.Provider
      value={{ apiAdress, location, detLocation, errorMsg }}
    >
      {children}
    </SysVarContext.Provider>
  );
};
