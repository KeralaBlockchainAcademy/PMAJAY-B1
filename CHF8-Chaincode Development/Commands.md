***Build startAutomobileNetwork.sh script file

```
chmod +x startAutomobileNetwork.sh
```
```
./startAutomobileNetwork.sh
```

***To submit transaction as ManufacturerMSP

```
export CHANNEL_NAME=autochannel
export FABRIC_CFG_PATH=./peercfg
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

```
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.auto.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n KBA-Automobile --peerAddresses localhost:7051 --tlsRootCertFiles $MANUFACTURER_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $DEALER_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT -c '{"function":"createCar","Args":["Car-01", "Tata", "Nexon", "White"]}'
```

```
peer chaincode query -C $CHANNEL_NAME -n KBA-Automobile -c '{"function":"readCar","Args":["Car-01"]}'
```

***Build stopAutomobileNetwork.sh script file

```
chmod +x stopAutomobileNetwork.sh
```
```
./stopAutomobileNetwork.sh
```

