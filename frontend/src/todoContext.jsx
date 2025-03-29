import { createContext, useState } from "react";

export const EditContext = createContext();
export const EditProvider = ({ children }) => {
  const [editData, setEditData] = useState(null);

  return (
    <EditContext.Provider value={{ editData, setEditData }}>
      {children}
    </EditContext.Provider>
  );
};
