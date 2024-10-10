/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { CarContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('CarContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new CarContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"make":"Tata","model":"Tiago","color":"Red","dateOfManufacture":"10-10-2022","status":"In Factory","ownedBy":"Factory-01","assetType":"car"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"make":"Tata","model":"Tiago","color":"Red","dateOfManufacture":"10-10-2022","status":"In Factory","ownedBy":"Factory-01","assetType":"car"}'));

        ctx.clientIdentity =
        {
            getMSPID: function () {
                return 'manufacturer-auto-com';
            },
        };
    });
    describe('#carExists', () => {

        it('should return true for a car', async () => {
            await contract.carExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a car that does not exist', async () => {
            await contract.carExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createCar', () => {

        it('should create a car', async () => {
            await contract.createCar(
                ctx,
                '1003',
                'Tata',
                'Tiago',
                'Red',
                '10-10-2022',
                'Factory-01'
            );
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"make":"Tata","model":"Tiago","color":"Red","dateOfManufacture":"10-10-2022","status":"In Factory","ownedBy":"Factory-01","assetType":"car"}'));
        });

        it('should throw an error for a car that already exists', async () => {
            await contract.createCar(
                ctx,
                '1001',
                'Tata',
                'Tiago',
                'Red',
                '10-10-2022',
                'Factory-01'
            )
                .should.be.rejectedWith(/The car 1001 already exists/);
        });

    });

    describe('#readCar', () => {

        it('should return a car', async () => {
            await contract.readCar(ctx, '1001').should.eventually.deep.equal({
                make: 'Tata',
                model: 'Tiago',
                color: 'Red',
                dateOfManufacture: '10-10-2022',
                status: 'In Factory',
                ownedBy: 'Factory-01',
                assetType: 'car'
            });
        });

        it('should throw an error for a car that does not exist', async () => {
            await contract.readCar(ctx, '1003').should.be.rejectedWith(/The car 1003 does not exist/);
        });

    });

    describe('#deleteCar', () => {

        it('should delete a car', async () => {
            await contract.deleteCar(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a car that does not exist', async () => {
            await contract.deleteCar(ctx, '1003').should.be.rejectedWith(/The car 1003 does not exist/);
        });

    });

});

