

******** Commands for Rich Query in PDC *********

```
peer chaincode query -C $CHANNEL_NAME -n KBA-Automobile -c '{"Args":["OrderContract:queryAllOrders"]}'
```
```
peer chaincode query -C $CHANNEL_NAME -n KBA-Automobile -c '{"Args":["OrderContract:getOrdersByRange","ORD01",""]}'
```
