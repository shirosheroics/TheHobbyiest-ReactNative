import React, { Component } from "react";
import {
  StyleSheet,
  // Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView
} from "react-native";
import { connect } from "react-redux";

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
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      addressSelected: []
    };
  }

  clickEventListener = item => {
    this.setState({ addressSelected: item }, () => {
      this.setModalVisible(true);
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Addresses",
    headerLeft: (
      <Icon type="Entypo" name="user" light onPress={() => navigation.pop()} />
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.props.prof.addresses}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  this.clickEventListener(item);
                }}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.position}>{item.area}</Text>
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => this.clickEventListener(item)}
                  >
                    <Text style={styles.followButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <Modal
          animationType={"fade"}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                  <Text style={styles.name}>
                    {this.state.addressSelected.name}
                  </Text>
                  <Text style={styles.position}>
                    {this.state.addressSelected.governorate}
                  </Text>
                  <Text style={styles.about}>
                    Area: {this.state.addressSelected.area}
                  </Text>
                  <Text style={styles.about}>
                    Block: {this.state.addressSelected.block}
                  </Text>
                  <Text style={styles.about}>
                    Street: {this.state.addressSelected.street}
                  </Text>
                  <Text style={styles.about}>
                    House/Building: {this.state.addressSelected.house_building}
                  </Text>
                  <Text style={styles.about}>
                    Floor: {this.state.addressSelected.floor}
                  </Text>
                  <Text style={styles.about}>
                    Appartment: {this.state.addressSelected.appartment}
                  </Text>
                  <Text style={styles.about}>
                    Extra Directions:{" "}
                    {this.state.addressSelected.extra_directions}
                  </Text>
                </ScrollView>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                  style={styles.btnClose}
                >
                  <Text style={styles.txtClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
