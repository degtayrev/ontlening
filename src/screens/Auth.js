import React, {
  Component
} from 'react';
import {
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Auth extends Component {
  async componentDidMount() {
    // await AsyncStorage.clear();
    await AsyncStorage.getItem('Token', (err, res) => {
      if (res) {
        return this.props.navigation.navigate('Stack');
      }
      return this.props.navigation.navigate('Login');
    });
  }
  render() {
    return (
      <View />
    );
  }
}

export default Auth;
