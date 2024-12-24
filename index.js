const net                   = require("node:net")
const { processRequest }    = require("./radio-man.js")


async function main(){
    try{
    
        console.log("-----------------------------------------------------------------------");
    
        // LOAD CONFIG
        //const configFilename = "/etc/fleet/config.js"
        const configFilename = "./config.js"
        console.log("CONFIG FILE: " +configFilename);
        global.gConfig = require(configFilename);

        // START SERVER
        const server = net.createServer((socket) => {

            socket.on('data', (body) => { // do not async !
                //processRequest (socket, "tempA:7.50 tempTarget:7.00 heating:0 tempB:-1.81")
                processRequest(socket, body)
                .finally(()=>{
                    socket.end();
                    socket.destroy();
                })
            })

            socket.on('error', (err) => {
                console.log('socket error:',err);
            });

            socket.on('close', () => {
                //console.log('close');
            });

        });

        server.on('error', (err) => {
            throw err;
        });

        server.listen(gConfig.PORT, () => {
            console.log(`SERVER STARTED on port ${gConfig.PORT}`);
        }); 

    }catch(e){
        console.log(e)
        process.exit(1)
    }
}
    
main();
    