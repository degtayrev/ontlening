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
  Image,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
  StatusBar
} from 'react-native';
import {
  connect
} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import {
  formChange,
  createBarang,
  setError,
  clearForm
} from '../redux/actions/index';

class CreateBarangScreen extends Component {

  componentWillUnmount() {
    this.props.clearForm();
  }

  onChangeForm = (text, field) => {
    this.props.formChange(text, field);
  }

  onCreate() {
    const {
      name,
      image
    } = this.props.form;
    this.props.createBarang(name, image, this.props.navigation);
  }

  choosePicture = () => {
    ImagePicker.launchImageLibrary({
      title: 'Choose Image',
      storageOptions: {
        skipBackup: true,
        path: 'Ontlening'
      },
      mediaType: 'photo',
      noData: true
    }, response => {
      if (response.didCancel) {
        return console.log('cancel');
      } else if (response.error) {
        return console.log('error', response.error);
      } else if (response.customButton) {
        return console.log('custom button', response.customButton);
      }
      this.onChangeForm(response, 'image');
    });
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
        <Text style={style.btnText}>Tambah Barang</Text>
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
        <TouchableNativeFeedback onPress={() => { this.choosePicture(); }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width, height: Dimensions.get('window').width }}>
            {this.props.form.image ? 
            <Image resizeMode='center' source={{ uri: this.props.form.image.uri, width: Dimensions.get('window').width, height: Dimensions.get('window').width }} />
            :
            <IconMi
              name='image'
              size={24}
              color='green'
            />
            }
          </View>
        </TouchableNativeFeedback>
        <View style={style.container}>
          <Text style={style.label}>Name</Text>
          <TextInput
            style={style.form}
            value={this.props.form.name}
            onChangeText={(text) => { this.onChangeForm(text, 'name'); }}
            onSubmitEditing={() => { this.onCreate(); }}
          />
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
      alignItems: 'center'
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
  form: state.form
});

export default connect(mapStateToProps, {
  formChange,
  createBarang,
  setError,
  clearForm
})(CreateBarangScreen);
