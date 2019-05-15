import React, {
  Component
} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import {
  connect
} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  getItems,
  deleteBarang,
  clearItem
} from '../redux/actions/index';

class ItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: (
        navigation.getParam('category')
      ),
      headerRight: (
        <Icon name="md-trash" color='red' size={24} style={{ marginHorizontal: 16 }} onPress={navigation.getParam('deleteBarang')} />
      )
  })

  componentDidMount() {
    const category = this.props.navigation.state.params.item.name;
    this.props.navigation.setParams({ category, deleteBarang: this.deleteBarang });
    this.props.getItems(category, true);
  }

  componentWillUnmount() {
    this.props.clearItem();
  }

  deleteBarang = () => {
    this.props.deleteBarang(this.props.navigation.state.params.item.id, this.props.navigation);
  }

  render() {
    if (this.props.item.loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <StatusBar backgroundColor='green' />
          <ActivityIndicator color='green' size={24} />
        </View>
      );
    } else if (this.props.item.connection) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <StatusBar backgroundColor='green' />
          <Icon name="md-refresh" color='green' size={32} style={{ marginHorizontal: 16 }} onPress={() => this.props.getItems()} />
          <Text style={{ color: 'green', fontSize: 16 }}>Cek koneksi internet anda</Text>
        </View>
      );
    }
    let total = 0;
    if (this.props.item.item.length !== 0) {
        total = this.props.item.item.length;
    }
    return (
      <FlatList
        style={styles.container}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        keyExtractor={item => item.id}
        data={this.props.item.item}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <StatusBar backgroundColor='green' />
            <Text style={styles.name}>{item.name}</Text>
            <Text>Lokasi : {item.location}</Text>
            <Text>ID Item :{item.id}</Text>
            <Text>Deskripsi :{item.description}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <Text style={styles.total}>Total {`${this.props.navigation.state.params.item.name}`} : {total}</Text>
        )}
        ListEmptyComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tidak ada item</Text>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  card: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8
  },
  name: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600'
  },
  total: {
    margin: 8,
    fontSize: 18,
    color: 'black',
    fontWeight: '500'
  }
});

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, {
  getItems,
  deleteBarang,
  clearItem
})(ItemScreen);
