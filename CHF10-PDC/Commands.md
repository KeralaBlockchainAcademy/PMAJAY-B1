
## Add  --collections-config flag in approve & commit commands in startAutomobileNetwork1.sh file

********** Approve chaincode in Manufacturer peer **********
```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --collections-config ../Chaincode/KBA-Automobile/collection-automobile.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
```
********** Approve chaincode in Dealer peer **********
```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --collections-config ../Chaincode/KBA-Automobile/collection-automobile.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
```

********** Approve chaincode in MVD peer **********


```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --collections-config ../Chaincode/KBA-Automobile/collection-automobile.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
```

*********** Commit chaincode in Mvd peer *******
```
peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --sequence 1 --collections-config ../Chaincode/KBA-Automobile/collection-automobile.json --tls --cafile $ORDERER_CA --output json
```
```
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --sequence 1 --collections-config ../Chaincode/KBA-Automobile/collection-automobile.json --tls --cafile $ORDERER_CA --peerAddresses localhost:7051 --tlsRootCertFiles $MANUFACTURER_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $DEALER_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT
```

##### ***Open another terminal with in Automobile-network folder, let's call this terminal as peer0_Manufacturer terminal.

##  **************** peer0_Manufacturer terminal ********************

```
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
##### ***Open another terminal with in Automobile-network folder, let's call this terminal as peer0_Dealer terminal.

##  **************** peer0_Dealer terminal *****************

```
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

##### ***Open another terminal with in Automobile-network folder, let's call this terminal as peer0_Mvd terminal.

##  **************** peer0_Mvd terminal ******************

```
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

```
export MAKE=$(echo -n "Tata" | base64 | tr -d \\n)

export MODEL=$(echo -n "Tiago" | base64 | tr -d \\n)

export COLOR=$(echo -n "White" | base64 | tr -d \\n)

export DEALER_NAME=$(echo -n "XXX" | base64 | tr -d \\n)
```

```
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n KBA-Automobile --peerAddresses localhost:7051 --tlsRootCertFiles $MANUFACTURER_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $DEALER_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT -c '{"Args":["OrderContract:CreateOrder","ORD01"]}' --transient "{\"make\":\"$MAKE\",\"model\":\"$MODEL\",\"color\":\"$COLOR\",\"dealerName\":\"$DEALER_NAME\"}"
```
```
peer chaincode query -C $CHANNEL_NAME -n KBA-Automobile -c '{"Args":["OrderContract:ReadOrder","ORD01"]}'
```

### --------- Stop the Automobile-network --------------


```
./stopAutomobileNetwork.sh 

```