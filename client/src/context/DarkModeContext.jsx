import { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export default function DarkModeProvider({ children }) {
  const [dk, setDk] = useState(localStorage.getItem('dk') === 'true'?true:false);
  localStorage.setItem("dk", dk);
  const toggleDarkMode = () => {
    const newDk = !dk;
    localStorage.setItem("dk", newDk);
    setDk(newDk);
  };

  return (
    <DarkModeContext.Provider value={{ dk, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}