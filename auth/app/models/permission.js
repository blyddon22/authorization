import Model, { attr }from '@ember-data/model';

export default class PermissionModel extends Model {
  @attr code;
  @attr system;
}
