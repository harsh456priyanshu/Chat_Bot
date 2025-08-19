require('dotenv').config();
const app = require("./src/app");
const { createServer } = require('http');
const {Server} = require("socket.io");
const generateResponse = require('./src/service/ai.service');


const httpServer = createServer(app);
const io = new Server(httpServer , {
    cors: {
        orgin: "http://localhost:5173",
    }
});

const chatHistory = [];

io.on("connection" , (socket) => {
    console.log("A user Connected")

    socket.on("disconnect" , () => {
        console.log("A user Disconnected")
    })

    // ai-message

    socket.on('ai-message' , async(data) => {
        console.log("Ai message required: " , data);


        chatHistory.push({
            role: 'user',
            parts : [ {text: data}]
        });

        const response  = await generateResponse(chatHistory)

        chatHistory.push({
            role: 'model',
            parts: [ {text : data}]
        });

        socket.emit('ai-message-response' , response)

    });

});


httpServer.listen(3000 , () => {
    console.log("Server is running on Port 3000");
});