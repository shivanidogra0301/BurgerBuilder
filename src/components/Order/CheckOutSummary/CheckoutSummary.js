import React from 'react'
import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from "../../UI/Button/Button"
const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary} >
            <h1>We hope It tastes well</h1>
            <Burger ingredients={props.ingredients}/>
            <Button btntype="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btntype="Success" clicked={props.checkoutContinued}>CONTINUE</Button>

        </div>
    )
}

export default CheckoutSummary
