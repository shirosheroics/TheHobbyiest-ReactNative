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

class OrdersList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Addresses",
    headerLeft: (
      <Icon type="Entypo" name="user" light onPress={() => navigation.pop()} />
    )
  });

  renderItem(order) {
    return (
      <ListItem
        key={order.id}
        onPress={() => {
          return this.props.navigation.navigate("OrderDetail", {
            order: order
          });
        }}
      >
        <Left>
          <Text style={{ color: "white", marginLeft: 16 }}>
            {" "}
            date: {order.date}{" "}
          </Text>
        </Left>
        <Body>
          <Text style={{ color: "white" }}>Status: {order.status}</Text>
        </Body>
        <Right>
          {/* <Button transparent>
            <Icon name="trash" style={{ color: "white", fontSize: 21 }} />
          </Button> */}
          <Text>Items: {order.orderItems.length}</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    let AddressesList;
    if (this.props.prof) {
      AddressesList = this.props.prof.orders.map(order => {
        return this.renderItem(order);
      });
    }
    return (
      <Content>
        <List>{AddressesList}</List>
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
  prof: state.auth.profile,
  cart: state.cart.cartItems
});

export default connect(mapStateToProps)(OrdersList);
