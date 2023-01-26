import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

import Screen from '../components/Screen';
import colors from '../config/colors';
import Auth from '../services/Auth';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function SignUpScreen () {
  const [username, onChangeUsername] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [success, onChangeSuccess] = React.useState(false);
  const [errorMessage, onChangeMessage] = React.useState('');

  const onSubmit = () => {
    onChangeMessage('');
    if (!username) {
      return onChangeMessage('Username is required');
    }
    if (!email) {
      return onChangeMessage('Email is required');
    }
    if (!emailRegex.test(email)) {
      return onChangeMessage('Invalid email');
    }
    if (!password) {
      return onChangeMessage('Password is required');
    }
    Auth.signUp({
      username,
      email,
      password
    })
      .then(() => {
        onChangeSuccess(true);
      })
      .catch((err) => {
        onChangeMessage(err?.message || 'Something went wrong');
      });
  };

  return (
    <Screen>
      <View style={styles.signup}>
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign up to Todo-list</Text>
          </View>
          {success
            ? (
            <View style={styles.messageContainer}>
              <Text style={styles.success}>
                Successfully created user {username}
              </Text>
              <Text style={styles.success}>Please login to continue</Text>
            </View>
              )
            : (
            <View>
              <View style={styles.messageContainer}>
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
                value={email}
                onChangeText={onChangeEmail}
                onSubmitEditing={onSubmit}
                placeholder="Email"
                keyboardType="email-address"
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
              )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  signup: {
    alignItems: 'center'
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  success: {
    color: colors.success
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

export default SignUpScreen;
