import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class UserAuthorizerService extends Service {
  @service session;

  permissions = {};

  async validatePermission(permission) {
    if(Object.keys(this.permissions).indexOf(permission) >= 0){
      return this.permissions[permission];
    }

    if (!this.session.isAuthenticated) {
      return false;
    }

    return new Promise((resolve, reject) => {
      fetch('http://localhost:8000/validate-permission/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username': this.session.data.authenticated.username, 'permission': permission})
      }).then((response) => {
        response.json().then((result) => {
          const existingPerms = this.permissions;
          this.set('permissions', {
            ...existingPerms,
            [permission]: result.data.valid
          });
          resolve(result.data.valid);
        });
      })
    });
  }
}
