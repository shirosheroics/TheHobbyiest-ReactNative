import React, { Component } from "react";
import { connect } from "react-redux";

// NativeBase Components
import {
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  Icon,
  List,
  ListItem,
  Picker,
  Content
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
      <Content>
        <List>
          <ListItem style={styles.top}>
            <Left>
              <Text style={styles.text}>{item.name + "\n"}</Text>
            </Left>
            <Body />
            <Right>
              <Thumbnail bordered source={{ uri: item.image || placeholder }} />
            </Right>
          </ListItem>
        </List>
      </Content>
    );
  }
}

const mapStateToProps = state => ({});

const mapActionsToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ItemDetail);
