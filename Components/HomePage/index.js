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

  render() {
    return (
      <Container style={styles.transparent}>
        <Nav />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  items: state.item.items
});

const mapActionsToProps = dispatch => ({
  getItemsList: () => dispatch(actionCreators.fetchItems()),
  checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomePage);
