import axios from 'axios';
import settings from '../config/settings';
import Auth from './Auth';

const baseUri = '/todo';

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
  },
  create: function (todo) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: settings.baseUrl + baseUri,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': Auth.getToken()
        },
        data: todo
      })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error?.response?.data || error);
        });
    });
  },
  update: function (id, todo) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: settings.baseUrl + baseUri + `/${id}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': Auth.getToken()
        },
        data: todo
      })
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error?.response?.data || error);
        });
    });
  },
  delete: function (id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: settings.baseUrl + baseUri + `/${id}`,
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
