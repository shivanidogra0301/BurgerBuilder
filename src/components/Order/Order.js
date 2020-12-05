import React from 'react'
import classes from './Order.module.css'
const Order = (props) => {
    const ingredients = [];
    for(let IngredientName in props.ingredients){
        ingredients.push({ name :IngredientName, amount : props.ingredients[IngredientName]});
    }
    const ingredientsOutput = ingredients.map(ig => (
        <span 
        style = {{textTransform : 'capitalize',
                display : 'inline-block',
                padding : '5px',
                margin  : '0 8px',
                border  : '2px solid #ccc'
    }}
        key ={ig.name}>
            {ig.name} ({ig.amount})
        </span>
    ))
    return (
        <div className={classes.Order}>
            <p> Ingredients : {ingredientsOutput}</p>
            <p>Price : <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
