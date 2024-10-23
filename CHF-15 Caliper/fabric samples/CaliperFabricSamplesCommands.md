### Run the provided commands from the directory where fabric-samples is located.
```
cd fabric-samples/test-network/
```
```
./network.sh up createChannel
```
```
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript
```

### Create the caliper-workspace directory in the same path of fabric samples

```
cd ../../
```
```
mkdir -p caliper-workspace/networks caliper-workspace/benchmarks caliper-workspace/workload
```

### Install the caliper tool in the caliper-workspace

```
cd caliper-workspace/
```
```
npm install --only=prod @hyperledger/caliper-cli@0.5.0
```
```
npx caliper bind --caliper-bind-sut fabric:2.4
```



### Create the networkConfig.yaml inside networks folder
### Create the myAssetBenchmark.yaml inside the benchmarks folder
### Create the readAsset.js inside the workload folder

### Run command for caliper 
```
npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml --caliper-benchconfig benchmarks/myAssetBenchmark.yaml --caliper-flow-only-test --caliper-fabric-gateway-enabled
```

### Stop the network
```
cd ../fabric-samples/test-network

./network.sh down
```


