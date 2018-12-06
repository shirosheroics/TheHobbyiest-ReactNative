import React, { Component } from "react";
import { connect } from "react-redux";
// import { createStackNavigator } from "react-navigation";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
// NativeBase Components
import {
  //   Container,
  //   Thumbnail,
  //   Header,
  //   Title,
  //   Content,
  //   Footer,
  //   FooterTab,
  //   Button,
  //   Left,
  //   Right,
  //   Body,
  //   Icon,
  Text
  //   H1,
  //   H2,
  //   H3,
  //   CardItem
} from "native-base";

// Style
import styles from "./styles";

// Actions
import * as actionCreators from "../../store/actions";

// Navigation

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Profile"
    // headerLeft: (
    //   // <Button light onPress={() => navigation.navigate("ItemList")}>
    //   //   <Text>List</Text>
    //   // </Button>
    // ),
    // headerRight: (
    //   // <Button light onPress={() => navigation.navigate("ProfileUpdate")}>
    //   //   <Text>Edit</Text>
    //   // </Button>
    // )
  });

  componentDidMount() {
    // if (!this.props.user) {
    //   this.props.navigation.navigate({ routName: "HomeTab" });
    // }
  }

  render() {
    const placeholder =
      "https://www.joysusan.com/wp-content/themes/web-solutions/images/Image-Unavailable.jpg";
    const prof = this.props.prof;
    console.log(prof.phoneNo + "PROFILE");
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <Image
          style={styles.avatar}
          source={{ uri: prof.img || placeholder }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
              {this.props.user.username.toUpperCase()}
            </Text>
            <Text style={styles.info}>Number {prof.phoneNo}</Text>
            <Text style={styles.info}>Email {prof.user.email}</Text>
            <Text style={styles.info}>Date Of Birth: {prof.birth_date}</Text>
            <Text style={styles.description}>Biography: {prof.bio}</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AddressList")}
              style={styles.buttonContainer}
            >
              <Text>Addresses</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Orders")}
              style={styles.buttonContainer}
            >
              <Text>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              danger
              onPress={() => this.props.logout(this.props.navigation)}
              style={styles.buttonContainer}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
