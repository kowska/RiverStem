package main

import (
    "fmt"
    "net/http"
    "github.com/gorilla/websocket"
)

// Define our message object
type Message struct {
        User string `json:"user"`
        Message string `json:"message"`
}

var clients = make(map[*websocket.Conn]bool) // map of connected clients, keys are pointers to ws, values are bools
var broadcast = make(chan Message)           // queue for messages sent by clients
var upgrader = websocket.Upgrader{}          // to use websocket connection




func main() {	
	fs := http.FileServer(http.Dir("../public"))
	http.Handle("/", fs)

    http.HandleFunc("/ws", handleConnections)

    go handleMessages()
    
    http.ListenAndServe(":8080", nil)
}


func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, _ := upgrader.Upgrade(w, r, nil)
	defer ws.Close()

	clients[ws] = true

	for {
		var msg Message
		ws.ReadJSON(&msg)
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		for client := range clients {
			client.WriteJSON(msg)
		}
	}
}