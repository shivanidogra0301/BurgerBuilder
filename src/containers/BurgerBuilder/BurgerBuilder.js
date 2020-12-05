import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import { connect } from "react-redux";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import witherrorhandler from "../../hoc/witherrorhandler/witherrorhandler";
import * as actionTypes from "../../store/action";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  };
  purchasehandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseremovehandler = () => {
    this.setState({ purchasing: false });
  };
  purchasecontinuehandler = () => {
    // alert("You continued!!")

    const QueryParams = [];

    for (let i in this.state.ingredients) {
      QueryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    QueryParams.push("price=" + this.state.TotalPrice);
    const QueryParamsString = QueryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + QueryParamsString,
    });
  };
  updatePurchasableInfo = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };
  
  
  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let ordersummary = (
      <OrderSummary
        purchaseRemoved={this.purchaseremovehandler}
        purchaseContinued={this.purchasecontinuehandler}
        price={this.props.totalPrice}
        ingredients={this.props.ings}
      />
    );

    if (this.state.loading) {
      ordersummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalclosed={this.purchaseremovehandler}
        >
          {ordersummary}
        </Modal>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabledInfo={disabledInfo}
          price={this.props.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchasehandler}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice : state.totalPrice
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (igName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: igName }),
    onIngredientRemoved: (igName) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(witherrorhandler(BurgerBuilder, axios));
