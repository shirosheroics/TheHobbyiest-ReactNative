import React, { Component } from "react";
import { connect } from "react-redux";

// NativeBase Components
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body
} from "native-base";

// Style
import styles from "./styles";

class ItemDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("shop", {}).name,
    headerLeft: null,
    headerRight: null
  });

  render() {
    const placeholder =
      "https://www.joysusan.com/wp-content/themes/web-solutions/images/Image-Unavailable.jpg";
    const item = this.props.navigation.getParam("item", {});
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Your text here</Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapActionsToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ItemDetail);
