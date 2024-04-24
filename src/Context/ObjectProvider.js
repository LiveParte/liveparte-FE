// Create a context
import { createContext, useContext, useState } from 'react';

const ObjectContext = createContext();

export const ObjectProvider = ({ children }) => {
  const [myObject, setMyObject] = useState({});
  const [liveStreamShow, setLiveStreamShow] = useState(null);
  const [routerLoader,setRouterLoader] =useState(null)


  const AddShows = object => {
    setMyObject(object);
  };
  return (
    <ObjectContext.Provider value={{ myObject, setMyObject,AddShows,liveStreamShow,setLiveStreamShow,routerLoader,setRouterLoader }}>
      {children}
    </ObjectContext.Provider>
  );
};

// export const useObject = () => useContext(ObjectContext);
export const useObject = () => {
  const context = useContext(ObjectContext);

  if (!context) {
    throw new Error("useObject must be used within an ObjectProvider");
  }

  return context;
};