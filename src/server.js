import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.use("/public", express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:5000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from Browser ❌"));
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString("utf8")));
  });
  socket.send("Hello");
});

server.listen(5000, handleListen);
