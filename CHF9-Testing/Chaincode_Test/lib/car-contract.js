/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class CarContract extends Contract {

    async carExists(ctx, carId) {
        const buffer = await ctx.stub.getState(carId);
        return (!!buffer && buffer.length > 0);
    }

    async createCar(ctx, carId, make, model, color, dateOfManufacture, manufactureName) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'manufacturer-auto-com') {
            const exists = await this.carExists(ctx, carId);
            if (exists) {
                throw new Error(`The car ${carId} already exists`);
            }
            const asset = {
                make,
                model,
                color,
                dateOfManufacture,
                status: 'In Factory',
                ownedBy: manufactureName,
                assetType: 'car'
            };
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(carId, buffer);
        }
        else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }

    }

    async readCar(ctx, carId) {
        const exists = await this.carExists(ctx, carId);
        if (!exists) {
            throw new Error(`The car ${carId} does not exist`);
        }
        const buffer = await ctx.stub.getState(carId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }


    async deleteCar(ctx, carId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'manufacturer-auto-com') {
            const exists = await this.carExists(ctx, carId);
            if (!exists) {
                throw new Error(`The car ${carId} does not exist`);
            }
            await ctx.stub.deleteState(carId);
        }
        else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }

    }


}

module.exports = CarContract;
