import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/NavigationItems';

import classes from './SideDrawer.module.css';

const sideDrawer = props => {

  let attachedClasses = [classes.SideDrawer];

  if (props.open) { attachedClasses.push(classes.Open);  }
  else            { attachedClasses.push(classes.Close); }

  return (
    <Aux>
      <BackDrop
        show={props.open}
        clicked={props.closed}
      />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
