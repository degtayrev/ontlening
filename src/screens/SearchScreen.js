import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Picker,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import {
  connect
} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  clearItem,
  getItems
} from '../redux/actions/index';

class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      headerLeft: (
        <Icon name="md-menu" color='white' size={24} style={{ marginLeft: 16 }} onPress={navigation.getParam('openDrawer')} />
      ),
      headerRight: (
        <Icon name="md-qr-scanner" color='white' size={24} style={{ marginHorizontal: 16 }} onPress={navigation.getParam('goToQrScanner')} />
      )
  })

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      by: ''
    };
  }

  componentDidMount() {
    this.props.getItems(null, false);
    this.props.navigation.setParams({ goToQrScanner: this.goToQrScanner, openDrawer: this.openDrawer });
  }

  componentWillUnmount() {
    this.props.clearItem();
  }

  goToQrScanner = () => {
    this.props.navigation.navigate('QRSearch', {
      returnData: this.returnData.bind(this)
    });
  }

  openDrawer = () => {
    this.props.navigation.openDrawer();
  }

  returnData(id) {
    this.setState({ text: id });
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
    let data = this.props.item.item;
    if (this.state.text) {
      data = this.props.item.item.filter(item => {
        let el = item.id.toLowerCase();
        if (item.name.length === 0 || this.state.by === 'name') {
          el = item.name.toLowerCase();
        } else if (this.state.by === 'location') {
          el = item.location.toLowerCase();
        } else if (this.state.by === 'category') {
          el = item.category.toLowerCase();
        }
        return el.indexOf(this.state.text.toLowerCase()) >= 0;
      });
    }
    if (data.length !== 0) {
      total = data.length;
    }
    return (
      <View>
        <StatusBar backgroundColor='green' />
        <View style={styles.container}>
          <TextInput
            style={styles.form}
            value={this.state.text}
            onChangeText={(text) => { this.setState({ text }); }}
            placeholder='Cari'
          />
          <Text>Cari Berdasarkan</Text>
          <Picker
            selectedValue={this.state.by}
            onValueChange={(itemValue) => {
              this.setState({ by: itemValue });
            }}
            mode='dialog'            
          >
            <Picker.Item label='ID' value='' />
            <Picker.Item label='Nama' value='name' />
            <Picker.Item label='Lokasi' value='location' />
            <Picker.Item label='Kategori' value='category' />
          </Picker>
        </View>
        <FlatList
          style={styles.container}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Lokasi : {item.location}</Text>
              <Text>Kategori :{item.category}</Text>
              <Text>ID Item :{item.id}</Text>
              <Text>Deskripsi :{item.description}</Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ height: 200 }}>
              <Text style={styles.total}>Total : {total}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  form: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 16
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
    marginVertical: 4
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
  clearItem,
  getItems
})(SearchScreen);
