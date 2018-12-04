import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { Image, View } from "react-native";
import NumericInput from "react-native-numeric-input";
import { Col, Row, Grid } from "react-native-easy-grid";

// NativeBase Components
import {
  Text,
  Button,
  Body,
  Icon,
  List,
  Content,
  Footer,
  Title,
  H1,
  Left
} from "native-base";

// Style
import styles from "./styles";

class ItemDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("item", {}).name,
    headerRight: null
  });
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  componentDidMount() {
    this.props.fetchItemDetail(this.props.navigation.getParam("item").id);
  }
  render() {
    const placeholder =
      "https://www.joysusan.com/wp-content/themes/web-solutions/images/Image-Unavailable.jpg";
    const item = this.props.item;
    return (
      <Grid>
        <Row size={1}>
          <Image
            source={{ uri: item.image || placeholder }}
            style={{ height: 300, width: null, flex: 1 }}
          />
        </Row>
        <Row size={1}>
          <Col>
            <H1 style={styles.title}>{item.name + "\n"}</H1>

            <View style={styles.item}>
              <Text style={styles.text}>{item.category + "\n"}</Text>
              <Text>{item.stock} </Text>
              <Text style={styles.text}>{item.description + "\n"}</Text>
              <NumericInput
                initValue={this.state.quantity}
                minValue={1}
                step={1}
                textColor="white"
                totalWidth={240}
                totalHeight={50}
                rounded
                maxValue={item.stock}
                value={this.state.quantity}
                onChange={value => {
                  console.log(value);
                  return this.setState({ quantity: value });
                }}
              />
            </View>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item.item
});

const mapActionsToProps = dispatch => {
  return {
    fetchItemDetail: itemID => dispatch(actionCreators.fetchItemDetail(itemID))
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ItemDetail);
