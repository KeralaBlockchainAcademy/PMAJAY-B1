#!/bin/sh

echo "Start  the Network"
minifab netup -s couchdb -e true -i 2.4.8 -o manufacturer.auto.com

sleep 5

echo"create the channel"
minifab create -c autochannel

sleep 2

echo" Join the peers to the channel"
minifab join -c autochannel

sleep 2

echo"Anchor update"
minifab anchorupdate

sleep 2

echo"Profile Generation"
minifab profilegen -c autochannel

