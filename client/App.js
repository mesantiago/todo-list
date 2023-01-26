import React, { useEffect } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './app/components/Header';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import Auth from './app/services/Auth';
import HomeScreen from './app/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App () {
  const [currentPage, changeCurrentPage] = React.useState();
  const [currentUser, changeCurrentUser] = React.useState();
  const [isAuthenticated, changeAuthentication] = React.useState(false);
  const [isLoading, changeLoadingState] = React.useState(true);

  const navigation = useNavigationContainerRef();

  // On Load
  useEffect(() => {
    (async () => {
      await Auth.loadAuth();
      changeLoadingState(false);
    })();
  }, []);
  // Listeners
  useEffect(() => {
    if (!isLoading) {
      changeCurrentUser(Auth.getCurrentUser());
    }
  }, [isLoading]);
  useEffect(() => changeAuthentication(!!currentUser), [currentUser]);
  useEffect(() => determineLandingPage(), [isAuthenticated]);

  const determineLandingPage = () => {
    if (!isLoading && navigation.isReady()) {
      if (!isAuthenticated) {
        navigation.reset({
          index: 1,
          routes: [{ name: 'Login' }]
        });
      } else {
        navigation.reset({
          index: 1,
          routes: [{ name: 'Home' }]
        });
      }
    }
  };

  const onScreenChange = (params) =>
    changeCurrentPage(params.routes[params.routes.length - 1]);

  const onAuthChange = () => changeCurrentUser(Auth.getCurrentUser());
  const onSignUp = () =>
    navigation.navigate({
      name: 'SignUp'
    });
  const onLogin = () => navigation.goBack();

  // Replace null with loading screen
  return isLoading
    ? null
    : (
    <NavigationContainer
      ref={navigation}
      onReady={determineLandingPage}
      onStateChange={onScreenChange}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              currentPage={currentPage}
              onLogout={onAuthChange}
              onSignUp={onSignUp}
              onLogin={onLogin}
            />
          )
        }}
      >
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} onLogin={onAuthChange} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} user={currentUser} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
      );
}
