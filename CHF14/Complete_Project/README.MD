# Complete Automobile Application

## Pre-requisites

Install node, npm, jq, docker, docker-compose, minifab

## Start the Automobile-Network

Go to the Automobile folder

```bash
cd Automobile-Network
```

Start the network using this command

```bash
./startNetwork.sh
```

## Run the application

Open a new terminal and go to the AutoApp folder


```bash
cd AutoApp
```

Install all the dependencies

```bash
npm install
```

```bash
npm start
```

Browse http://localhost:3000/

To stop, press ctrl+c from the terminal where you have given npm start.

## Stop the Network

To stop the Automobile Network go to the Automobile-Network folder and execute this command


```bash
./stopAutomobileNetwork.sh
```