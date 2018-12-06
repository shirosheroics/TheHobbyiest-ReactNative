import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/authActions";
import { AsyncStorage } from "react-native";
// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header,
  DatePicker
} from "native-base";

class ProfileUpdate extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Profile",
    headerLeft: (
      <Button light onPress={() => navigation.navigate("ItemList")}>
        <Text>List</Text>
      </Button>
    ),
    headerRight: (
      <Button light onPress={() => navigation.navigate("ProfileUpdate")}>
        <Text>Edit</Text>
      </Button>
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: this.props.profile.phoneNo,
      bio: this.props.profile.bio,
      birth_date: this.props.profile.birth_date,
      img: this.props.profile.img
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.navigation.replace("ItemList");
    }
  }
  render() {
    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ color: "white" }}>Phone Number</Label>
                </Body>
                <Item
                  rounded
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder={this.state.phoneNo}
                    onChangeText={value => this.setState({ phoneNo: value })}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Biography</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholder={this.state.bio}
                    onChangeText={value => this.setState({ bio: value })}
                  />
                </Item>
                {/* <Body>
                  <Label style={{ color: "white" }}>Date Of Birth</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <DatePicker
                    defaultDate={this.state.birth_date}
                    onDateChange={value => this.setState({ birth_date: value })}
                  />
                </Item> */}
                <Body>
                  <Label style={{ color: "white" }}>Upload Image</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={value => this.setState({ img: value })}
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
          <Button
            full
            success
            onPress={() => this.props.login(this.state, this.props.navigation)}
          >
            <Text>Login</Text>
          </Button>
          <Button
            full
            warning
            onPress={() => this.props.signup(this.state, this.props.navigation)}
          >
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }} />
        </Body>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
  signup: (userData, navigation) =>
    dispatch(actionCreators.signup(userData, navigation)),
  login: (userData, navigation) =>
    dispatch(actionCreators.login(userData, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileUpdate);
