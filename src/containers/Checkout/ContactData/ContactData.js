
import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
export class ContactData extends Component {
    state ={
        orderform:{
                name: {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder: 'Your Name'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    isvalid : false,
                    touched : false
                },
                street: {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder: 'Street'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    isvalid : false,
                    touched : false
                },
                zipcode: {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder: 'ZIPCODE'
                    },
                    value : '',
                    validation : {
                        required : true,
                        FixedLength : 6
                    },
                    isvalid : false,
                    touched : false
                },
                country : {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder: 'Country'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    isvalid : false,
                    touched : false
                },
                email: {
                    elementType : 'input',
                    elementConfig:{
                        type : 'email',
                        placeholder: 'Your E-MAIL'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    isvalid : false,
                    touched : false
                },
                deliveryMode:{
                    elementType : 'select',
                    elementConfig:{
                        options : [{ value : 'fastest' , displayValue : 'Fastest'},
                                    { value : 'cheapest', displayValue : 'Cheapest'}
                                ]
                    },
                    value : '',
                    validation :{},
                    isvalid : true
                }
        
        },
        formIsValid: false,
        loading : false,
        price : 0
    }

    checkValidation(value,rules){
        let isValid = true
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }

        if(rules.FixedLength){
            isValid = value.length === rules.FixedLength && isValid
        }
        return isValid
    }

    inputChangeHandler = (event,inputElement) => {
        const updatedOrderForm = {...this.state.orderform}
        const updatedElement = {...updatedOrderForm[inputElement]}
        updatedElement.value = event.target.value;
        updatedElement.isvalid = this.checkValidation(updatedElement.value,updatedElement.validation)
        updatedElement.touched = true;
        updatedOrderForm[inputElement] = updatedElement

        let formIsValid = true;
        for(let formIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[formIdentifier].isvalid && formIsValid
        }
        // console.log(formIsValid)
        
        this.setState({orderform: updatedOrderForm, formIsValid:formIsValid})
    }

    orderhandler = (event) => {
        event.preventDefault();
        this.setState({loading:true})
        const formdata = {}
        for(let elementtype in this.state.orderform){
            formdata[elementtype] = this.state.orderform[elementtype].value
        }

        const order={
            ingredients: this.props.ings,
            price:this.props.price,
            orderData:formdata
        }
        axios.post("/orders.json",order)
        .then(response=> {
            this.setState({loading:false})
            this.props.history.push('/')
        })
        .catch(err=>
            this.setState({loading:false})
        )
    }
        render() {
            let formElements = [];
            for(let key in this.state.orderform){
                formElements.push({id : key, config : this.state.orderform[key]})
            }

            let form = (<form onSubmit= {this.orderhandler}>
                        
                        {formElements.map(formElement =>(
                            <Input  key = {formElement.id} 
                                elementType= {formElement.config.elementType} 
                                elementConfig ={formElement.config.elementConfig}
                                value = {formElement.config.value} 
                                invalid = {!formElement.config.isvalid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                clicked = {(event)=> this.inputChangeHandler(event,formElement.id)}
                                />
                        ))}
                        <Button btntype = 'Success' disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>)
            if(this.state.loading){
                form = <Spinner/>
            }
        return (
    
            <div className={classes.ContactData}>
                <h4>Enter Your Details</h4>
                  {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)
