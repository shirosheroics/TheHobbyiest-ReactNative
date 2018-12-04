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
    title: "Address Book"
  });

  handlePress(address) {
    this.props.navigation.navigate("AddressDetail", {
      address: address
    });
  }

  renderItem(address) {
    return (
      <View key={address.id} onPress={() => this.handlePress(address)}>
        <ListItem>
          <Card>
            <CardItem>
              <Left>
                <Text style={styles.text}>{address.name}</Text>
                <Text note style={styles.text}>
                  {address.governorate}
                </Text>
              </Left>
            </CardItem>
          </Card>
        </ListItem>
      </View>
    );
  }
  render() {
    let ListItems;
    if (this.props.prof.addresses) {
      ListItems = this.props.prof.addresses.map(address =>
        this.renderItem(address)
      );
    }
    return (
      <Content>
        <List>{ListItems}</List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  prof: state.auth.prof
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
