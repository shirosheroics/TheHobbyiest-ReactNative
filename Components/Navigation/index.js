import React from "react";
import { createStackNavigator } from "react-navigation";

// Components
import ItemList from "../ItemList";
import ItemDetail from "../ItemDetail";
import Login from "../Login";

export default createStackNavigator(
  {
    ItemList: ItemList,
    ItemDetail: ItemDetail,
    Login: Login
  },
  {
    initialRouteName: "ItemList",
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "transparent"
      },
      headerTextStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "rgb(20,90,100)"
    }
  }
);
