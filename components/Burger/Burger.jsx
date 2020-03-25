import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient' 

const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
    .map((igkey) => {
        return [...Array(props.ingredients[igkey])]
        .map((_, i) => {
            return <BurgerIngredient type={igkey} key={igkey + i} />
        })
    })
    .reduce((arr,el) => {

        return arr.concat(el)
    }, [])

    if(transformIngredients.length === 0) {
        transformIngredients = <p>Please start adding Ingredients</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;