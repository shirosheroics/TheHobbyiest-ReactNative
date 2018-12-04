import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Image } from "react-native";
// NativeBase Components
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
  Text,
  H1,
  H2,
  H3,
  CardItem
} from "native-base";

// Style
import styles from "./styles";

// Actions
import * as actionCreators from "../../store/actions";

// Navigation

class Profile extends Component {
  componentDidMount() {}
  static navigationOptions = ({ navigation }) => ({
    title: "Profile"
  });

  render() {
    const placeholder =
      "https://www.joysusan.com/wp-content/themes/web-solutions/images/Image-Unavailable.jpg";
    const prof = this.props.prof;
    return (
      <Grid>
        <Row>
          <Col>
            <Header>
              <Left>
                <Col>
                  <Thumbnail
                    bordered
                    source={{ uri: prof.img || placeholder }}
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </Col>
              </Left>
              <Body>
                <Title>{prof.user.username}</Title>
              </Body>
              <Right />
            </Header>
          </Col>
        </Row>
        <Row>
          <Col>
            <H1>
              Name: {prof.user.first_name} {prof.user.last_name}
            </H1>
            <Text>Email: {prof.user.email}</Text>
            <Text>Number: {prof.phoneNo}</Text>
            <Row>
              <Button
                onPress={() => this.props.navigation.navigate("AddressList")}
              >
                <Text>Addresses</Text>
              </Button>
            </Row>
            <Row>
              <Button onPress={() => this.props.navigation.navigate("Orders")}>
                <Text>Orders</Text>
              </Button>
            </Row>
          </Col>
        </Row>
        <Text />

        {this.props.user ? (
          <Button
            full
            danger
            onPress={() => this.props.logout(this.props.navigation)}
          >
            <Text>Logout</Text>
          </Button>
        ) : (
          <Button full onPress={() => this.props.navigation.navigate("Login")}>
            <Text>Login</Text>
          </Button>
        )}
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  prof: state.auth.profile
});

const mapActionsToProps = dispatch => ({
  logout: navigation => dispatch(actionCreators.logout(navigation))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Profile);
