#### update the car-contract.js with the following code

```bash
    async getCarHistory(ctx, carId) {
        let resultIterator = await ctx.stub.getHistoryForKey(carId)
        let result = await this._getAllResults(resultIterator, true);
        return JSON.stringify(result)
    }

    async _getAllResults(iterator, isHistory) {
        let allResult = [];

        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.txId
                    jsonRes.Timestamp = res.value.timestamp
                    jsonRes.Record = JSON.parse(res.value.value.toString())
                }
                else {
                    jsonRes.Key = res.value.key;
                    jsonRes.Record = JSON.parse(res.value.value.toString());
                }
                allResult.push(jsonRes)
            }
            res = await iterator.next()
        }
        await iterator.close()
        return allResult
    }

    async getCarsWithPagination(ctx, pageSize, bookMark) {
        const queryString = {
            selector: {
                assetType: 'car'
            }
        }
        const pageSizeInt = parseInt(pageSize, 10)
        const { iterator, metadata } = await ctx.stub.getQueryResultWithPagination(JSON.stringify(queryString), pageSizeInt, bookMark)
        let result = await this._getAllResults(iterator, false)
        let results = {};
        results.Result = result
        results.ResponseMetaData = {
            RecordCount: metadata.fetchedRecordsCount,
            Bookmark: metadata.bookmark
        }
        return JSON.stringify(results)
    }

    async checkMatchingOrders(ctx, carId) {
        const exists = await this.carExists(ctx, carId);
        if (!exists) {
            throw new Error(`The car ${carId} does not exist`);
        }

        const carBuffer = await ctx.stub.getState(carId);
        const carDetails = JSON.parse(carBuffer.toString());

        const queryString = {
            selector: {
                assetType: 'order',
                make: carDetails.make,
                model: carDetails.model,
                color: carDetails.color,
            },
        };

        const orderContract = new OrderContract();
        const orders = await orderContract._queryAllOrdersWithQueryString(
            ctx,
            queryString
        );

        return orders;
    }

    async matchOrder(ctx, carId, orderId) {
        const orderContract = new OrderContract();

        const carexists = await this.carExists(ctx, carId);
        if (!carexists) {
            throw new Error(`The car ${carId} does not exist`);
        }
        const orderexists = await orderContract.orderExists(ctx, orderId);
        if (!orderexists) {
            throw new Error(`The order ${orderId} does not exist`);
        }
        const carDetails = await this.readCar(ctx, carId);
        const orderDetails = await orderContract.readOrder(ctx, orderId);

        if (
            orderDetails.make === carDetails.make &&
            orderDetails.model === carDetails.model &&
            orderDetails.color === carDetails.color
        ) {
            carDetails.ownedBy = orderDetails.dealerName;
            carDetails.status = 'Assigned to a Dealer';

            const newCarBuffer = Buffer.from(JSON.stringify(carDetails));
            await ctx.stub.putState(carId, newCarBuffer);

            await orderContract.deleteOrder(ctx, orderId);
            return `Car ${carId} is assigned to ${orderDetails.dealerName}`;
        } else {
            return 'Order is not matching';
        }
    }
    
    async registerCar(ctx, carId, ownerName, registrationNumber) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'MvdMSP') {
            const exists = await this.carExists(ctx, carId);
            if (!exists) {
                throw new Error(`The car ${carId} does not exist`);
            }

            const carBuffer = await ctx.stub.getState(carId);
            const carDetails = JSON.parse(carBuffer.toString());

            carDetails.status = `Registered to ${ownerName} wih plate number ${registrationNumber}`;
            carDetails.ownedBy = ownerName;

            const newCarBuffer = Buffer.from(JSON.stringify(carDetails));
            await ctx.stub.putState(carId, newCarBuffer);

            return `Car ${carId} is successfully registered to ${ownerName}`;
        } else {
            return `User under following MSP:${mspID} cannot able to perform this action`;
        }
    }
```


#### deploy chaincode


#### set terminals for each organisations

##  **************** peer0_Manufacturer terminal ********************

```bash
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=autochannel
export CORE_PEER_LOCALMSPID=ManufacturerMSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/users/Admin@manufacturer.auto.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/msp/tlscacerts/tlsca.auto.com-cert.pem
export MANUFACTURER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export DEALER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/dealer.auto.com/peers/peer0.dealer.auto.com/tls/ca.crt
export MVD_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/mvd.auto.com/peers/peer0.mvd.auto.com/tls/ca.crt
```


##  **************** peer0_Dealer terminal *****************

```bash
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=autochannel 
export CORE_PEER_LOCALMSPID=DealerMSP 
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ADDRESS=localhost:9051 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/dealer.auto.com/peers/peer0.dealer.auto.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/dealer.auto.com/users/Admin@dealer.auto.com/msp
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/msp/tlscacerts/tlsca.auto.com-cert.pem
export MANUFACTURER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export DEALER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/dealer.auto.com/peers/peer0.dealer.auto.com/tls/ca.crt
export MVD_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/mvd.auto.com/peers/peer0.mvd.auto.com/tls/ca.crt
```


##  **************** peer0_Mvd terminal ******************

```bash
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=autochannel 
export CORE_PEER_LOCALMSPID=MvdMSP 
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ADDRESS=localhost:11051 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/mvd.auto.com/peers/peer0.mvd.auto.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/mvd.auto.com/users/Admin@mvd.auto.com/msp
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/msp/tlscacerts/tlsca.auto.com-cert.pem
export MANUFACTURER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export DEALER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/dealer.auto.com/peers/peer0.dealer.auto.com/tls/ca.crt
export MVD_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/mvd.auto.com/peers/peer0.mvd.auto.com/tls/ca.crt
```

### --------Invoke Private Transaction----------

##  **************** peer0_Dealer terminal ******************

```bash
export MAKE=$(echo -n "Tata" | base64 | tr -d \\n)
export MODEL=$(echo -n "Tiago" | base64 | tr -d \\n)
export COLOR=$(echo -n "White" | base64 | tr -d \\n)
export DEALER_NAME=$(echo -n "Lexon" | base64 | tr -d \\n)
```

```bash
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n KBA-Automobile --peerAddresses localhost:7051 --tlsRootCertFiles $MANUFACTURER_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $DEALER_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT -c '{"Args":["OrderContract:CreateOrder","ORD01"]}' --transient "{\"make\":\"$MAKE\",\"model\":\"$MODEL\",\"color\":\"$COLOR\",\"dealerName\":\"$DEALER_NAME\"}"
```

```bash
peer chaincode query -C $CHANNEL_NAME -n KBA-Automobile -c '{"Args":["OrderContract:ReadOrder","ORD01"]}'
```


##  **************** peer0_Manufacturer terminal ******************

```bash
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n KBA-Automobile --peerAddresses localhost:7051 --tlsRootCertFiles $MANUFACTURER_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $DEALER_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT -c '{"function":"createCar","Args":["Car-01", "Tata", "Nexon", "White", "15/10/2024", "factory-01"]}'
```

```bash
peer chaincode query -C $CHANNEL_NAME -n KBA-Automobile -c '{"function":"readCar","Args":["Car-01"]}'
```