# Hyperledger Fabric

Reference: https://hyperledger-fabric.readthedocs.io/en/latest/index.html


## Install the Dependencies

Note: If any of the following dependencies are available on your laptop, then no need to install it.

## cURL
Install curl using the command
```
sudo apt install curl -y
```

To verify the installation enter the following command


```
curl -V
```

## JQ
Install JQ using the following command
```
sudo apt install jq -y
```

To verify the installation enter the following command


```
jq --version
```

## Build Essential
Install Build Essential uisng the commnad
```
sudo apt install build-essential
```
To verify the installation enter the following command


```
dpkg -l | grep build-essential

```

### Download Fabric 

Note: Open a terminal in the **CHF** Folder & Execute the Following Commands

`curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh`

`./install-fabric.sh -f '2.5.4' -c '1.5.7'`

`sudo cp fabric-samples/bin/* /usr/local/bin`
