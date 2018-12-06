import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  View
} from "react-native";
import NumericInput from "react-native-numeric-input";
import { Col, Row, Grid } from "react-native-easy-grid";

// NativeBase Components
import {
  Text,
  Button,
  Body,
  Icon,
  List,
  Content,
  Footer,
  Title,
  H1,
  Left
} from "native-base";

// Style
import styles from "./styles";
import { ADD_TO_CART } from "../../store/actions/actionTypes";

class ItemDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("item", {}).name,
    headerRight: null
  });
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.props.fetchItemDetail(this.props.navigation.getParam("item").id);
  }

  addToCart() {
    let item = this.props.item.id;
    let cart = this.props.cart;
    let check = cart.orderItems.find(orderItem => {
      if (orderItem.item === item) {
        return orderItem;
      }
    });
    if (check) {
      this.props.updateOrderItemInCart(
        check.id,
        check.quantity + this.state.quantity,
        this.props.history
      );
    } else {
      this.props.addItemToCart(item, cart.id, this.state.quantity);
    }
  }
  render() {
    const placeholder =
      "https://www.joysusan.com/wp-content/themes/web-solutions/images/Image-Unavailable.jpg";
    const item = this.props.item;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: "center", marginHorizontal: 30 }}>
            <Image
              style={styles.productImg}
              source={{
                uri:
                  item.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v7KDJN7TAoJa5sFaPWcp1HX8JFcpF3z5K3ngz4L6kWoEP7Ca"
              }}
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.contentSize}>
            <NumericInput
              initValue={this.state.quantity}
              minValue={1}
              step={1}
              textColor="white"
              totalWidth={240}
              totalHeight={50}
              rounded
              maxValue={item.stock}
              value={this.state.quantity}
              onChange={value => {
                console.log(value);
                return this.setState({ quantity: value });
              }}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => this.addToCart()}
            >
              <Text style={styles.shareButtonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      // <Grid>
      //   <Row size={1}>
      //     <Image
      //       source={{ uri: item.image || placeholder }}
      //       style={{ height: 300, width: null, flex: 1 }}
      //     />
      //   </Row>
      //   <Row size={1}>
      //     <Col>
      //       <H1 style={styles.title}>Item Name: {item.name + "\n"}</H1>

      //       <View style={styles.item}>
      //         <Text style={styles.text}>Category: {item.category + "\n"}</Text>
      //         <Text>{item.stock} </Text>
      //         <Text style={styles.text}>
      //           Description: {item.description + "\n"}
      //         </Text>
      //         <Row>
      //           <NumericInput
      //             initValue={this.state.quantity}
      //             minValue={1}
      //             step={1}
      //             textColor="white"
      //             totalWidth={240}
      //             totalHeight={50}
      //             rounded
      //             maxValue={item.stock}
      //             value={this.state.quantity}
      //             onChange={value => {
      //               console.log(value);
      //               return this.setState({ quantity: value });
      //             }}
      //           />
      //           <Button onPress={() => this.addToCart()} primary>
      //             <Text>Add</Text>
      //           </Button>
      //         </Row>
      //       </View>
      //     </Col>
      //   </Row>
      // </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    item: state.item.item,
    cart: state.cart.cart,
    items: state.item.items
  };
};

const mapActionsToProps = dispatch => {
  return {
    fetchItemDetail: itemID => dispatch(actionCreators.fetchItemDetail(itemID)),
    fetchProfile: () => dispatch(actionCreators.fetchProfile()),
    addItemToCart: (item_id, order_id, quantity) =>
      dispatch(actionCreators.createOrderItem(item_id, order_id, quantity)),

    updateOrderItemInCart: (orderItem_id, quantity, history) =>
      dispatch(
        actionCreators.updateOrderItemInCart(orderItem_id, quantity, history)
      )
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ItemDetail);
