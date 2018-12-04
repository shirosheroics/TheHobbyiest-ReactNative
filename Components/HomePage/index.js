import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

// NativeBase Components
import { Container } from "native-base";

// Style
import styles from "./styles";

// Actions
import * as actionCreators from "../../store/actions";

// Navigation
import Nav from "../Navigation";

class HomePage extends Component {
  componentDidMount() {
    const { items } = this.props.items;
    if (!items) {
      this.props.getItemsList();
      this.props.checkForExpiredToken();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.profile !== prevProps.profile) {
      this.props.setCart(this.props.profile);
    }
  }

  render() {
    return (
      <Container style={styles.transparent}>
        <Nav />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  items: state.item.items,
  user: state.auth.user,
  profile: state.auth.profile
});

const mapActionsToProps = dispatch => ({
  getItemsList: () => dispatch(actionCreators.fetchItems()),
  checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken()),
  fetchProfile: user_id => dispatch(actionCreators.fetchProfile(user_id)),
  setCart: orderList => dispatch(actionCreators.setCart(orderList))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomePage);
