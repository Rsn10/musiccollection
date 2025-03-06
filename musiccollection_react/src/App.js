import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import Loader from "./components/loader";
import Routes from "./router";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes />
        <Loader />
      </Provider>
    </>
  );
};

export default App;