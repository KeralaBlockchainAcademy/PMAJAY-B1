# Building your first chaincode

### Create folders to keep the chaincode files
```
mkdir Chaincode
```
```
cd Chaincode
```
```
mkdir KBA-Automobile
```

```
cd KBA-Automobile
```

### Initialize new Nodejs project
```
npm init -y
```

### Install the necessary packages required to build chaincode
```
npm i fabric-contract-api
npm i fabric-shim

```

### Add script to start the chaincode
In package.json, add 
```
"start": "fabric-chaincode-node start"
```

### Create index.js to add chaincode initialisation part
```
touch index.js
```

### Create folder to keep the contract file
```
mkdir lib
```
```
cd lib
```

### Create car-contract.js to add functions related to car asset
```
touch car-contract.js
```


