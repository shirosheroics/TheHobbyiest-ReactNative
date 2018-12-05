import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { Col, Row, Grid } from "react-native-easy-grid";
import NumericInput from "react-native-numeric-input";
// NativeBase Components
import {
  Container,
  List,
  ListItem,
  Card,
  CardItem,
  Button,
  Thumbnail,
  Text,
  Left,
  Right,
  Content,
  Icon,
  Footer,
  Body
} from "native-base";

import CartDetail from "../CartDetail";

// Style
import styles from "./styles";

class CartList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Item List",
    headerLeft: (
      <Button light onPress={() => navigation.navigate("Profile")}>
        <Text>Prof</Text>
      </Button>
    ),
    headerRight: (
      <Button light onPress={() => navigation.navigate("Cart")}>
        <Text>Cart</Text>
      </Button>
    )
  });

  render() {
    let ListItems;
    if (this.props.cart) {
      ListItems = this.props.cart.map(orderitem => {
        let item = this.props.itemList.find(item => item.id === orderitem.item);
        return (
          <CartDetail
            item={item}
            qty={orderitem.quantity}
            orderItem={orderitem}
          />
        );
      });
    }
    return (
      <Content>
        <List>
          <ListItem>
            <Row>
              <Col>
                <Text> Item </Text>
              </Col>
              <Col>
                <Text> Price </Text>
              </Col>
              <Col>
                <Text> Quantity </Text>
              </Col>
              <Col>
                <Text> Total </Text>
              </Col>
            </Row>
          </ListItem>

          {ListItems}
          <Button
            onPress={() => this.props.navigation.navigate("Checkout")}
            full
            danger
          >
            <Text>Checkout</Text>
          </Button>
        </List>
        <Footer transparent>
          {this.props.user ? (
            <Button danger onPress={() => this.props.logout()}>
              <Text>Logout</Text>
            </Button>
          ) : (
            <Button onPress={() => this.props.navigation.navigate("Login")}>
              <Text>Login</Text>
            </Button>
          )}
        </Footer>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  itemList: state.item.items,
  user: state.auth.user,
  prof: state.auth.prof,
  cart: state.cart.cartItems
});
const mapDispatchToProps = dispatch => ({
  updateQuantity: (orderItem_id, quantity, navigation) =>
    dispatch(
      actionCreators.updateOrderItemInCart(orderItem_id, quantity, navigation)
    ),
  logout: nav => dispatch(actionCreators.logout(nav))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartList);
