import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { Col, Row, Grid } from "react-native-easy-grid";

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
  H3
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
                <Thumbnail
                  bordered
                  source={{ uri: prof.img || placeholder }}
                  style={styles.thumbnail}
                />
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
              {prof.user.first_name} {prof.user.last_name}
            </H1>
            <Text>{prof.user.email}</Text>
            <Text>{prof.phoneNo}</Text>
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
