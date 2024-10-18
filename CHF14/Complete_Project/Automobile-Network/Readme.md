##### ***Open a command terminal with in Automobile-network folder, let's call this terminal as host terminal

```
cd Automobile-network/

```

##  **************** host terminal ********************

### ------------Register the ca admin for each organization—----------------

##### ***Build the docker-compose-ca.yaml in the docker folder

```
docker compose -f docker/docker-compose-ca.yaml up -d

```

```
sudo chmod -R 777 organizations/
```
### ------------Register and enroll the users for each organization—-----------

##### ***Build the registerEnroll.sh script file


```
chmod +x registerEnroll.sh

./registerEnroll.sh
```


### —-------------Build the infrastructure—-----------------

##### ***Build the docker-compose-3org.yaml in the docker folder

```
docker compose -f docker/docker-compose-3org.yaml up -d
```


### -------------Generate the genesis block—-------------------------------

##### ***Build the configtx.yaml file in the config folder

```
export FABRIC_CFG_PATH=./config

export CHANNEL_NAME=autochannel
```

```
configtxgen -profile ThreeOrgsChannel -outputBlock ./channel-artifacts/${CHANNEL_NAME}.block -channelID $CHANNEL_NAME
```


### ------ Create the application channel------

```
export ORDERER_CA=./organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/msp/tlscacerts/tlsca.auto.com-cert.pem

export ORDERER_ADMIN_TLS_SIGN_CERT=./organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/tls/server.crt

export ORDERER_ADMIN_TLS_PRIVATE_KEY=./organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/tls/server.key
```

```
osnadmin channel join --channelID $CHANNEL_NAME --config-block ./channel-artifacts/$CHANNEL_NAME.block -o localhost:7053 --ca-file $ORDERER_CA --client-cert $ORDERER_ADMIN_TLS_SIGN_CERT --client-key $ORDERER_ADMIN_TLS_PRIVATE_KEY
```


```
osnadmin channel list -o localhost:7053 --ca-file $ORDERER_CA --client-cert $ORDERER_ADMIN_TLS_SIGN_CERT --client-key $ORDERER_ADMIN_TLS_PRIVATE_KEY
```

##### ***Open another terminal with in Automobile-network folder, let's call this terminal as peer0_Manufacturer terminal.

##  **************** peer0_Manufacturer terminal ********************

##### ***Build the core.yaml in peercfg folder

```
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=autochannel
export CORE_PEER_LOCALMSPID=manufacturer-auto-com
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/users/Admin@manufacturer.auto.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/msp/tlscacerts/tlsca.auto.com-cert.pem
export MANUFACTURER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export DEALER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/dealer.auto.com/peers/peer0.dealer.auto.com/tls/ca.crt
export MVD_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/mvd.auto.com/peers/peer0.mvd.auto.com/tls/ca.crt
```


### —---------------Join peer to the channel—-------------

```
peer channel join -b ./channel-artifacts/$CHANNEL_NAME.block

peer channel list
```


##### ***Open another terminal with in Automobile-network folder, let's call this terminal as peer0_Dealer terminal.

##  **************** peer0_Dealer terminal *****************

```
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=autochannel 
export CORE_PEER_LOCALMSPID=dealer-auto-com 
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ADDRESS=localhost:9051 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/dealer.auto.com/peers/peer0.dealer.auto.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/dealer.auto.com/users/Admin@dealer.auto.com/msp
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/msp/tlscacerts/tlsca.auto.com-cert.pem
export MANUFACTURER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export DEALER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/dealer.auto.com/peers/peer0.dealer.auto.com/tls/ca.crt
export MVD_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/mvd.auto.com/peers/peer0.mvd.auto.com/tls/ca.crt
```


### —------------ Join peer to the channel ---------------

```
peer channel join -b ./channel-artifacts/$CHANNEL_NAME.block

peer channel list
```

##### ***Open another terminal with in Automobile-network folder, let's call this terminal as peer0_Mvd terminal.

