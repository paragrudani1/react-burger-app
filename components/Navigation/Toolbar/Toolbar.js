import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'

const toolbar = (props) => {
    return ( 
        <header className={classes.Toolbar}>
            <div onClick={props.opened} className={classes.Menu} >Menu</div>
            <Logo height="80%"/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}
 
export default toolbar;