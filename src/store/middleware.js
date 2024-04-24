//MIDDLEWARE
const cartMiddleware = ({ getState }) => {
    return (next) => (action) => {
      const result = next(action);
      localStorage.setItem("cartData", JSON.stringify(getState()));
      return result;
    };
  };