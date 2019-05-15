import React, {
  Component
} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';
import {
  QRscanner
} from 'react-native-qr-scanner';

class QRScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashMode: false,
      zoom: 0.2
    };
  }

  onRead = (res) => {
    this.props.navigation.state.params.returnData(JSON.parse(res.data).id);
    this.props.navigation.goBack();
  }

  bottomView = () => (
    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#0000004D' }}>
      <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ flashMode: !this.state.flashMode })}>
        <Text style={{ color: '#fff' }}>Flashlight</Text>
      </TouchableOpacity>
    </View>
    )

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='green' />
        <QRscanner onRead={this.onRead} renderBottomView={this.bottomView} flashMode={this.state.flashMode} zoom={this.state.zoom} finderY={50} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});

export default QRScreen;
