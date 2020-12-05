import React,{Fragment,Component} from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state={
        showSideDrawer:false
    }
    SideDrawerClosedhandler=()=>{
        this.setState({showSideDrawer:false})
    }
    toggleSideDrawerhandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}})
    }

    render(){
        return (
            <Fragment>
                <Toolbar drawerToggledclick={this.toggleSideDrawerhandler}/>
                <SideDrawer show={this.state.showSideDrawer} closed={this.SideDrawerClosedhandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Fragment>
            )
    }
    
}
export default Layout;

