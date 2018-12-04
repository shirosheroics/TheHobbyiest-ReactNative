import React, { Component } from "react";
import { ImageBackground, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

// NativeBase Components
import {
  List,
  ListItem,
  Card,
  CardItem,
  Button,
  Thumbnail,
  Text,
  Left,
  Content,
  Icon,
  Footer
} from "native-base";

// Style
import styles from "./styles";

class ItemList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Item List",
    headerLeft: null,
    headerRight: (
      <Button light onPress={() => navigation.navigate("Profile")}>
        <Text>Prof</Text>
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

  renderItem(item) {
    const placeholder =
      "https://www.joysusan.com/wp-content/themes/web-solutions/images/Image-Unavailable.jpg";
    return (
      <TouchableOpacity key={item.id} onPress={() => this.handlePress(item)}>
        <ImageBackground
          source={{ uri: item.image || placeholder }}
          style={styles.background}
        >
          <View style={styles.overlay} />
          <ListItem style={styles.transparent}>
            <Card style={styles.transparent}>
              <CardItem style={styles.transparent}>
                <Left>
                  <Thumbnail
                    bordered
                    source={{ uri: item.image || placeholder }}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                  <Text note style={styles.text}>
                    {item.price}
                  </Text>
                </Left>
              </CardItem>
            </Card>
          </ListItem>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  render() {
    let ListItems;
    if (this.props.itemList) {
      ListItems = this.props.itemList.map(item => this.renderItem(item));
    }
    return (
      <Content>
        <List>{ListItems}</List>
        <Footer transparent>
          {this.props.user ? (
            <Button danger onPress={() => this.props.logout()}>
              <Text>Logout</Text>
            </Button>
          ) : (
            <Button onPress={() => this.props.navigation.navigate("Login")}>
              <Text>Login</Text>
            </Button>
          )}
        </Footer>
      </Content>
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
