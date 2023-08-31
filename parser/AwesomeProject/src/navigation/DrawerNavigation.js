import React from 'react'
import Home from '../screens/Home';
import Parsing from '../screens/Parsing';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem  } from '@react-navigation/drawer';
import Profile from '../screens/Profile/Profile';
import Settings from '../screens/Settings/Settings';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Parsing" component={Parsing} />
      <Drawer.Screen name="Profile" component={Profile}/>
      <Drawer.Screen name="Settings" component={Settings}/>
      </Drawer.Navigator>
  )
}

export default DrawerNavigation