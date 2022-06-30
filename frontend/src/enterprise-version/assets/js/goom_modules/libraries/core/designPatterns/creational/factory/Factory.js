'use strict';

class AbstractFactory {
  constructor() {}

  _generateProduct(productClass) {}

  makeProduct(productClass) {
    this.product = this._generateProduct(productClass);
  }
}

class ConcreteClassFactoryGenerator extends AbstractFactory {
  constructor() {
    super();
    this.product = null;
  }

  _generateProduct(productClass, argsForClass) {
    if (!argsForClass) {
      return new productClass();
    } else {
      return new productClass(...argsForClass);
    }
  }

  makeProduct(productClass, argsForClass = []) {
    if (!argsForClass) {
      this.product = this._generateProduct(productClass);
      return this.product;
    } else {
      this.product = this._generateProduct(productClass, argsForClass);
      return this.product;
    }
  }
}

function init_FactoryMethod() {
  var factoryGenerator = new ConcreteClassFactoryGenerator();

  return factoryGenerator;
}

const factory = init_FactoryMethod();

export default factory;