##  **************** peer0_Mvd terminal ******************

```
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=autochannel 
export CORE_PEER_LOCALMSPID=mvd-auto-com 
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ADDRESS=localhost:11051 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/mvd.auto.com/peers/peer0.mvd.auto.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/mvd.auto.com/users/Admin@mvd.auto.com/msp
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/msp/tlscacerts/tlsca.auto.com-cert.pem
export MANUFACTURER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export DEALER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/dealer.auto.com/peers/peer0.dealer.auto.com/tls/ca.crt
export MVD_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/mvd.auto.com/peers/peer0.mvd.auto.com/tls/ca.crt
```

### —-------------- Join peer to the channel ----------------------

```
peer channel join -b ./channel-artifacts/$CHANNEL_NAME.block

peer channel list
```

### —-------------------- anchor peer update —---------------------

##  **************** peer0_Manufacturer terminal ******************

```
peer channel fetch config channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
```

```
cd channel-artifacts
```
```
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json
```

```
cp config.json config_copy.json
```

```
jq '.channel_group.groups.Application.groups."manufacturer-auto-com".values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.manufacturer.auto.com","port": 7051}]},"version": "0"}}' config_copy.json > modified_config.json
```

```
configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id ${CHANNEL_NAME} --original config.pb --updated modified_config.pb --output config_update.pb
```

```
configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb
```

```
cd ..
```

```
peer channel update -f channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA
```
##  **************** peer0_Dealer terminal ******************

```
peer channel fetch config channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
```

```
cd channel-artifacts
```
```
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json
cp config.json config_copy.json
```
```
jq '.channel_group.groups.Application.groups."dealer-auto-com".values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.dealer.auto.com","port": 9051}]},"version": "0"}}' config_copy.json > modified_config.json
```

```
configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id $CHANNEL_NAME --original config.pb --updated modified_config.pb --output config_update.pb
```

```
configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb
```

```
cd ..
```

```
peer channel update -f channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA
```
##  **************** peer0_Mvd terminal ******************

```
peer channel fetch config channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
```

```
cd channel-artifacts
```
```
configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json
cp config.json config_copy.json
```

```
jq '.channel_group.groups.Application.groups."mvd-auto-com".values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.mvd.auto.com","port": 11051}]},"version": "0"}}' config_copy.json > modified_config.json
```

```
configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id $CHANNEL_NAME --original config.pb --updated modified_config.pb --output config_update.pb
```

```
configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb
```

```
cd ..
```

```
peer channel update -f channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA
```
```
peer channel getinfo -c $CHANNEL_NAME
```


### —-----------------Chaincode lifecycle—-------------------

##  **************** peer0_Manufacturer terminal ******************

```
peer lifecycle chaincode package kbaauto.tar.gz --path ../Chaincode/KBA-Automobile/ --lang node --label kbaauto_1.0

```

```
peer lifecycle chaincode install kbaauto.tar.gz
```

```
peer lifecycle chaincode queryinstalled

```

```
export CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid kbaauto.tar.gz)

```

##  **************** peer0_Dealer terminal ******************
```
peer lifecycle chaincode install kbaauto.tar.gz
```

```
export CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid kbaauto.tar.gz)

```

##  **************** peer0_Mvd terminal ******************
```
peer lifecycle chaincode install kbaauto.tar.gz
```

```
export CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid kbaauto.tar.gz)

```

##  **************** peer0_Manufacturer terminal ******************

```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --collections-config ../Chaincode/KBA-Automobile/collections.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
```

##  **************** peer0_Dealer terminal ******************

```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --collections-config ../Chaincode/KBA-Automobile/collections.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
```

##  **************** peer0_Mvd terminal ******************
```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --collections-config ../Chaincode/KBA-Automobile/collections.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
```

##  **************** peer0_Manufacturer terminal ******************

```
peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --sequence 1 --collections-config ../Chaincode/KBA-Automobile/collections.json --tls --cafile $ORDERER_CA --output json
```

