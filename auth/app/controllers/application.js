import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import DS from 'ember-data';

export default class IndexController extends Controller {
  @service userAuthorizer;
  @service session;
  @tracked showNav = false;

  get showUsersNav() {
    return DS.PromiseObject.create({
      promise: this.userAuthorizer.validatePermission('view_users').then((valid) => {
        return valid;
      })
    });
  }

  get showPermsNav() {
    return DS.PromiseObject.create({
      promise: this.userAuthorizer.validatePermission('view_perms').then((valid) => {
        return valid;
      })
    });
  }

  @action
  async open() {
    this.toggleProperty('showNav');
  }

  @action
  async logout() {
    await this.session.invalidate();
  }
}
