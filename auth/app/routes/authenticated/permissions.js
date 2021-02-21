import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default class AuthenticatedUsersRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service userAuthorizer;

  async beforeModel() {
    await this.userAuthorizer.validatePermission('view_perms').then((valid) => {
      if (!valid) {
        this.transitionTo('index')
      }
    })
  }

  model() {
    return this.store.findAll('permission');
  }
}
