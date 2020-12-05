import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckOutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
class Checkout extends Component {
    state={
        ingredients:{
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
        price : 0
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0;
        for (let param of query.entries()){
            // ['salad' :'1']
            if(param[0] === 'price'){
                price = param[1]
            }
            else{
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients:ingredients,price : price})
    }
    checkoutCancelledhandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedhandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledhandler}
                    checkoutContinued={this.checkoutContinuedhandler}
                    />
                <Route path = {this.props.match.path+'/contact-data'} 
                 render = {(props) => (<ContactData ingredients = {this.state.ingredients} price = {this.state.price} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout
