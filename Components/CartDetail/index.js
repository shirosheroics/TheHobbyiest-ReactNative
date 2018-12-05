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

class CartDetail extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.orderItem.quantity,
      enable: true
    };
  }

  setScrollEnabled(enable) {
    this.setState({
      enable
    });
  }

  success(orderitem_id) {
    this.props.removeItem(orderitem_id);
  }

  handleChange(number) {
    const orderItems = this.props.cart;
    let orderItem = orderItems.find(
      orderItem => orderItem.id === this.props.orderItem.id
    );
    let item = this.props.itemList.find(item => item.id === orderItem.item);
    console.log(item);
    if (number > item.stock) {
      alert("Invalid Quantity because required stock unavailable");
    } else {
      this.updateQuantity(number, orderItem.id);
      //   alert("this should add");
    }
  }

  updateQuantity(number, orderItem_id) {
    this.props.updateQuantity(orderItem_id, number, this.props.navigation);
  }

  render() {
    let item = this.props.item;
    let qty = this.props.qty;
    return (
      <ListItem
        key={item.id}
        onLongPress={() => this.success(this.props.orderItem.id)}
      >
        <Row>
          <Col>
            <Text style={{ color: "white", marginLeft: 16 }}>
              {" "}
              {item.name}{" "}
            </Text>
          </Col>
          <Col>
            <Text style={{ marginLeft: 16 }}>{item.price}</Text>
          </Col>
          <Col>
            <NumericInput
              size={1}
              initValue={this.state.quantity}
              minValue={1}
              step={1}
              textColor="white"
              totalWidth={100}
              totalHeight={50}
              rounded
              maxValue={item.stock}
              onChange={value => {
                this.setState({ quantity: value });
                return this.handleChange(value);
              }}
            />
          </Col>

          {/* <Text style={{ color: "white" }}>Quantity: {qty}</Text> */}
          <Col>
            <Text>{item.price * this.state.quantity}</Text>
          </Col>
        </Row>
      </ListItem>
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
  removeItem: orderItem_id =>
    dispatch(actionCreators.deleteItemFromCart(orderItem_id)),
  logout: nav => dispatch(actionCreators.logout(nav))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDetail);
