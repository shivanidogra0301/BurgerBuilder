import React, { Component, Fragment } from 'react'
import Modal from '../../components/UI/Modal/Modal'
const witherrorhandler = (WrappedComponent,axios) => {
    return class extends Component{
            state={
                error:null
            }
            componentWillMount(){
                this.reqinterceptor=axios.interceptors.request.use(req=>{
                    this.setState({error:null})
                    return req
                })
                this.resinterceptor=axios.interceptors.response.use(res=>res,err=>{
                    this.setState({error:err})
                })
            }
            errorconfirmedhandler=()=>{
                this.setState({error:null})
            }
            componentWillUnmount(){
                axios.interceptors.request.eject(this.reqinterceptor);
                axios.interceptors.response.eject(this.resinterceptor);

            }

            render(){
                
                return(
                <Fragment>
                    <Modal show={this.state.error} modalclosed={this.errorconfirmedhandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
                )
            }
        }
    
}

export default witherrorhandler
