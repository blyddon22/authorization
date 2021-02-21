import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

export default class UserController extends Controller {
  @service userAuthorizer;
  editing = false;

  get hasEditUsers() {
    return DS.PromiseObject.create({
      promise: this.userAuthorizer.validatePermission('edit_users').then((valid) => {
        return valid;
      })
    });
  }

  @action
  async toggleEditing() {
    this.toggleProperty('editing');
  }
}
