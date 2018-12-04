import React from "react";
import { Font, AppLoading } from "expo";
import { Provider } from "react-redux";

// Store
import store from "./store";

// Component
import HomePage from "./Components/HomePage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsAreLoaded: false
    };
  }

  componentWillMount() {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
      "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf")
    }).then(() => this.setState({ fontsAreLoaded: true }));
  }
  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  }
}

export default App;
