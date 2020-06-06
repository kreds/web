import React from 'react';
import { useSelector } from 'react-redux';
import { Unstable_AppNavBar as AppNavBar } from 'baseui/app-nav-bar';
import { Overflow as UserIcon } from 'baseui/icon';

import { StateType } from '../reducers';

function renderItem(item: any) {
  return item.label;
}

const USER_NAV = [
  {
    icon: UserIcon,
    item: { label: 'Settings' },
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
];

const NavBar: React.FC = () => {
  const noop = () => false;
  const currentUser = useSelector((state: StateType) => state.currentUser);

  return (
    <AppNavBar
      appDisplayName={'Kreds'}
      isNavItemActive={noop}
      onNavItemSelect={noop}
      username={currentUser?.name}
      usernameSubtitle={currentUser?.fullName}
      userImgUrl=""
      userNav={currentUser ? USER_NAV : undefined}
    />
  );
};

export default NavBar;
