import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class AboutScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      headerLeft: (
        <Icon name="md-menu" color='white' size={24} style={{ marginLeft: 16 }} onPress={navigation.getParam('openDrawer')} />
      )
  })

  componentDidMount() {
    this.props.navigation.setParams({ openDrawer: this.openDrawer });
  }

  openDrawer = () => {
    this.props.navigation.openDrawer();
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor='green' />
        <Text>About</Text>
      </View>
    );
  }
}

export default AboutScreen;
