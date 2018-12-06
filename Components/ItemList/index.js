// import React, { Component } from "react";
// import { ImageBackground, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

// NativeBase Components
import { Button } from "native-base";

// Style
import styles from "./styles";

class ItemList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Item List",
    headerLeft: (
      <Button light onPress={() => navigation.navigate("Profile")}>
        <Text>Prof</Text>
      </Button>
    ),
    headerRight: (
      <Button light onPress={() => navigation.navigate("Cart")}>
        <Text>Cart</Text>
      </Button>
    )
  });
  componenDidMount() {
    this.props.navigation.setParams({ user: this.props.user });
  }

  handlePress(item) {
    this.props.navigation.navigate("ItemDetail", {
      item: item
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.props.itemList}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => this.handlePress(item)}
              >
                <View style={styles.cardHeader}>
                  <Image
                    style={styles.icon}
                    source={{
                      uri:
                        "https://img.icons8.com/flat_round/64/000000/hearts.png"
                    }}
                  />
                </View>
                <Image
                  style={styles.userImage}
                  source={{
                    uri:
                      item.image ||
                      "https://img.icons8.com/flat_round/64/000000/hearts.png"
                  }}
                />
                <View style={styles.cardFooter}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.position}>{item.price}</Text>
                    <TouchableOpacity style={styles.followButton}>
                      <Text style={styles.followButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  itemList: state.item.items,
  user: state.auth.user,
  prof: state.auth.prof
});
const mapDispatchToProps = dispatch => ({
  logout: nav => dispatch(actionCreators.logout(nav))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
