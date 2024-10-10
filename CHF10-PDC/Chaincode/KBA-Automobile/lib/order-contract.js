/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

async function getCollectionName(ctx) {
    const collectionName = 'OrderCollection';
    return collectionName;
}

class OrderContract extends Contract {

    async orderExists(ctx, orderId) {
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateDataHash(collectionName, orderId);
        return (!!data && data.length > 0);
    }

    async createOrder(ctx, orderId) {
        const mspid = ctx.clientIdentity.getMSPID();
        if (mspid === 'DealerMSP') {

            const exists = await this.orderExists(ctx, orderId);
            if (exists) {
                throw new Error(`The asset order ${orderId} already exists`);
            }

            const OrderAsset = {};

            const transientData = ctx.stub.getTransient();

            if (transientData.size === 0 || !transientData.has('make')
                || !transientData.has('model') || !transientData.has('color')
                || !transientData.has('dealerName')
            ) {
                throw new Error('The expected key was not specified in transient data. Please try again.');
            }

            OrderAsset.make = transientData.get('make').toString();
            OrderAsset.model = transientData.get('model').toString();
            OrderAsset.color = transientData.get('color').toString();
            OrderAsset.dealerName = transientData.get('dealerName').toString();
            OrderAsset.assetType = 'order';


            const collectionName = await getCollectionName(ctx);
            await ctx.stub.putPrivateData(collectionName, orderId, Buffer.from(JSON.stringify(OrderAsset)));
        } else {
            return (`Organisation with mspid ${mspid} cannot perform this action.`)
        }

    }

    async readOrder(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The asset order ${orderId} does not exist`);
        }

        let privateDataString;
        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, orderId);
        privateDataString = JSON.parse(privateData.toString());
        return privateDataString;
    }


    async deleteOrder(ctx, orderId) {
        const mspid = ctx.clientIdentity.getMSPID();
        if (mspid === 'DealerMSP') {
            const exists = await this.orderExists(ctx, orderId);
            if (!exists) {
                throw new Error(`The asset order ${orderId} does not exist`);
            }
            const collectionName = await getCollectionName(ctx);
            await ctx.stub.deletePrivateData(collectionName, orderId);
        } else {
            return (`Organisation with mspid ${mspid} cannot perform this action.`)
        }
    }
}

module.exports = OrderContract;
