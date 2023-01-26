import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import settings from '../config/settings';

let authToken, currentUser;
const baseUri = '/auth';

const setAccesToken = async (accessToken) => {
  authToken = accessToken;
  switch (Platform.OS) {
    case 'android':
    case 'ios':
      return await SecureStore.setItemAsync('authToken', accessToken);
    default:
      return await AsyncStorage.setItem('authToken', accessToken);
  }
};

const getAccessToken = async () => {
  switch (Platform.OS) {
    case 'android':
    case 'ios':
      return await SecureStore.getItemAsync('authToken');
    default:
      return await AsyncStorage.getItem('authToken');
  }
};

const clearAccessToken = async () => {
  switch (Platform.OS) {
    case 'android':
    case 'ios':
      return await SecureStore.deleteItemAsync('authToken');
    default:
      return await AsyncStorage.removeItem('authToken');
  }
};

const getUser = () => {
  return new Promise((resolve, reject) => {
    if (!authToken) {
      return resolve();
    }
    axios({
      method: 'get',
      url: settings.baseUrl + baseUri + '/me',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': authToken
      }
    })
      .then(async (response) => {
        const user = response?.data;
        if (!user) {
          return reject(new Error('Unable to authenticate'));
        }
        currentUser = user;
        resolve(currentUser);
      })
      .catch((error) => {
        reject(error?.response?.data || error);
      });
  });
};

export default {
  loadAuth: async function () {
    authToken = await getAccessToken();
    currentUser = await getUser(authToken);
  },
  getToken: function () {
    return authToken;
  },
  getCurrentUser: function () {
    return currentUser;
  },
  login: function (credentials) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: settings.baseUrl + baseUri + '/signin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: credentials
      })
        .then(async (response) => {
          const accessToken = response?.data?.accessToken;
          if (!accessToken) {
            return reject(new Error('Unable to authenticate'));
          }
          await setAccesToken(accessToken);
          currentUser = await getUser(authToken);
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error?.response?.data || error);
        });
    });
  },
  signUp: function (credentials) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: settings.baseUrl + baseUri + '/signup',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: credentials
      })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error?.response?.data || error);
        });
    });
  },
  logout: async function () {
    await clearAccessToken();
    authToken = undefined;
    currentUser = undefined;
  }
};
