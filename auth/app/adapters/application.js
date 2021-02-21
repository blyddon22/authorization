import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  host = 'http://localhost:8000';

  get headers() {
    return {
      'Authorization': `Bearer ${this.session.data.authenticated.access}`,
      'Accept': 'application/vnd.api+json'
    };
  }
}
