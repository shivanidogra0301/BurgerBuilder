import React, { Fragment } from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
const SideDrawer = (props) => {
    let sidedrawerclasses=[classes.SideDrawer,classes.Close]
    if(props.show){
        sidedrawerclasses=[classes.SideDrawer,classes.Open]
    }
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={sidedrawerclasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>

        </Fragment>
        
    )
}

export default SideDrawer
