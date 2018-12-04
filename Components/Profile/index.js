import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

// NativeBase Components
import { Container } from "native-base";
import {
  Container,
  Thumbnail,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";

// Style
import styles from "./styles";

// Actions
import * as actionCreators from "../../store/actions";

// Navigation
import Nav from "../Navigation";

class Profile extends Component {
  componentDidMount() {
    const { items } = this.props.items;
    if (!items) {
      this.props.getItemsList();
    }
  }

  render() {
    return (
      <Content>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>This is Content Section</Text>
        </Content>
        <Text />
        <Footer transparent>
          {this.props.user ? (
            <Button full danger onPress={() => this.props.logout()}>
              <Text>Logout</Text>
            </Button>
          ) : (
            <Button
              full
              onPress={() => this.props.navigation.navigate("Login")}
            >
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
)(Profile);
