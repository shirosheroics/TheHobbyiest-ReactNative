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

  handleChange(number, orderItem_id) {
    const orderItems = this.props.cart;
    let orderItem = orderItems.find(orderItem => orderItem.id === orderItem_id);
    let item = this.props.itemList.find(item => item.id === orderItem.item);
    console.log(item);
    if (number > item.stock) {
      alert("Invalid Quantity because required stock unavailable");
    } else {
      this.updateQuantity(number, orderItem_id);
      //   alert("this should add");
    }
  }

  updateQuantity(number, orderItem_id) {
    this.props.updateQuantity(orderItem_id, number, this.props.navigation);
  }

  renderItem(item, qty, orderItem_id) {
    return (
      <ListItem key={item.id}>
        <Left>
          <Text style={{ color: "white", marginLeft: 16 }}> {item.name} </Text>
          <Text note style={{ marginLeft: 16 }}>
            {item.price}
          </Text>
        </Left>
        <Body>
          <NumericInput
            initValue={qty}
            minValue={1}
            step={1}
            textColor="white"
            totalWidth={240}
            totalHeight={50}
            rounded
            maxValue={item.stock}
            value={qty}
            onChange={value => this.handleChange(value, orderItem_id)}
          />
          <Text style={{ color: "white" }}>Quantity: {qty}</Text>
          <Text>Total:{item.price * qty}</Text>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="trash" style={{ color: "white", fontSize: 21 }} />
          </Button>
        </Right>
      </ListItem>
    );
  }

  render() {
    let ListItems;
    let total = 0;
    if (this.props.cart) {
      ListItems = this.props.cart.map(orderitem => {
        let item = this.props.itemList.find(item => item.id === orderitem.item);
        total += item.price * orderitem.quantity;
        return this.renderItem(item, orderitem.quantity, orderitem.id);
      });
    }
    return (
      <Content>
        <List>
          {ListItems}
          <Text>Total: {total}</Text>
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
