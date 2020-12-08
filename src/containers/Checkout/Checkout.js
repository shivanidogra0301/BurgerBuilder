import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckOutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import ContactData from '../Checkout/ContactData/ContactData'
class Checkout extends Component {
   
    
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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledhandler}
                    checkoutContinued={this.checkoutContinuedhandler}
                    />
                <Route path = {this.props.match.path+'/contact-data'} 
                 component = {ContactData}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings : state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout)
