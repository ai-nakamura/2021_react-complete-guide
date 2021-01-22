import React from 'react';

const authContext = React.createContext({
  // technically you don't have to set these,
  // but it helps in writing the code
  authenticated: false,
  login: () => {}
});

export default authContext;