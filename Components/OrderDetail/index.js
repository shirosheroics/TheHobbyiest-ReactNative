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
  Body,
  H1,
  H2,
  H3,
  Row,
  ListItem,
  Left,
  Right,
  Button,
  Icon,
  List
} from "native-base";

// Style
import styles from "./styles";

class OrderDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("order", {}).status
  });

  renderItem(item, qty) {
    return (
      <CardItem>
        <Left>
          <Text style={{ color: "black", marginLeft: 16 }}> {item.name} </Text>
        </Left>
        <Body>
          <Text note style={{ marginLeft: 16 }}>
            {item.price}
          </Text>
        </Body>
        <Right>
          <Text style={{ color: "black" }}>Quantity: {qty}</Text>
          <Text>Total:{item.price * qty}</Text>
        </Right>
      </CardItem>
    );
  }

  render() {
    let total = 0;
    const order = this.props.navigation.getParam("order", {});
    let items = order.orderItems.map(orderItem => {
      let item = this.props.itemList.find(item => item.id === orderItem.item);
      total += item.price * orderItem.quantity;
      return this.renderItem(item, orderItem.quantity);
    });
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>ID: {order.id}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Date : {order.date}</Text>
                <Text>Status : {order.status}</Text>
              </Body>
            </CardItem>
            {items}
            <CardItem>
              <Text>Total: {total}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  itemList: state.item.items
});
export default connect(mapStateToProps)(OrderDetail);
