import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { SocketioService } from 'src/service/socketio.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }