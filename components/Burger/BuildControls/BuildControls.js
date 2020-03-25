import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
// import BurgerBuilder from '../../../containers/BurgerBuilder/BurgerBuilder'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((el,i) => 
                <BuildControl 
                        removed={() => props.ingredientsRemoved(el.type)} 
                        added={ () => props.ingredientsAdded(el.type)} 
                        key={el.label} 
                        label={el.label} 
                        disabled={props.disabled[el.type]} 
                        />
            )}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}
                >
                    ORDER NOW
            </button>
            <button onClick={props.reset}>Reset</button>
        </div>
    );
}
 
export default buildControls;