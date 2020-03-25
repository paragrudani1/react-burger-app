import React, { Component } from 'react';
import Aux from '../../hoc/Auxliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Loader from '../../components/UI/CSS Loader/loader'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICES = {
                        salad: 0.2,
                        bacon: 0.7,
                        cheese: 1.2,
                        meat: 1.7
                    }

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-app-80824.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error: error})
        })
    }

    updatePurchase = (ingredients) => {
        
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum, el) => {
            return sum + el
        }, 0)
        
        this.setState({purchasable: sum > 0})
    }
    
    addIngredientHandler = (type) => {
        const oldCounter = this.state.ingredients[type];
        
        
        const updatedCount = oldCounter + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        const priceAddition = INGREDIENTS_PRICES[type];
        console.log(INGREDIENTS_PRICES['salad'] + this.state.totalPrice );
        
        const newPrice = this.state.totalPrice + priceAddition 
        
        updatedIngredient[type] = updatedCount;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredient })
        
        this.updatePurchase(updatedIngredient)
    }
    
    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return false;
        } 
        oldCount--
        
        
        const updatedIngredient = {
            ...this.state.ingredients
        }
        
        const priceDecrease = INGREDIENTS_PRICES[type];
        
        const newPrice = this.state.totalPrice - priceDecrease 
        
        updatedIngredient[type] = oldCount;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredient })
        
        this.updatePurchase(updatedIngredient)    
    }
    
    reset = () => {
        const ingredients = {
            ...this.state.ingredients
        }

        const reset = Object.fromEntries(Object.entries(ingredients).map(([key, value]) => [key, value = 0]))
        // console.log(reset);
        
        this.setState({ingredients: reset, totalPrice: 4, purchasable: false})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})

        const order = {
            ingredient: this.state.ingredients,
            price: this.state.totalPrice,
            address: {
                city: 'Netra',
                country: 'India',
                zipCode : 370620,
                address : 'bajrang Niwas, patel dabeli near dena bank'
            },
            'Phone Number': +919558744129
        }

       axios.post('/orders.json', order)
       .then(res => {
           this.setState({loading: false, purchasing: false})
       })
       .catch(err => console.log(err)
       )

    }


    render() { 
        let disabledInfo = {
            ...this.state.ingredients
        }
        
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Something Went Wrong!</p> : <Loader />

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                        <BuildControls ingredientsAdded={this.addIngredientHandler} ingredientsRemoved={this.removeIngredientHandler} disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            price={this.state.totalPrice}
                            reset={this.reset}
                            ordered={this.purchaseHandler}/>
                </Aux>
            )

            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                continue={this.purchaseContinueHandler}
                canceled={this.purchaseCancelHandler} 
                ingredient={this.state.ingredients} />
        }

        if (this.state.loading) {
            orderSummary = <Loader />            
        }
            
        return (
            <Aux>
                <Modal show={this.state.purchasing} canceled={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
 
export default withErrorHandler(BurgerBuilder, axios);