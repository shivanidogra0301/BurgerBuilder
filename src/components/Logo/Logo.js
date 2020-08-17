import React from 'react'
import Imagelogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'
const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={Imagelogo} alt="MyBurger"/>
        </div>
    )
}

export default Logo
