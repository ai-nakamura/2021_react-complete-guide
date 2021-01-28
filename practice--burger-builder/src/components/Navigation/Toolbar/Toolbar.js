import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../Navigationitems/NavigationItems';

import Logo from '../../Logo/Logo';
import classes from './toolbar.module.css';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle
      clicked={props.drawerToggleClicked}
    />

    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
