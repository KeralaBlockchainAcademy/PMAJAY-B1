'use strict';
const { WorkloadModuleBase } = require('@hyperledger/caliper-core');


class MyWorkload extends WorkloadModuleBase {
  constructor() {
      super();
  }


  async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
       await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
       for (let i=0; i<this.roundArguments.assets; i++) {
           const carId = `${this.workerIndex}_${i}`;
           console.log(`Worker ${this.workerIndex}: Creating car ${carId}`);
           const request = {
               contractId: this.roundArguments.contractId,
               contractFunction: 'createCar',
               invokerIdentity: 'User1',
               contractArguments: [carId,'SUV','XUV 700','Blue','03/05/23','Mahindra'],
               readOnly: false
           };


         await this.sutAdapter.sendRequests(request);
       }
   }


   async submitTransaction() {
       const randomId = `${this.workerIndex}_${Math.floor(Math.random()*this.roundArguments.assets)}`;
       const myArgs = {
           contractId: this.roundArguments.contractId,
           contractFunction: 'readCar',
           invokerIdentity: 'User1',
           contractArguments:  [randomId],
           readOnly: true
       };


       await this.sutAdapter.sendRequests(myArgs);
   }


   async cleanupWorkloadModule() {
       for (let i=0; i<this.roundArguments.assets; i++) {
           const carId = `${this.workerIndex}_${i}`;
           console.log(`Worker ${this.workerIndex}: Deleting car ${carId}`);
           const request = {
               contractId: this.roundArguments.contractId,
               contractFunction: 'deleteCar',
               invokerIdentity: 'User1',
               contractArguments: [carId],
               readOnly: false
           };
            await this.sutAdapter.sendRequests(request);
       }
   }
}


function createWorkloadModule() {
   return new MyWorkload();
}
 module.exports.createWorkloadModule = createWorkloadModule;