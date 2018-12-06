import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from "native-base";

// Components
import ItemList from "../ItemList";
import ItemDetail from "../ItemDetail";
import Login from "../Login";
import Profile from "../Profile";
import AddressList from "../AddressList";
import AddressDetail from "../AddressDetail";
import CartList from "../CartList";
import Checkout from "../Checkout";
import OrdersList from "../OrdersList";
import OrderDetail from "../OrderDetail";
import CategoriesList from "../CategoriesList";
import CategoriesFilter from "../CategoriesFilter";
import ProfileUpdate from "../ProfileUpdate";

const HomeStack = createStackNavigator(
  {
    ItemDetail: ItemDetail,
    Login: Login,
    Cart: CartList,
    Checkout: Checkout,
    CategoriesFilter: CategoriesFilter,
    CategoriesList: CategoriesList
  },
  {
    initialRouteName: "CategoriesList",
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

const ItemsStack = createStackNavigator(
  {
    ItemList: ItemList,
    ItemDetail: ItemDetail,
    Cart: CartList,
    Checkout: Checkout,
    Login: Login
  },
  {
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
      backgroundColor: "#28292F"
    }
  }
);
const ProfileStack = createStackNavigator(
  {
    Profile: Profile,
    ProfileUpdate: ProfileUpdate,
    AddressList: AddressList,
    AddressDetail: AddressDetail,
    Orders: OrdersList,
    OrderDetail: OrderDetail,
    Cart: CartList,
    Checkout: Checkout,
    CategoriesList: CategoriesList,
    Login: Login
  },
  {
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
      backgroundColor: "#28292F"
    }
  }
);

const BottomTab = createBottomTabNavigator(
  {
    HomeTab: HomeStack,
    ItemTab: ItemsStack,
    ProfileTab: ProfileStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "HomeTab") {
          iconName = "home";
          iconType = "Feather";
        } else if (routeName === "ItemTab") {
          iconName = "search";
          iconType = "Feather";
        } else if (routeName === "ProfileTab") {
          iconName = "user";
          iconType = "Feather";
        }
        return (
          <Icon name={iconName} style={{ color: tintColor }} type={iconType} />
        );
      }
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "grey",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "black"
      }
    }
  }
);

export default BottomTab;
