import React, {Component} from 'react';
import Aux from '../../../hoc/Auxliary'
import Button from '../../UI/Button/Button'

// could be function 
class OrderSummary extends Component {
    
    // could be done from this too
    // shouldComponentUpdate(nextProps) {
    //   return nextProps.ingredient === this.props.ingredient  
    // }

    // componentWillUpdate() {
    //     console.log('[Ordersummary], willupdate');
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredient)
            .map(igkey => <li key={igkey} ><span style={{textTransform: "capitalize"}}>{igkey}</span>: {this.props.ingredient[igkey]}</li>)
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType='Danger' clicked={this.props.canceled}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.continue} >Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary;