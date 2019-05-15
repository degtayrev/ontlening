/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  Text,
  ScrollView,
  View,
  Image
} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation';
import {
  Provider
} from 'react-redux';
import {
 createStore,
 applyMiddleware
} from 'redux';
import ReduxThunk from 'redux-thunk';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import reducers from './src/redux/reducers/index';
import Auth from './src/screens/Auth';
import BarangScreen from './src/screens/BarangScreen';
import ItemScreen from './src/screens/ItemScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateBarangScreen from './src/screens/CreateBarang';
import CreateItemScreen from './src/screens/CreateItem';
import SearchScreen from './src/screens/SearchScreen';
import AboutScreen from './src/screens/AboutScreen';
import QRScreen from './src/screens/QRScreen';


const StackNavigator = createStackNavigator({
  Barang: {
    screen: BarangScreen,
    navigationOptions: () => ({
      headerTitle: 'Barang'
    })
  },
  Item: {
    screen: ItemScreen
  },
  TambahBarang: {
    screen: CreateBarangScreen,
    navigationOptions: () => ({
      headerTitle: 'Tambah Barang'
    })
  },
  TambahItem: {
    screen: CreateItemScreen,
    navigationOptions: () => ({
      headerTitle: 'Tambah Item'
    })
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: 'white'
  }
});

const StackNavigator2 = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      headerTitle: 'Search'
    })
  },
  QRSearch: {
    screen: QRScreen,
    navigationOptions: () => ({
      headerTitle: 'QR Search'
    })
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: 'white'
  }
});

const StackNavigator3 = createStackNavigator({
  About: {
    screen: AboutScreen,
    navigationOptions: () => ({
      headerTitle: 'About'
    })
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'green'
    },
    headerTintColor: 'white'
  }
});

const DrawerNavigator = createDrawerNavigator({
  Barang: {
    screen: StackNavigator,
    navigationOptions: () => ({
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-home" color={tintColor || 'black'} size={24} />
      )
    })
  },
  Cari: {
    screen: StackNavigator2,
    navigationOptions: () => ({
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-search" color={tintColor || 'black'} size={24} />
      )
    })
  },
  About: {
    screen: StackNavigator3,
    navigationOptions: () => ({
      drawerIcon: ({ tintColor }) => (
        <IconMi name="info" color={tintColor || 'black'} size={24} />
      )
    })
  }
}, {
  contentComponent: props => (
    <ScrollView>
      <View style={{ height: 200, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'green', padding: 8 }}>
        <Image source={require('./src/logo.png')} style={{ width: 200, height: 48 }} resizeMode='center' />
        <Text style={{ color: 'white' }}>1.0.0</Text>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  ),
  contentOptions: {
    activeTintColor: 'green'
  }
});

const SwitchNavigator = createSwitchNavigator({
  Auth,
  Stack: DrawerNavigator,
  Login: LoginScreen
});

const AppContainer = createAppContainer(SwitchNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppContainer />
      </Provider>
    );
  }
}
