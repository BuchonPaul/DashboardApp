import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

// Création du contexte
export const SysVarContext = createContext();

// Fournisseur du contexte qui gère l'état de la location
export const SysVarProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <SysVarContext.Provider value={{ location, errorMsg }}>
      {children}
    </SysVarContext.Provider>
  );
};
