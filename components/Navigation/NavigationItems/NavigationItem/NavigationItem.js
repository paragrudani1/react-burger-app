import React from 'react';
import classes from './NavigationItem.module.css'

const navigationItem = (props) => {
    return ( 
        // <ul className={classes.NavigationItem}>
            <li className={classes.NavigationItem}>
                <a 
                    href="/"
                    className={props.active ? classes.active : null}>
                {props.children}
                </a>
            </li>
        // </ul>
     );
}
 
export default navigationItem;