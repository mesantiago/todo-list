import axios from 'axios';
import settings from '../config/settings';
import Auth from './Auth';

const baseUri = '/users';

export default {
  getAll: function () {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: settings.baseUrl + baseUri,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': Auth.getToken()
        }
      })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error?.response?.data || error);
        });
    });
  }
};
