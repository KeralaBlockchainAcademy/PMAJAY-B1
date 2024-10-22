
## Host Terminal -To start automobile network
```
./startAutomobileNetwork.sh
```
### create a folder caliper-workspace in the same path of KBA-Automobile folder
```
mkdir caliperworkspace
```
### create three separate folders inside the caliper-workspace directory named ‘Network’, ‘Workload’, ‘Benchmark’
```
cd caliperworkspace
mkdir Network
mkdir Workload
mkdir Benchmark
```
### create a file called networkconfig.yaml inside Network directory inside caliper-workspace directory

### Create a file called carbenchmark.yaml in the Benchmark directory

### create a file named readcar.js in the Workload directory

### Go to caliper-workspace directory and install the caliper

```
npm install --only=prod @hyperledger/caliper-cli@0.5.0
```
### Specify the sut here it is fabric 2.4
```
npx caliper bind --caliper-bind-sut fabric:2.4
```

### Execute the command to run caliper
```
npx caliper launch manager --caliperworkspace ./ --caliper-networkconfig Network/networkconfig.yaml --caliper-benchconfig Benchmark/carbenchmark.yaml --caliper-flow-only-test --caliper-fabric-gateway-enabled
```
### To stop the network
```
cd ..
cd Automobile-network/
./stopAutomobileNetwork.sh 

