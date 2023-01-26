import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import * as PropTypes from 'prop-types';

import colors from '../config/colors';
import Auth from '../services/Auth';
import Screen from '../components/Screen';

function LoginScreen ({ navigation, onLogin }) {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorMessage, onChangeMessage] = React.useState('');

  const onSubmit = () => {
    onChangeMessage('');
    if (!username) {
      return onChangeMessage('Username is required');
    }
    if (!password) {
      return onChangeMessage('Password is required');
    }
    Auth.login({
      username,
      password
    })
      .then(onLogin)
      .catch((err) => {
        onChangeMessage(err?.message || 'Something went wrong');
      });
  };

  return (
    <Screen>
      <View style={styles.login}>
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login to Todo-list</Text>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{errorMessage}</Text>
          </View>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={onChangeUsername}
            onSubmitEditing={onSubmit}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={onChangePassword}
            onSubmitEditing={onSubmit}
            placeholder="Password"
          />
          <Button
            title="Submit"
            color={colors.secondaryButton}
            onPress={onSubmit}
          ></Button>
        </View>
      </View>
    </Screen>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.object,
  onLogin: PropTypes.func
};

const styles = StyleSheet.create({
  login: {
    alignItems: 'center'
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  error: {
    color: colors.error
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    color: colors.primaryText,
    fontSize: 25,
    padding: 10
  },
  form: {
    borderColor: colors.mutedText,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    maxWidth: 300,
    padding: 10
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.mutedText,
    padding: 10
  }
});

export default LoginScreen;
