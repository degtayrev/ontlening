import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Alert,
  StyleSheet,
  Picker,
  StatusBar
} from 'react-native';
import {
  connect
} from 'react-redux';

import {
  formChange,
  createItem,
  setError,
  clearForm,
  getBarang
} from '../redux/actions/index';

class CreateItemScreen extends Component {
  componentDidMount() {
    this.props.getBarang();
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  onChangeForm = (text, field) => {
    this.props.formChange(text, field);
  }

  onCreate() {
    const {
      name,
      location,
      quantity,
      category,
      description
    } = this.props.form;
    this.props.createItem(name, location, quantity, description, category, this.props.navigation);
  }

  renderLoading() {
    if (this.props.form.loading) {
      return (
        <View style={style.btn}>
          <ActivityIndicator
          size={16}
          color='white'
          />
        </View>
      );
    }
    return (
      <View style={style.btn}>
        <Text style={style.btnText}>Tambah Item</Text>
      </View>
    );
  }

  renderConnectionState() {
    if (this.props.form.connection) {
      Alert.alert(
        '',
        this.props.form.connection,
        [{
          text: 'Ok',
          onPress: () => this.props.setError()
        }], {
          onDismiss: () => this.props.setError()
        }
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <StatusBar backgroundColor='green' />
        {this.renderConnectionState()}
        <View style={style.container}>
          <Text style={style.label}>Nama</Text>
          <TextInput
            style={style.form}
            value={this.props.form.name}
            onChangeText={(text) => { this.onChangeForm(text, 'name'); }}
            blurOnSubmit={false}
            onSubmitEditing={() => { this.locationInput.focus(); }}
          />
          <Text style={style.label}>Lokasi</Text>
          <TextInput
            style={style.form}
            value={this.props.form.location}
            onChangeText={(text) => { this.onChangeForm(text, 'location'); }}
            blurOnSubmit={false}
            onSubmitEditing={() => { this.quantity.focus(); }}
            ref={input => { this.locationInput = input; }}
          />
          <Text style={style.label}>Kuantitas</Text>
          <TextInput
            style={style.form}
            value={this.props.form.quantity.toString()}
            onChangeText={(text) => { this.onChangeForm(text, 'quantity'); }}
            keyboardType='numeric'
            ref={input => { this.quantity = input; }}
          />
          <Text style={style.label}>Deskripsi</Text>
          <TextInput
            style={style.form}
            value={this.props.form.description}
            onChangeText={(text) => { this.onChangeForm(text, 'description'); }}
            multiline
            ref={input => { this.quantity = input; }}
          />
          <Text style={style.label}>Category</Text>
          <Picker
              selectedValue={this.props.form.category}
              onValueChange={(itemValue) => {
                this.onChangeForm(itemValue, 'category');
              }}
          >
              <Picker.Item label='Pilih Category' value='' />
              {this.props.barang.barang.map(el => (
                  <Picker.Item key={el.id} label={`${el.name}`} value={`${el.name}`} />
              ))}
          </Picker>
          <TouchableHighlight onPress={() => this.onCreate()}>
            {this.renderLoading()}
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  header: {
      backgroundColor: 'green',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerText: {
      color: 'white',
      fontSize: 32
    },
    container: {
      padding: 8
    },
    label: {
      color: 'black'
    },
    form: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 8,
      marginVertical: 8,
      paddingHorizontal: 16
    },
    btn: {
      height: 54,
      backgroundColor: 'green',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 8
    },
    btnText: {
      color: 'white',
      fontSize: 16
    },
    error: {
      fontStyle: 'italic',
      color: 'red'
    }
});

const mapStateToProps = state => ({
  form: state.form,
  barang: state.barang
});

export default connect(mapStateToProps, {
  formChange,
  createItem,
  setError,
  clearForm,
  getBarang
})(CreateItemScreen);
