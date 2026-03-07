import { createContext, useState } from "react";

export const SustainabilityContext = createContext();

export default function SustainabilityProvider({ children }) {
  const [scores, setScores] = useState({
    composite: 0,
    carbon: 0,
    water: 0,
    energy: 0,
    waste: 0,
    lifestyle: 0,
  });

  return (
    <SustainabilityContext.Provider value={{ scores, setScores }}>
      {children}
    </SustainabilityContext.Provider>
  );
}
