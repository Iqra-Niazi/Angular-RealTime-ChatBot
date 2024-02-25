import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketioService } from 'src/service/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userName = '';
  message = '';
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userList: string[] = [];
  socket: any;
  isChatOpen = false;

  constructor(private socketService: SocketioService) { 

    let username = "Jack";
    this.userNameUpdate(username)
  }

  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  userNameUpdate(name: string): void {
    this.socket = io.io(`http://localhost:3000/?userName=${name}`);
    this.userName = name;

    this.socket.emit('set-user-name', name);

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
    });

    this.socket.on('message-broadcast', (data: {message: string, userName: string}) => {
      if (data) {
        this.messageList.push({message: data.message, userName: data.userName, mine: false});
        this.scrollToBottom()
        console.log('A',this.messageList)

      }
    });
  }

  sendMessage(): void {
    this.socket.emit('message', this.message);
    this.messageList.push({message: this.message, userName: this.userName, mine: true});
    console.log('b',this.messageList)
    this.message = '';
    console.log(this.message);
    this.scrollToBottom()
  }
  scrollToBottom(): void {
    setTimeout(() => {
      const objDiv = document.getElementById('chat-conversation');
      objDiv!.scrollTop = objDiv!.scrollHeight;
    });
  }
  openChat() {
    this.isChatOpen = true;
  }

  closeForm() {
    this.isChatOpen = false;
  }
}
