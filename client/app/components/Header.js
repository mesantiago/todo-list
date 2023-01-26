import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Linking,
  Button
} from 'react-native';
import * as PropTypes from 'prop-types';

import colors from '../config/colors';
import Auth from '../services/Auth';
import { useEffect } from 'react';

export default function Header ({
  isAuthenticated,
  currentPage,
  onSignUp,
  onLogin,
  onLogout
}) {
  const logOut = async () => {
    await Auth.logout();
    onLogout();
  };
  useEffect(() => {}, [isAuthenticated]);

  const getButton = () => {
    if (isAuthenticated) {
      return (
        <Button
          title="Log out"
          style={styles.button}
          color={colors.primaryButton}
          onPress={logOut}
        ></Button>
      );
    } else if (currentPage) {
      if (currentPage.name === 'Login') {
        return (
          <Button
            title="Sign up"
            style={styles.button}
            color={colors.primaryButton}
            onPress={onSignUp}
          ></Button>
        );
      } else {
        return (
          <Button
            title="Login"
            style={styles.button}
            color={colors.primaryButton}
            onPress={onLogin}
          ></Button>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://www.carelulu.com')}
      >
        <Image
          style={styles.logo}
          source={require('../../assets/whiteLogo2-min.png')}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>{getButton()}</View>
    </View>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLogout: PropTypes.func,
  onSignUp: PropTypes.func,
  onLogin: PropTypes.func,
  currentPage: PropTypes.object
};

const styles = StyleSheet.create({
  header: {
    padding: 5,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  logo: {
    height: 40,
    width: 150
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    right: 10
  }
});
