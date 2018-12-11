import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import NumericInput from "react-native-numeric-input";
import { Col, Row, Grid } from "react-native-easy-grid";
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
  Body,
  Picker,
  Item,
  Form
} from "native-base";

// Style
import styles from "./styles";

class Checkout extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Checkout"
  });

  constructor(props) {
    super(props);
    this.state = {
      address: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ address: e });
    console.log(this.state.address);
  }

  checkStock(cart) {
    cart.orderItems.forEach(orderItem => {
      let item_id = orderItem.item;
      let item = this.props.items.find(item => item.id === item_id);
      if (orderItem.quantity > item.stock) {
        alert(
          `${item.name} doesn't have enough stock please update your quantity`
        );
        // return <Redirect to="./cart" />;
      } else {
        this.props.setStock(item, orderItem.quantity);
      }
    });
  }
  confirmHandler() {
    if (this.props.cart) {
      console.log(this.props.cart);
      let cart = this.props.cart;
      if (this.state.address === 0) {
        alert("Please choose address");
      } else {
        this.checkStock(cart);
        this.props.setStatus(
          cart.id,
          "O",
          this.props.navigation,
          this.state.address
        );
      }
    }
  }
  renderItem(item, qty) {
    return (
      <ListItem key={item.id}>
        <Left>
          <Text style={{ color: "white", marginLeft: 16 }}> {item.name} </Text>
          <Text note style={{ marginLeft: 16 }}>
            {item.price}
          </Text>
        </Left>
        <Body>
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
  checkoutDetail(cart) {
    let total = 0;
    let orderItem = cart.orderItems.map(orderItem => {
      let item = this.props.items.find(item => item.id === orderItem.item);
      total += item.price * orderItem.quantity;
      return this.renderItem(item, orderItem.quantity);
    });

    return (
      <Col>
        <Text>Order ID: {cart.id}</Text>
        <Text>Date: {cart.date}</Text>
        {orderItem}
        <Text>Total: {total}KD</Text>
      </Col>
    );
  }

  render() {
    if (!this.props.profile) {
      this.props.navigation.navigate("ItemList");
    }
    let cart = this.props.cart;
    let addresses;
    console.log(this.props.profile);
    if (this.props.profile.addresses) {
      addresses = this.props.profile.addresses.map(address => {
        return <Picker.Item label={address.name} value={address.id} />;
      });
    }

    return (
      <Content>
        <Form>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: undefined }}
              placeholder="Select your Address"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.address}
              onValueChange={this.handleChange}
            >
              {addresses}
            </Picker>
          </Item>
        </Form>
        <Grid>
          <Row>
            {this.checkoutDetail(
              this.props.profile.orders.find(order => order.status === "C")
            )}
          </Row>
          <Row>
            <Button primary onPress={() => this.confirmHandler()}>
              <Text>Confirm</Text>
            </Button>
          </Row>
        </Grid>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    cart: state.cart.cart,
    profile: state.auth.profile,
    items: state.item.items
  };
};
const mapDispatchToProps = dispatch => ({
  setStatus: (order_id, status, navigation, address_id) => {
    dispatch(
      actionCreators.setStatus(order_id, status, navigation, address_id)
    );
  },
  setStock: (item, quantity) => {
    dispatch(actionCreators.setStock(item, quantity));
  },
  fetchProfile: () => dispatch(actionCreators.fetchProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
