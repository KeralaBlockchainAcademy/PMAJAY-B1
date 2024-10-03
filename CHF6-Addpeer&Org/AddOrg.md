## Host terminal

### Create docker-compose file for new org and run it
```
docker compose -f docker/docker-compose-ca-org3.yaml up -d
```
### Register and enroll the users for org3
```
sudo chmod -R 777 organizations/fabric-ca/org3
```
### Create the registerEnrollOrg3.sh file and add the commands
```
chmod +x registerEnrollOrg3.sh
```
```
./registerEnrollOrg3.sh
```
### Org3 organization definition
```
mkdir configOrg3
```
Within the configOrg3 folder create the configtx.yaml and add the configuration of Org3
```
export FABRIC_CFG_PATH=$PWD/configOrg3
```
```
configtxgen -printOrg Org3MSP > organizations/peerOrganizations/org3.example.com/org3.json
```
### Bring up Org3 components

Create docker-compose-org3.yaml file within docker folder
```
docker compose -f docker/docker-compose-org3.yaml up -d
```


## Peer0 Org1 Terminal

```
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=mychannel
export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```
### Fetch the latest config block
```
peer channel fetch config channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
```
## Convert the Configuration to JSON and Trim It Down
```
cd channel-artifacts
```
```
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
```
```
jq ".data.data[0].payload.data.config" config_block.json > config.json
```
```
jq -s '.[0] * {"channel_group":{"groups":{"Application":{"groups": {"Org3MSP":.[1]}}}}}' config.json ../organizations/peerOrganizations/org3.example.com/org3.json > modified_config.json
```
```
configtxlator proto_encode --input config.json --type common.Config --output config.pb
```
```
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
```
```
configtxlator compute_update --channel_id $CHANNEL_NAME --original config.pb --updated modified_config.pb --output org3_update.pb
```
```
configtxlator proto_decode --input org3_update.pb --type common.ConfigUpdate --output org3_update.json
```
```
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat org3_update.json)'}}}' | jq . > org3_update_in_envelope.json
```
```
configtxlator proto_encode --input org3_update_in_envelope.json --type common.Envelope --output org3_update_in_envelope.pb
```
## Sign and Submit the Config Update
```
cd ..
```
```
peer channel signconfigtx -f channel-artifacts/org3_update_in_envelope.pb
```
### Peer0 Org2 Terminal
```
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=mychannel 
export CORE_PEER_LOCALMSPID=Org2MSP 
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ADDRESS=localhost:9051 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```
```
peer channel update -f channel-artifacts/org3_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA
```
### Join Org3 to the Channel

Open another terminal with in Fabric-network folder, let's call this terminal as peer0_Org3 terminal.

## Peer0 Org3 Terminal
```
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=mychannel
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID=Org3MSP
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
export CORE_PEER_ADDRESS=localhost:11051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
```
```
peer channel fetch 0 channel-artifacts/$CHANNEL_NAME.block -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
```
```
peer channel join -b channel-artifacts/$CHANNEL_NAME.block
```
```
peer channel list
```
### Anchor peer update
```
peer channel fetch config channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
```
```
cd channel-artifacts
```
```
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
```
```
jq ".data.data[0].payload.data.config" config_block.json > config.json
```
```
jq '.channel_group.groups.Application.groups.Org3MSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.org3.example.com","port": 11051}]},"version": "0"}}' config.json > modified_anchor_config.json
```
```
configtxlator proto_encode --input config.json --type common.Config --output config.pb
```
```
configtxlator proto_encode --input modified_anchor_config.json --type common.Config --output modified_anchor_config.pb
```
```
configtxlator compute_update --channel_id $CHANNEL_NAME --original config.pb --updated modified_anchor_config.pb --output anchor_update.pb
```
```
configtxlator proto_decode --input anchor_update.pb --type common.ConfigUpdate --output anchor_update.json
```
```
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat anchor_update.json)'}}}' | jq . > anchor_update_in_envelope.json
```
```
configtxlator proto_encode --input anchor_update_in_envelope.json --type common.Envelope --output anchor_update_in_envelope.pb
```
```
cd ..
```
````
peer channel update -f channel-artifacts/anchor_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA
````
### Install, approve and invoke chaincode
```
peer lifecycle chaincode install basic.tar.gz
```
```
peer lifecycle chaincode queryinstalled
```
Execute the following command with the correct Package ID
```
export CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid basic.tar.gz)
```
```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --waitForEvent
```
```
peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name basic --cafile $ORDERER_CA
```
### Query
```
peer chaincode query -C $CHANNEL_NAME -n basic -c '{"function":"ReadAsset", "Args":["Asset-5"]}'
```
## To stop the network for peer1org1 & org3 
```
docker compose -f docker/docker-compose-peer1org1.yaml down

docker compose -f docker/docker-compose-ca-org3.yaml down

docker compose -f docker/docker-compose-org3.yaml down
```

## To stop two organization network
```
./stopNetwork.sh

```
