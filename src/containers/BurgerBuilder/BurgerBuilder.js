import React, { Component,Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import witherrorhandler from '../../hoc/witherrorhandler/witherrorhandler'
const INGREDIENT_PRICE={
    salad:0.4,
    cheese:0.3,
    meat:1.4,
    bacon:0.8
}
class BurgerBuilder extends Component {
    state={
        ingredients:{
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
    TotalPrice:4  ,
    purchasable:false,
    purchasing:false,
    loading:false
    }
    purchasehandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseremovehandler=()=>{
        this.setState({purchasing:false})
    }
    purchasecontinuehandler=()=>{
        // alert("You continued!!")
        this.setState({loading:true})
        const order={
            ingredients: this.state.ingredients,
            price:this.state.TotalPrice,
            customer:{
                name: "Thomas Shelby",
                address:{
                    street:"test street 10",
                    zipcode:11111,
                    HouseNO: 10
                },
                email:"test@testmail.com"
            },
            deliveryMode:"fastest"
        }
        axios.post("/orders.json",order)
        .then(response=> 
            this.setState({loading:false,purchasing:false})
        )
        .catch(err=>
            this.setState({loading:false,purchasing:false})
        )
    }
    updatePurchasableInfo=(ingredients)=>{
        const sum= Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey]
        }).reduce((sum,el)=>{
                return sum+el;
        },0)
        this.setState({purchasable:sum>0})

    }
    addIngredienthandler= (type) =>{
        const  oldCount=this.state.ingredients[type]
        const updatedCount=oldCount+1
        const updatedIngredient={...this.state.ingredients}
        updatedIngredient[type]=updatedCount
        const newPrice=this.state.TotalPrice+INGREDIENT_PRICE[type]
        this.setState({TotalPrice:newPrice,ingredients:updatedIngredient})
        this.updatePurchasableInfo(updatedIngredient)
    }
    removeIngredienthandler=(type)=>{
        const  oldCount=this.state.ingredients[type]
        if (oldCount<=0)
            return;
        const updatedCount=oldCount-1
        const updatedIngredient={...this.state.ingredients}
        updatedIngredient[type]=updatedCount
        const newPrice=this.state.TotalPrice-INGREDIENT_PRICE[type]
        this.setState({TotalPrice:newPrice,ingredients:updatedIngredient})
        this.updatePurchasableInfo(updatedIngredient)

    }
    render() {
       const disabledInfo={...this.state.ingredients}
       for(let key in disabledInfo){
           disabledInfo[key]=disabledInfo[key]<=0
       }
       let ordersummary=<OrderSummary
       purchaseRemoved={this.purchaseremovehandler}
       purchaseContinued={this.purchasecontinuehandler}
       price={this.state.TotalPrice}
       ingredients={this.state.ingredients}/>

       if(this.state.loading){
           ordersummary=<Spinner/>
       }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalclosed={this.purchaseremovehandler} >
                    {ordersummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredienthandler} 
                ingredientRemoved={this.removeIngredienthandler}
                disabledInfo={disabledInfo}
                price={this.state.TotalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchasehandler}
                />
            </Fragment>
        )
    }
}

export default witherrorhandler(BurgerBuilder,axios)
