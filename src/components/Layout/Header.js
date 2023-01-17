import {Fragment} from "react";
import mealImage from '../../assets/meals.jpeg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props)=>{
    return (
    <Fragment>
        <header className= {classes.header}>
            <h1>RealMeal</h1>
            <HeaderCartButton onClick = {props.onShowCart} />
        </header>
        <div className= {classes['main-image']}>
            <img src= { mealImage}  alt= "A Table full of delicous Meal" />
        </div>

    </Fragment>
    );
}

export default Header;