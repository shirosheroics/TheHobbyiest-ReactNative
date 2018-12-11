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

class CategoriesList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Categories",
    headerRight: (
      <Icon
        type="Entypo"
        name="login"
        light
        onPress={() => navigation.navigate("Login")}
      />
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
    const placeholder =
      "https://www.joysusan.com/wp-content/themes/web-solutions/images/Image-Unavailable.jpg";
    return (
      <Content transparent>
        <List>
          {/* For tech filtering */}
          <TouchableOpacity
            key="Technology"
            onPress={() =>
              this.props.navigation.navigate("CategoriesFilter", {
                category: "T"
              })
            }
          >
            <ImageBackground
              source={{
                uri:
                  "http://anthillonline.com/wp-content/uploads/2015/09/technology.png" ||
                  placeholder
              }}
              style={styles.background}
            >
              <View style={styles.overlay} />
              <ListItem style={styles.transparent}>
                <Card style={styles.transparent}>
                  <CardItem style={styles.transparent}>
                    <Left>
                      <Text style={styles.text}>Tech Hobbyist</Text>
                    </Left>
                  </CardItem>
                </Card>
              </ListItem>
            </ImageBackground>
          </TouchableOpacity>
          {/* For Music Filtering */}
          <TouchableOpacity
            key="Music"
            onPress={() =>
              this.props.navigation.navigate("CategoriesFilter", {
                category: "M"
              })
            }
          >
            <ImageBackground
              source={{
                uri:
                  "http://www.breadalbane.pkc.sch.uk/BA/wp-content/uploads/2018/01/music-.jpg" ||
                  placeholder
              }}
              style={styles.background}
            >
              <View style={styles.overlay} />
              <ListItem style={styles.transparent}>
                <Card style={styles.transparent}>
                  <CardItem style={styles.transparent}>
                    <Left>
                      <Text style={styles.text}>Music Hobbyist</Text>
                    </Left>
                  </CardItem>
                </Card>
              </ListItem>
            </ImageBackground>
          </TouchableOpacity>
          {/* For Books  */}
          <TouchableOpacity
            key="Books"
            onPress={() =>
              this.props.navigation.navigate("CategoriesFilter", {
                category: "B"
              })
            }
          >
            <ImageBackground
              source={{
                uri:
                  "https://cdn.aarp.net/content/dam/aarp/money/budgeting_savings/2016/04/1140-yeager-sell-your-used-books.imgcache.rev6feda141288df73e8fd100822bb375ea.jpg" ||
                  placeholder
              }}
              style={styles.background}
            >
              <View style={styles.overlay} />
              <ListItem style={styles.transparent}>
                <Card style={styles.transparent}>
                  <CardItem style={styles.transparent}>
                    <Left>
                      <Text style={styles.text}>Books Hobbyist</Text>
                    </Left>
                  </CardItem>
                </Card>
              </ListItem>
            </ImageBackground>
          </TouchableOpacity>
          {/* Sports  */}
          <TouchableOpacity
            key="Sports"
            onPress={() =>
              this.props.navigation.navigate("CategoriesFilter", {
                category: "S"
              })
            }
          >
            <ImageBackground
              source={{
                uri:
                  "https://image.shutterstock.com/image-photo/huge-multi-sports-collage-soccer-260nw-650017768.jpg" ||
                  placeholder
              }}
              style={styles.background}
            >
              <View style={styles.overlay} />
              <ListItem style={styles.transparent}>
                <Card style={styles.transparent}>
                  <CardItem style={styles.transparent}>
                    <Left>
                      <Text style={styles.text}>Sports Hobbyist</Text>
                    </Left>
                  </CardItem>
                </Card>
              </ListItem>
            </ImageBackground>
          </TouchableOpacity>
          {/* Art */}
          <TouchableOpacity
            key="Art"
            onPress={() =>
              this.props.navigation.navigate("CategoriesFilter", {
                category: "A"
              })
            }
          >
            <ImageBackground
              source={{
                uri:
                  "https://louisvilleky.gov/sites/default/files/parks/photos/arts_parks_page_0.jpg" ||
                  placeholder
              }}
              style={styles.background}
            >
              <View style={styles.overlay} />
              <ListItem style={styles.transparent}>
                <Card style={styles.transparent}>
                  <CardItem style={styles.transparent}>
                    <Left>
                      <Text style={styles.text}>Art Hobbyist</Text>
                    </Left>
                  </CardItem>
                </Card>
              </ListItem>
            </ImageBackground>
          </TouchableOpacity>
        </List>
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
)(CategoriesList);
