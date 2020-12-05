import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import witherrorhandler from '../../hoc/witherrorhandler/witherrorhandler'
export class Orders extends Component {
    state ={
        orders :[],
        loading : true
    }
    componentDidMount() {
        axios.get('/orders.json')
        .then( res =>{
            const fetchedOrders =[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id : key
                })
            }
            this.setState({loading : false,orders : fetchedOrders})

        })
        .catch(err =>{
            this.setState({loading:false})
        })
    }
    render() {
        
        
        return (

            <div>
                {this.state.orders.map(ig => (
                    <Order key = {ig.id} ingredients = {ig.ingredients} price = {+ig.price} />
                ))}
            </div>
        )
    }
}

export default witherrorhandler(Orders, axios)
