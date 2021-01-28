import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/NavigationItems';

import classes from './toolbar.module.css';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>menu</div>

    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
