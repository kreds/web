import React from 'react';
import { Unstable_AppNavBar as AppNavBar } from 'baseui/app-nav-bar';

const NavBar: React.FC = () => {
  const noop = () => false;

  return (
    <AppNavBar
      appDisplayName={'Kreds'}
      isNavItemActive={noop}
      onNavItemSelect={noop}
    />
  );
};

export default NavBar;
