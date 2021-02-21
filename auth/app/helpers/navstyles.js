import Helper from '@ember/component/helper';

import { inject as service } from '@ember/service';

export default class navstyles extends Helper {
  @service router;

  compute([route, size]) {
    const activeRouteClasses = "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
    const inactiveRouteClasses = "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
    const activeRouteClassesMobile = "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium";
    const inactiveRouteClassesMobile = "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium";

    if (this.router.currentRoute.localName === route)  {
      return size === 'mobile' ? activeRouteClassesMobile : activeRouteClasses;
    }
    return size === 'mobile' ? inactiveRouteClassesMobile : inactiveRouteClasses;
  }
};
