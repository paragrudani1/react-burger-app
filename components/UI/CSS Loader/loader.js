import React from 'react';
import classes from './loader.module.css'

const loader = () => {
    return ( 
        <div className={classes.LdsRipple}><div></div><div></div></div>
     );
}
 
export default loader;