```
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --channelID $CHANNEL_NAME --name KBA-Automobile --version 1.0 --sequence 1 --collections-config ../Chaincode/KBA-Automobile/collections.json --tls --cafile $ORDERER_CA --peerAddresses localhost:7051 --tlsRootCertFiles $MANUFACTURER_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $DEALER_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT
```
```
peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name KBA-Automobile --cafile $ORDERER_CA
```
```
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n KBA-Automobile --peerAddresses localhost:7051 --tlsRootCertFiles $MANUFACTURER_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $DEALER_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT -c '{"function":"createCar","Args":["Car-11", "Tata", "Nexon", "White", "Factory-1", "22/07/2023"]}'
```

```
peer chaincode query -C $CHANNEL_NAME -n KBA-Automobile -c '{"Args":["queryAllCars"]}'

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
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n KBA-Automobile --peerAddresses localhost:7051 --tlsRootCertFiles $MANUFACTURER_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $DEALER_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT -c '{"Args":["OrderContract:createOrder","ORD201"]}' --transient "{\"make\":\"$MAKE\",\"model\":\"$MODEL\",\"color\":\"$COLOR\",\"dealerName\":\"$DEALER_NAME\"}"
```
```
peer chaincode query -C $CHANNEL_NAME -n KBA-Automobile -c '{"Args":["OrderContract:readOrder","ORD201"]}'
```


### --------- Stop the Automobile-network --------------

##  **************** Host terminal ******************

```
docker compose -f docker/docker-compose-3org.yaml down
```
```
docker compose -f docker/docker-compose-ca.yaml down
```
```
docker rm -f $(docker ps -a | awk '($2 ~ /dev-peer.*/) {print $1}')
```
```
docker volume rm $(docker volume ls -q)
```
```
sudo rm -rf organizations/
```
```
sudo rm -rf channel-artifacts/
```
```
sudo rm kbaauto.tar.gz
```
```
docker ps -a
```

##### ***if there still exists the containers then execute the following commands.

```
docker rm $(docker container ls -q) --force
```
```
docker container prune
```
```
docker system prune
```
```
docker volume prune
```
```
docker network prune
```


### Run using startAutomobileNetwork.sh script

##### ***Build startAutomobileNetwork.sh script file

```
chmod +x startAutomobileNetwork.sh
```

```
./startAutomobileNetwork.sh
```


##### ***To submit transaction as manufacturer-auto-com
```
export CHANNEL_NAME=autochannel
export FABRIC_CFG_PATH=./peercfg
export CORE_PEER_LOCALMSPID=manufacturer-auto-com
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/users/Admin@manufacturer.auto.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/auto.com/orderers/orderer.auto.com/msp/tlscacerts/tlsca.auto.com-cert.pem
export MANUFACTURER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/manufacturer.auto.com/peers/peer0.manufacturer.auto.com/tls/ca.crt
export DEALER_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/dealer.auto.com/peers/peer0.dealer.auto.com/tls/ca.crt
export MVD_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/mvd.auto.com/peers/peer0.mvd.auto.com/tls/ca.crt
```

```
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n KBA-Automobile --peerAddresses localhost:7051 --tlsRootCertFiles $MANUFACTURER_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $DEALER_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT -c '{"function":"createCar","Args":["Car-101", "Tata", "Nexon", "White", "Factory-1", "22/07/2023"]}'
```

```
peer chaincode query -C $CHANNEL_NAME -n KBA-Automobile -c '{"Args":["queryAllCars"]}'
```

### To stop the network using script file

##### ***Build stopAutomobileNetwork.sh script file
```
chmod +x stopAutomobileNetwork.sh
```
```
./stopAutomobileNetwork.sh
```

### To stop the network without clearing the data using docker

```
docker compose -f ./docker/docker-compose-ca.yaml -f ./docker/docker-compose-3org.yaml stop
```
### To start the network with existing docker containers
```
docker compose -f ./docker/docker-compose-ca.yaml -f ./docker/docker-compose-3org.yaml start
```