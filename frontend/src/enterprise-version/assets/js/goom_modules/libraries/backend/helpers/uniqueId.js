'use strict';
let IReporterWebsiteUniqueId = function() {
  let countId = 1;
  function generateId() {
    return countId++;
  }

  return {
    generateId: generateId,
  };
};

let uniqueId = new IReporterWebsiteUniqueId();

export default uniqueId;
