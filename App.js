import React from "react";
import Expo, { AppLoading } from "expo";
import { Provider } from "react-redux";

// Store
import store from "./store";

// Component
import HomePage from "./Components/HomePage";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  }
}

export default App;
