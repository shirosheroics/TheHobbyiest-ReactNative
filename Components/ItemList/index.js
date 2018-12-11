// import React, { Component } from "react";
// import { ImageBackground, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { Text, Icon } from "native-base";

// NativeBase Components
import { Button } from "native-base";

// Style
import styles from "./styles";

class ItemList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Item List",
    headerLeft: (
      <Icon
        type="Entypo"
        name="grid"
        light
        onPress={() => navigation.navigate("CategoriesList")}
      />
    ),
    headerRight: (
      <Icon
        type="Entypo"
        name="shopping-cart"
        light
        onPress={() => navigation.navigate("Cart")}
      />
    )
  });
  componenDidMount() {
    this.props.navigation.setParams({ user: this.props.user });
  }

  handlePress(item) {
    this.props.navigation.navigate("ItemDetail", {
      item: item
    });
  }
  addToCart(item_id) {
    let cart = this.props.cart;
    let check = cart.orderItems.find(orderItem => {
      if (orderItem.item === item_id) {
        return orderItem;
      }
    });
    if (check) {
      this.props.updateOrderItemInCart(
        check.id,
        check.quantity + 1,
        this.props.navigation
      );
    } else {
      this.props.addItemToCart(item_id, cart.id, 1);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.props.itemList}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => this.handlePress(item)}
              >
                <View style={styles.cardHeader}>
                  <Image
                    style={styles.icon}
                    source={{
                      uri:
                        "https://img.icons8.com/flat_round/64/000000/hearts.png"
                    }}
                  />
                </View>
                <Image
                  style={styles.userImage}
                  source={{
                    uri:
                      item.image ||
                      "https://img.icons8.com/flat_round/64/000000/hearts.png"
                  }}
                />
                <View style={styles.cardFooter}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.position}>{item.price}</Text>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => this.addToCart(item.id)}
                    >
                      <Icon type="FontAwesome" name="cart-plus" light />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  itemList: state.item.items,
  user: state.auth.user,
  prof: state.auth.prof,
  cart: state.cart.cart
});
const mapDispatchToProps = dispatch => ({
  updateOrderItemInCart: (orderItem_id, quantity, navigation) =>
    dispatch(
      actionCreators.updateOrderItemInCart(orderItem_id, quantity, navigation)
    ),
  addItemToCart: (item_id, order_id, quantity) =>
    dispatch(actionCreators.createOrderItem(item_id, order_id, quantity)),
  logout: nav => dispatch(actionCreators.logout(nav))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
