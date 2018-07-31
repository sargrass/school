import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import theme from './theme'

registerScreens();

// start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'chatapp.center_screen',
    title: 'Chat'
  },
  drawer: {
    left: {
      screen: 'chatapp.left_drawer'
    },
    right: {
      screen: 'chatapp.right_drawer'
    },
    type: 'MMDrawer',
    animationType: 'door'
  }
});
