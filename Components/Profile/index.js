import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

// NativeBase Components
import { Container } from "native-base";
import {
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  Icon,
  List,
  ListItem,
  Picker,
  Content
} from "native-base";

// Style
import styles from "./styles";

// Actions
import * as actionCreators from "../../store/actions";

// Navigation
import Nav from "../Navigation";

class HomePage extends Component {
  componentDidMount() {
    const { items } = this.props.items;
    if (!items) {
      this.props.getItemsList();
    }
  }

  render() {
    return (
      <Content>
        <Text />
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
  items: state.item.items
});

const mapActionsToProps = dispatch => ({
  getItemsList: () => dispatch(actionCreators.fetchItems())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomePage);
