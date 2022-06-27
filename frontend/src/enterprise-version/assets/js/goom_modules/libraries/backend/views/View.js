'use strict';
import ViewBuildTools from './builders/Preview';

class AdminView extends ViewBuildTools {
  constructor() {
    super();
  }

  static Index(dataPromise) {
    let form = document.querySelector('form#add-intervention');
    let InterventionDisplayGround = document.querySelector('tbody#tbody');
    let RedflagDisplayGround = document.querySelector('tbody#tbodyRed');
    let button = document.querySelector('button.destroy');

    dataPromise
      .then(datas => {
        console.log(datas);
        const tablebody = document.getElementById('tablebody');

        const redFlag = datas[1].data[0].redFlag;
        const redFlagDraft = redFlag.filter(i => i.status === 'draft').length;
        const redFlagUnderInvestigation = redFlag.filter(i => i.status === 'under investigation')
          .length;
        const redFlagResolved = redFlag.filter(i => i.status === 'resolved').length;
        const redFlagRejected = redFlag.filter(i => i.status === 'rejected').length;

        const intervention = datas[0].data[0].intervention;
        const interventionDraft = intervention.filter(i => i.status === 'draft').length;
        const interventionUnderInvestigation = intervention.filter(
          i => i.status === 'under investigation',
        ).length;
        const interventionResolved = intervention.filter(i => i.status === 'resolved').length;
        const interventionRejected = intervention.filter(i => i.status === 'rejected').length;

        const allRecords = redFlag.concat(intervention);

        const totalRecords = allRecords.length;
        console.log(totalRecords);
        document.getElementById('red-flag-draft').innerHTML = redFlagDraft;
        document.getElementById(
          'red-flag-under-investigation',
        ).innerHTML = redFlagUnderInvestigation;
        document.getElementById('red-flag-resolved').innerHTML = redFlagResolved;
        document.getElementById('red-flag-rejected').innerHTML = redFlagRejected;

        document.getElementById('intervention-draft').innerHTML = interventionDraft;
        document.getElementById(
          'intervention-under-investigation',
        ).innerHTML = interventionUnderInvestigation;
        document.getElementById('intervention-resolved').innerHTML = interventionResolved;
        document.getElementById('intervention-rejected').innerHTML = interventionRejected;

        AdminView.viewRecord(intervention, InterventionDisplayGround);

        AdminView.viewRecord(redFlag, RedflagDisplayGround);
      })
      .catch(error => {
        throw error;
      });
  }

  static Create() {}

  static Edit(id) {}

  static Show(id) {}

  static Delete() {}
}

export default AdminView;
