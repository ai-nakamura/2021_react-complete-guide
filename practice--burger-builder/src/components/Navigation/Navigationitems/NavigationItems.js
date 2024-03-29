import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';



const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated
      ? <NavigationItem link="/orders">Orders</NavigationItem>
      : null
    }
    {!props.isAuthenticated
      ? <NavigationItem link="/auth">Authenticate</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem>
    }
    {/*{console.log('isAuthenticated: ' + props.isAuthenticated)}*/}
  </ul>
);

export default navigationItems;
