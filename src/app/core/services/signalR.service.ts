// signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private notificationSubjectEndThreadHub = new BehaviorSubject<string | null>(null);
  public notificationEndThreadHub$ = this.notificationSubjectEndThreadHub.asObservable();
  private endThreadHubConnection!: signalR.HubConnection;

  private notificationSubjectSyncData = new BehaviorSubject<string | null>(null);
  public notificationSyncData$ = this.notificationSubjectSyncData.asObservable();
  private syncDataHubConnection!: signalR.HubConnection;

  private notificationSubjectDeleteLogoutUsers = new BehaviorSubject<string | null>(null);
  public notificationDeleteLogoutUsers$ = this.notificationSubjectDeleteLogoutUsers.asObservable();
  private deleteLogoutUserDataHubConnection!: signalR.HubConnection;

  private notificationGroupAndOpenSelect = new BehaviorSubject<string | null>(null);
  public notificationgroupAndOpenSelect$ = this.notificationGroupAndOpenSelect.asObservable();
  private groupAndOpenSelectDataHubConnection!: signalR.HubConnection;
 
  
  private baseUrl = environment.baseUrl;


  public startConnectionChatHub(): void {
    if (!this.endThreadHubConnection) {
      this.endThreadHubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/endThreadHub`) // Replace with your hub URL
        .build();

      this.endThreadHubConnection
        .start()
        .then(() => console.log('SignalR EndThread connection started'))
        .catch(err => console.error('Error starting SignalR connection: ', err));
    }
    this.addListenerChatHub();
  }

  public addListenerChatHub(): void {
    this.endThreadHubConnection.on('ReceiveMessage', (message: any) => {
      this.notificationSubjectEndThreadHub.next(message);
      console.log(`${message}`);
    });
  }


  // for syncData Hub

  //#region  syncDataHub

  public startConnectionSyncDataHub(): void {
    if (!this.syncDataHubConnection) {
      this.syncDataHubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/syncdataHub`) // Replace with your hub URL
        .build();

      this.syncDataHubConnection
        .start()
        .then(() => console.log('SignalR SyncDataHub connection started'))
        .catch(err => console.error('Error starting SignalR SyncDataHub connection: ', err));
    }
    this.addListenerSyncDataHub();
  }

  public addListenerSyncDataHub(): void {
    this.syncDataHubConnection.on('ReceiveData', (message: any) => {
      this.notificationSubjectSyncData.next(message);
    });
  }


  //#endregion

  //#region  userLogout data hub

  public startConnectionDeleteLogoutUserDataHub(): void {
    if (!this.deleteLogoutUserDataHubConnection) {
      this.deleteLogoutUserDataHubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/delete-logout-userdataHub`) // Replace with your hub URL
        .build();

      this.deleteLogoutUserDataHubConnection
        .start()
        .then(() => console.log('SignalR DeleteLogout connection started'))
        .catch(err => console.error('Error starting SignalR SyncDataHub connection: ', err));
    }
    this.addListenerDeleteLogoutUserDataHub();
  }

  public addListenerDeleteLogoutUserDataHub(): void {
    this.deleteLogoutUserDataHubConnection.on('ReceiveUserId', (message: any) => {
      this.notificationSubjectDeleteLogoutUsers.next(message);
    });
  }


  //#endregion

  //#region  groupNoAndSelectOpen hub

  public startConnectionGroupNoAndOpenDataHub(): void {
    if (!this.groupAndOpenSelectDataHubConnection) {
      this.groupAndOpenSelectDataHubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/groupAndOpenHub`) // Replace with your hub URL
        .build();

      this.groupAndOpenSelectDataHubConnection
        .start()
        .then(() => console.log('SignalR groupAndOpenSelect connection started'))
        .catch(err => console.error('Error starting SignalR SyncDataHub connection: ', err));
    }
    this.addListenerGroupAndOpenSelectDataHub();
  }

  public addListenerGroupAndOpenSelectDataHub(): void {
    this.groupAndOpenSelectDataHubConnection.on("ReceiveGroupNoAndOpen", (groupNo, openVal, isAdmin) => {
      this.notificationGroupAndOpenSelect.next(isAdmin ? `Group No: ${groupNo}, Open Value: ${openVal}` : `Group No: ${groupNo}`);
    });
  }


  //#endregion

}
