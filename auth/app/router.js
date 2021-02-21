import EmberRouter from '@ember/routing/router';
import config from 'auth/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('authenticated', {path: ''}, function() {
    this.route('users');
    this.route('permissions');
  });
  this.route('login');
  this.route('index', {path: '/'});
});
