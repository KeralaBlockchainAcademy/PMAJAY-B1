/////Open a command terminal with in Fabric-network folder, let's call this terminal as host terminal

cd Fabric-network/

############## host terminal ##############

------------Start the Fabric-CA server and register the ca admin for each organization—----------------

docker-compose -f docker/docker-compose-ca.yaml up -d

sudo chmod -R 777 organizations/

------------Register and enroll the users for each organization—-----------

chmod +x registerEnroll.sh

./registerEnroll.sh

—-------------Build the infrastructure—-----------------

//Build the docker-compose-2org.yaml in the docker folder

docker-compose -f docker/docker-compose-2org.yaml up -d