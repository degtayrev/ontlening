import React, {
  Component
} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  Alert,
  StatusBar
} from 'react-native';
import {
  connect
} from 'react-redux';

import {
  formChange,
  login,
  setError
} from '../redux/actions/index';

class LoginScreen extends Component {
  onChangeForm = (text, field) => {
    this.props.formChange(text, field);
  }

  onLogin() {
    const { username, password } = this.props.form;
    this.props.login(username, password, this.props.navigation);
  }

  renderUsernameErr() {
    if (this.props.form.usernameMsg) {
      return (
        <Text style={style.error}> - {this.props.form.usernameMsg}</Text>
      );
    }
  }

  renderPasswordErr() {
    if (this.props.form.passwordMsg) {
      return (
        <Text style={style.error}> - {this.props.form.passwordMsg}</Text>
      );
    }
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
        <Text style={style.btnText}>Login</Text>
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
        <View style={style.header}>
          <Text style={style.headerText}>Ontlening</Text>
        </View>
        <View style={style.container}>
          <Text style={style.label}>Username {this.renderUsernameErr()}</Text>
          <TextInput
            style={style.form}
            value={this.props.form.username}
            onChangeText={(text) => { this.onChangeForm(text, 'username'); }}
            onSubmitEditing={() => { this.passwordInput.focus(); }}
            blurOnSubmit={false}
            returnKeyType={'next'}
            autoCapitalize='none'
          />
          <Text style={style.label}>Password {this.renderPasswordErr()}</Text>
          <TextInput
            style={style.form}
            value={this.props.form.password}
            onChangeText={(text) => { this.onChangeForm(text, 'password'); }}
            onSubmitEditing={() => { this.onLogin(); }}
            secureTextEntry
            ref={input => { this.passwordInput = input; }}
          />
          <TouchableHighlight onPress={() => this.onLogin()}>
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
  form: state.form,
});

export default connect(mapStateToProps, {
  formChange,
  login,
  setError
})(LoginScreen);
