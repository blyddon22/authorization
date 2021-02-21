import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginComponent extends Component {
  @service session;
  @service router;
  @tracked username = '';
  @tracked password = '';
  @tracked status = 'Not logged in';
  @tracked loading = false;
  @tracked error = '';

  @action
  async authenticate() {
    this.loading = true;
    this.error = '';
    await this.session.authenticate('authenticator:custom-authenticator', this.username, this.password).catch((error) => {
      this.error = error;
    });
    this.loading = false;

    if (this.session.isAuthenticated) {
      this.router.transitionTo(this.session.attemptedTransition);
    }
  }
}
