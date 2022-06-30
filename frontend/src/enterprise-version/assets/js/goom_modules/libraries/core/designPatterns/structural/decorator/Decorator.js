'use strict';

class AbstractComponent {
  constructor() {}

  run() {}
}

class Decorator extends AbstractComponent {
  constructor(component) {
    super();
    this.component = component;
  }

  run() {
    this.component.run();
  }
}

class AppDemoDecorator extends Decorator {
  constructor(component) {
    super();
    this.component = component;
  }

  run() {
    this.component.run();
  }
}

class AppStagingDecorator extends Decorator {
  constructor(component, debugMode = true) {
    super(component);
    this.debugMode = debugMode;
  }

  run() {
    if (this.debugMode) super.run();
  }
}

class AppProductionDecorator extends Decorator {
  constructor(component, enterpriseApp = false, LicenceKeyChecker) {
    super(component);
    this.enterpriseApp = enterpriseApp;
    // dont for now saladin...
  }

  run() {
    if (this.checkLicenceKeyValidation()) {
      super.run();
    } else {
      console.log('expired licence key');
    }
  }

  checkLicenceKeyValidation() {
    return true;
  }
}

let AllDecorators = {
  AbstractComponent,
  AppDemoDecorator,
  AppStagingDecorator,
  AppProductionDecorator,
};
export default AllDecorators;
