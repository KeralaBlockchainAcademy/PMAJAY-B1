

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'

peer chaincode query -C mychannel -n basic -c '{"function":"ReadAsset","Args":["asset5"]}'

## update chaincode

# In org 1 terminal
# Set Environment Variable
```
export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=mychannel
export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem 
export ORG1_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export ORG2_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
```
# Package Chaincode
```
 peer lifecycle chaincode package basic_2.tar.gz --path ${PWD}/../chaincode-javascript --lang node --label basic_2.0
```
# Install Chaincode
```
 peer lifecycle chaincode install basic_2.tar.gz
```
```
peer lifecycle chaincode queryinstalled
```
```
export NEW_CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid basic_2.tar.gz)
```
```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID $CHANNEL_NAME --name basic_2 --version 1.1 --package-id $NEW_CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
```

# In Org 2 terminal
# Set Enviornment Variables
```
export CHANNEL_NAME=mychannel
export FABRIC_CFG_PATH=./peercfg
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem 
export ORG1_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export ORG2_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=Org2MSP 
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ADDRESS=localhost:9051 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
```
# Install Chaincode
```
peer lifecycle chaincode install basic_2.tar.gz
```
```
peer lifecycle chaincode queryinstalled
```
```
export NEW_CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid basic_2.tar.gz)
```
```
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID $CHANNEL_NAME --name basic_2 --version 1.1 --package-id $NEW_CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
```
```
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID $CHANNEL_NAME --name basic_2 --version 1.1 --sequence 1 --tls --cafile $ORDERER_CA --peerAddresses localhost:7051 --tlsRootCertFiles $ORG1_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $ORG2_PEER_TLSROOTCERT
```
```
peer lifecycle chaincode querycommitted --channelID ${CHANNEL_NAME} --name basic_2
```
# Invoke 
```

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n basic_2 --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"Initledger","Args":[]}'
```
# Query
```
peer chaincode query -C mychannel -n basic_2 -c '{"function":"ReadAsset","Args":["asset5"]}'
```
