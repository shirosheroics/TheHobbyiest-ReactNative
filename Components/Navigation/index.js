import React from "react";
import { createStackNavigator } from "react-navigation";

// Components
import ItemList from "../ItemList";
import ItemDetail from "../ItemDetail";
import Login from "../Login";
import Profile from "../Profile";
import AddressList from "../AddressList";
import AddressDetail from "../AddressDetail";

export default createStackNavigator(
  {
    ItemList: ItemList,
    ItemDetail: ItemDetail,
    Login: Login,
    Profile: Profile,
    AddressList: AddressList,
    AddressDetail: AddressDetail
  },
  {
    initialRouteName: "ItemList",
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "transparent"
      },
      headerTextStyle: {
        fontWeight: "bold",
        color: "white"
      }
    },
    cardStyle: {
      backgroundColor: "#73BAE3"
    }
  }
);
