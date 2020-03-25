import React, {Component} from 'react';
import Aux from '../../hoc/Auxliary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }

    // sideDrawerClosedHandler = () => {
    //     this.setState({showSideDrawer: !this.state.showSideDrawer})
    // }

    // sideDrawerOpenHandler = () => {
    //     this.setState({showSideDrawer: !this.state.showSideDrawer})
    // }

    sideDrawerToggleHandler = () => {
        this.setState(prevState =>  {
            return {showSideDrawer: !prevState.showSideDrawer} 
        })
    }
    
    render() {
        return(
            <Aux>
                <Toolbar opened={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler} />
                    <div>Toolbar, sidebar, backdrop</div>
                    <main className={classes.Content}>
                    {this.props.children}
                    </main>
            </Aux>
        )
    }
}

export default Layout;