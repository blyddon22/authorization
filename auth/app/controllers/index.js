import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

export default class IndexController extends Controller {
  @service session;
}
