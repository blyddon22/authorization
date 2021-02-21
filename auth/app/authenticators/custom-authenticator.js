import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

import fetch from 'fetch';

export default class CustomAuthenticator extends BaseAuthenticator {

  async authenticate(username, password) {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username': username, 'password': password})
      }).then((response) => {
        resolve(new Promise((resolve, reject) => {
          console.log(response);
          if (response.ok) {
            response.json().then((data) => {
              resolve({
                ...data.data,
                username
              });
            }).catch(() => {;
              reject();
            })
          } else {
            reject(response.statusText);
          }
        }))
      })
    });
  }

  restore(old_token) {
    return new Promise((resolve, reject) => {
      if (old_token && typeof old_token.refresh === 'string') {
        fetch('http://localhost:8000/login/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'refresh': old_token.refresh})
        }).then((response) => {
          response.json().then((data) => {
            response = {
              access: data.data.access,
              refresh: old_token.refresh,
              username: old_token.username
            }
            resolve(response);
          }).catch(() => {
            reject();
          });
        })
      } else {
        reject(old_token);
      }
    });
  }

  async invalidate(username) {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8000/logut/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username': username})
      }).then(() => {
        resolve();
      })
    });
  }
}
