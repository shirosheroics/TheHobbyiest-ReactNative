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
    const address = this.props.navigation.getParam("address", {});
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>{address.name}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  <H2>Governorate : {address.governorate}</H2>
                  <H3>
                    Area : {address.area} block : {address.block}
                  </H3>
                  <H3>
                    Street : {address.street} house/building :{" "}
                    {address.house_building}
                  </H3>
                  <H3>
                    Floor : {address.floor} Appartment : {address.appartment}
                  </H3>
                  <H3>Extra Directions : {address.extra_directions}</H3>
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default AddressDetail;
