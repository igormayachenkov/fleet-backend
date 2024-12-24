exports.processRequest = async function(socket, bodyBuffer){
    const time = new Date().getTime()
    let success = false
    let responce = ""

    // PARSE and VERIFY REQUEST (body : Buffer)
    // tempA:7.50 tempTarget:7.00 heating:0 tempB:1.81
    const body  = bodyBuffer.toString('utf8', 0, 160)// limit body size
        .replace(/\r|\n/g," ")
    const ip = socket.remoteAddress?.replace(/^.*:/, '')
    try{

        // Set responce
        responce = "HTTP/1.1 200 OK\rContent-Type: text/html\r\r\nHello"

        success = true
    }catch(e){
        // Incorrect request
        responce = "13"
        // Save the hacker
        sql = `INSERT INTO hackers (time,ip,body) VALUES(${time},'${ip}','${body}')`
    }

    //  WRITE RESPONSE
    socket.write(responce);

    // LOG REQUEST
    console.log(
        new Date(time).toISOString()+" "
        + ip.padStart(15, ' ') +"  "
        + body.toString()
        + (success ? (' => '+responce) : "")
    )
    
}
