// Create a context
import { createContext, useContext, useState } from 'react';

const ObjectContext = createContext();

export const ObjectProvider = ({ children }) => {
  const [myObject, setMyObject] = useState(null);
  const [liveStreamShow, setLiveStreamShow] = useState(null);
  return (
    <ObjectContext.Provider value={{ myObject, setMyObject,liveStreamShow,setLiveStreamShow }}>
      {children}
    </ObjectContext.Provider>
  );
};

export const useObject = () => useContext(ObjectContext);