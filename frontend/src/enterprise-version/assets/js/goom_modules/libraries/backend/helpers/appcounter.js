'use strict';
let IReporterWebsiteCounter = function() {
  let countId = 0;
  function increase() {
    return countId++;
  }

  return {
    counter: increase,
  };
};

let IReporterWebsiteUniqueId = function() {
  let countId = 1;
  function generateId() {
    return countId++;
  }

  return {
    generateId: generateId,
  };
};

let appcounter = new IReporterWebsiteCounter();
let UniqueId = new IReporterWebsiteUniqueId();

export default appcounter;
