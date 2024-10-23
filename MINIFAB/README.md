
# Start the minifab network
#### open new terminal at minifab network directory and execute
```
./startNetwork.sh
```

# Deploy the chaincode to the minifab network

```
sudo chmod -R 777 vars/
```

```
mkdir -p vars/chaincode/KBA-Automobile/node
```

```
cp -r ../Chaincode/KBA-Automobile/* vars/chaincode/KBA-Automobile/node/
```

```
cp vars/chaincode/KBA-Automobile/node/collections.json ./vars/KBA-Automobile_collection_config.json
```

```
minifab ccup -n KBA-Automobile -l node -v 3.0 -d false -r true
```

# Invoke chaincode functions
```
minifab invoke -n KBA-Automobile -p '"createCar","car03","BMW","M3","Red", "09/09/2024", "Fact-01"'
```

```
minifab query -n KBA-Automobile -p '"readCar","car03"'
```

```
MAKE=$(echo -n "BMW" | base64 | tr -d \\n)
MODEL=$(echo -n "M3" | base64 | tr -d \\n)
COLOR=$(echo -n "Red" | base64 | tr -d \\n)
DEALER_NAME=$(echo -n "EVMAUTO" | base64 | tr -d \\n)
```

```
minifab invoke -n KBA-Automobile -p '"OrderContract:createOrder","ord02"' -t '{"make":"'$MAKE'","model":"'$MODEL'","color":"'$COLOR'","dealerName":"'$DEALER_NAME'"}' -o dealer.auto.com
```

```
minifab query -n KBA-Automobile -p '"OrderContract:readOrder","ord02"'
```

```
minifab query -n KBA-Automobile -p '"queryAllCars"'
```

```
minifab query -n KBA-Automobile -p '"getCarsByRange","car01","car05"'
```

```
minifab query -n KBA-Automobile -p '"OrderContract:queryAllOrders"'
```

```
minifab query -n KBA-Automobile -p '"OrderContract:getOrdersByRange","ord01","ord05"'
```

```
minifab query -n KBA-Automobile -p '"getCarsWithPagination","10",""'
```

```
minifab query -n KBA-Automobile -p '"checkMatchingOrders","car03"'
```

```
minifab invoke -n KBA-Automobile -p '"matchOrder","car03","ord02"'
```

```
minifab invoke -n KBA-Automobile -p '"registerCar","car03","Bob","TN-10-7777"' -o mvd.auto.com
```

```
minifab query -n KBA-Automobile -p '"getCarHistory","car03"'
```

# Down minifab without removing files
```
minifab down
```

# Restarting minifab network
```
minifab restart
```

# Clear minifab network
```
minifab cleanup
```

