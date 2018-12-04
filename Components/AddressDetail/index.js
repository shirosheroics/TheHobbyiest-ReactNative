import React, { Component } from "react";

// NativeBase Components
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  H1,
  H2,
  H3
} from "native-base";

// Style
import styles from "./styles";

class AddressDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("address", {}).name
  });

  render() {
    console.log(
      this.props.navigation.getParam("address", {}) + "Address object"
    );
    const address = this.props.navigation.getParam("address", {});
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Name: {address.name}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Governorate : {address.governorate}</Text>
                <Text>
                  Area : {address.area} block : {address.block}
                </Text>
                <Text>
                  Street : {address.street} house/building :{" "}
                  {address.house_building}
                </Text>
                <Text>
                  Floor : {address.floor} Appartment : {address.appartment}
                </Text>
                <Text>Extra Directions : {address.extra_directions}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default AddressDetail;
