import React, { Component } from "react";
// import { ImageBackground, View, TouchableOpacity } from "react-native";
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
import {
  //   List,
  //   ListItem,
  //   Card,
  //   CardItem,
  Button
  //   Thumbnail,
  //   Text,
  //   Left,
  //   Content,
  //   Icon,
  //   Footer
} from "native-base";

// Style
import styles from "./styles";

class CategoriesFilter extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Category",
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

  //   renderItem(item) {
  //     const placeholder =
  //       "https://www.joysusan.com/wp-content/themes/web-solutions/images/Image-Unavailable.jpg";
  //     return (
  //       <TouchableOpacity key={item.id} onPress={() => this.handlePress(item)}>
  //         <ImageBackground
  //           source={{ uri: item.image || placeholder }}
  //           style={styles.background}
  //         >
  //           <View style={styles.overlay} />
  //           <ListItem style={styles.transparent}>
  //             <Card style={styles.transparent}>
  //               <CardItem style={styles.transparent}>
  //                 <Left>
  //                   <Thumbnail
  //                     bordered
  //                     source={{ uri: item.image || placeholder }}
  //                     style={styles.thumbnail}
  //                   />
  //                   <Text style={styles.text}>{item.name}</Text>
  //                   <Text note style={styles.text}>
  //                     {item.price}
  //                   </Text>
  //                 </Left>
  //               </CardItem>
  //             </Card>
  //           </ListItem>
  //         </ImageBackground>
  //       </TouchableOpacity>
  //     );
  //   }
  render() {
    let itemList = this.props.items.filter(item => {
      return item.category === this.props.navigation.getParam("category");
    });
    // let ListItems;
    // if (itemList) {
    //   ListItems = itemList.map(item => this.renderItem(item));
    // }
    return (
      //   <Content>
      //     <List>{ListItems}</List>
      //     <Footer transparent>
      //       {this.props.user ? (
      //         <Button danger onPress={() => this.props.logout()}>
      //           <Text>Logout</Text>
      //         </Button>
      //       ) : (
      //         <Button onPress={() => this.props.navigation.navigate("Login")}>
      //           <Text>Login</Text>
      //         </Button>
      //       )}
      //     </Footer>
      //   </Content>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={itemList}
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
  items: state.item.items,
  user: state.auth.user,
  prof: state.auth.prof
});
const mapDispatchToProps = dispatch => ({
  logout: nav => dispatch(actionCreators.logout(nav))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesFilter);
