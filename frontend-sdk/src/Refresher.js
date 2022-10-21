import React, { useState } from "react";

export const RefreshContext = React.createContext();

const Refresher = ({ children }) => {
  const [refreshToken, setSeed] = useState(0);

  const refreshPage = () => {
    setSeed(Math.random() * 100);
  };

  return (
    <RefreshContext.Provider value={{ refreshPage, refreshToken }}>
      <div className="hidden">Refresh Value: {refreshToken}</div>
      {children}
    </RefreshContext.Provider>
  );
};

export default Refresher;
