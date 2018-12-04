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

class AddressList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Addresses",
    headerLeft: (
      <Button light onPress={() => navigation.navigate("Profile")}>
        <Text>Prof</Text>
      </Button>
    ),
    headerRight: (
      <Button light onPress={() => navigation.navigate("Cart")}>
        <Text>Add</Text>
      </Button>
    )
  });

  renderItem(address) {
    return (
      <ListItem
        key={address.id}
        onPress={() => {
          return this.props.navigation.navigate("AddressDetail", {
            address: address
          });
        }}
      >
        <Left>
          <Text style={{ color: "white", marginLeft: 16 }}>
            {" "}
            Name: {address.name}{" "}
          </Text>
          <Text note style={{ marginLeft: 16 }}>
            Governorate: {address.governorate}
          </Text>
        </Left>
        <Body>
          <Text style={{ color: "white" }}>Area: {address.area}</Text>
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
    let AddressesList;
    if (this.props.prof) {
      AddressesList = this.props.prof.addresses.map(address => {
        return this.renderItem(address);
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

export default connect(mapStateToProps)(AddressList);
