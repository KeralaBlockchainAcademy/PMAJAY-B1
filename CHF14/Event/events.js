const grpc = require('@grpc/grpc-js');
const { connect, signers } = require('@hyperledger/fabric-gateway');
const crypto = require('crypto');
const { promises: fs } = require('fs');
const path = require('path');
const {profile} = require('./profile')


class EventListener{
    async BlockEventListener(role, channelName) {
        
        let profileOrg = profile[role];
        // The gRPC client connection should be shared by all Gateway connections to this endpoint.
        const client = await newGrpcConnection(profileOrg["tlsCertPath"], profileOrg["peerEndpoint"], profileOrg["peerHostAlias"]);
        const gateway = connect({
            client,
            identity: await newIdentity(profileOrg["certPath"], profileOrg["mspId"]),
            signer: await newSigner(profileOrg["keyDirectoryPath"])
        });

        try {
            let channel = await gateway.getNetwork(channelName);
             
            const blocks= await channel.getBlockEvents();
            try{
                for await (const block of blocks){
                    console.log('Received block number',block.getHeader().getNumber());
                }
            }catch(err){
                console.error('Error',err);
            }finally{
                blocks.close();
            }

            
                   
        } finally{
            gateway.close();
            client.close();
        }
    }


    async contractEventListener(role, channelName, chaincodeName){

        let profileOrg = profile[role];
        // The gRPC client connection should be shared by all Gateway connections to this endpoint.
        const client = await newGrpcConnection(profileOrg["tlsCertPath"], profileOrg["peerEndpoint"], profileOrg["peerHostAlias"]);
       
        const gateway = connect({
            client,
            identity: await newIdentity(profileOrg["certPath"], profileOrg["mspId"]),
            signer: await newSigner(profileOrg["keyDirectoryPath"])
        });

        try {
            let channel = await gateway.getNetwork(channelName);

            const events = await channel.getChaincodeEvents(chaincodeName)
           try{
                for await (const event of events){
                    console.log('Received chaincode event',event.eventName);
                }
            }
            catch(err){
                console.error('Error',err);
            }
            finally{
                events.close();
            }
        } finally{
            gateway.close();
            client.close();
        }
    }
}   

async function newGrpcConnection(tlsCertPath, peerEndpoint, peerHostAlias){

    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials,{
        'grpc.ssl_target_name_override': peerHostAlias,
    });

}

async function newIdentity(certPath, mspId){
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials}
}

async function newSigner(keyDirectoryPath){
    const files = await fs.readdir(keyDirectoryPath);
    const keyPath = path.resolve(keyDirectoryPath, files[0]);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem); 
    return signers.newPrivateKeySigner(privateKey);
}


module.exports={
    EventListener
}



// let addCarEventData = { Type: 'Car creation', Model: model };
// await ctx.stub.setEvent('addCarEvent', Buffer.from(JSON.stringify(addCarEventData)));