import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatGrid
} from 'react-native-super-grid';

import {
  getBarang
} from '../redux/actions/index';

class BarangScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      headerLeft: (
        <Icon name="md-menu" color='white' size={24} style={{ marginLeft: 16 }} onPress={navigation.getParam('openDrawer')} />
      )
  })

  componentDidMount() {
    this.props.getBarang();
    this.props.navigation.setParams({ openDrawer: this.openDrawer });
  }

  openDrawer = () => {
    this.props.navigation.openDrawer();
  }

  returnData() {
    this.props.getBarang();
  }

  render() {
    if (this.props.barang.loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <StatusBar backgroundColor='green' />
          <ActivityIndicator color='green' size={24} />
        </View>
      );
    } else if (this.props.barang.connection) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <StatusBar backgroundColor='green' />
          <Icon name="md-refresh" color='green' size={32} style={{ marginHorizontal: 16 }} onPress={() => this.props.getBarang()} />
          <Text style={{ color: 'green', fontSize: 16 }}>Cek koneksi internet anda</Text>
        </View>
      );
    } else if (this.props.barang.barang.length === 0) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <StatusBar backgroundColor='green' />
          <Text style={{ color: 'green', fontSize: 16 }}>Tidak ada barang</Text>
          <ActionButton buttonColor="green">
            <ActionButton.Item size={48} buttonColor='#9b59b6' title="Tambah Barang" onPress={() => this.props.navigation.navigate('TambahBarang', { returnData: this.returnData.bind(this) })}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item size={48} buttonColor='#3498db' title="Tambah Item" onPress={() => this.props.navigation.navigate('TambahItem')}>
              <Icon name="md-list" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      );
    }
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <StatusBar backgroundColor='green' />
        {this.props.barang.barang.length !== 0 ? 
        <FlatGrid
          itemDimension={130}
          items={this.props.barang.barang}
          style={styles.gridView}
          renderItem={({ item }) => (
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Item', { item, returnData: this.returnData.bind(this) })}>
              <View style={styles.itemContainer}>
                <Image resizeMode='center' source={{ uri: `${item.image}`, width: '100%', height: 234 }} />
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
            </TouchableNativeFeedback>
          )}
        />
        :
        null
        }
        <ActionButton buttonColor="green">
          <ActionButton.Item size={48} buttonColor='#9b59b6' title="Tambah Barang" onPress={() => this.props.navigation.navigate('TambahBarang', { returnData: this.returnData.bind(this) })}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item size={48} buttonColor='#3498db' title="Tambah Item" onPress={() => this.props.navigation.navigate('TambahItem')}>
            <Icon name="md-list" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 250,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600'
  }
});

const mapStateToProps = state => ({
  barang: state.barang
});

export default connect(mapStateToProps, {
  getBarang
})(BarangScreen);
