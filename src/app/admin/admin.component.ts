import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './admin.service';
import { DataPerRoundSum, ScoreBoardGrid, ScoreBoardTotal, TotalScoreBoradModelResponse } from '../core/models/TotalScoreBoradModelResponse.model';
import { Observable } from 'rxjs/internal/Observable';
import { of, shareReplay, startWith, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdminCalculations } from '../core/models/SummaryAndAdminCalculationsResponse.model';
import { NumberColorPipe } from '../core/pipes/number-color.pipe';
import { SignalRService } from '../core/services/signalR.service';


@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, ReactiveFormsModule, NumberColorPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  private readonly adminService = inject(AdminService);
  private readonly signalRService = inject(SignalRService);

  adminForm = new FormGroup({
    groupNo: new FormControl('', [Validators.required]),
    tipMode: new FormControl(5000, [Validators.required])
  });
  defaultScoreBoardTotal: ScoreBoardTotal = new ScoreBoardTotal();
  // Initialize with an empty/default observable
  adminData$!: Observable<TotalScoreBoradModelResponse>;

  //scoreBoardTotal$!: Observable<ScoreBoardTotal>;
  //lstScoreBoardGrid$!: Observable<ScoreBoardGrid[]>;
  //lstDataPerRoundSum$!: Observable<DataPerRoundSum[]>;
  lstAdminCalculations$!: Observable<AdminCalculations[]>;

  totalScoreBoard!: ScoreBoardGrid[];
  lstScoreBoardGrid: ScoreBoardGrid[] = [];
  scoreBoardTotal: ScoreBoardTotal;
  constructor(){
    this.scoreBoardTotal=new ScoreBoardTotal();
  }
  ngOnInit(): void {

    let groupNo = (localStorage.getItem('groupNo'));
    if (groupNo != null) {
      this.adminForm.setValue({ groupNo: groupNo, tipMode: 5000 })
    }
    // this.adminData$ = of({
    //   lstScoreBoardGrid: [],
    //   scoreBoardTotal: this.defaultScoreBoardTotal
    // });

    // this.scoreBoardTotal$ = this.adminData$.pipe(
    //   map(data => data.scoreBoardTotal ?? this.defaultScoreBoardTotal),
    //   startWith(this.defaultScoreBoardTotal) // emit immediately on subscribe
    // );

    this.getAdminData()
    this.startSignalR()
  }


  onChangeGroupNo(event: Event) {
    console.log(this.adminForm)
  }


  getAdminData() {
    if (this.adminForm.valid) {
      const tipMode = this.adminForm.get('tipMode')?.value;
      const groupNo = this.adminForm.get('groupNo')?.value;
      localStorage.setItem('groupNo', groupNo ?? '');

      this.getDataTotalScoreBoardByGroupNoAndTipMode(Number(groupNo), Number(tipMode));
      this.getDataPerRoundByGroupNoAndTipMode(Number(groupNo), Number(tipMode));
      this.getAdminSummaryAndDataByGroupNoAndTipMode(Number(groupNo), Number(tipMode));

      // ✅ Subscribe only if lstScoreBoardGrid$ is initialized
    //  const scoreboardSubscription= this.lstScoreBoardGrid$.subscribe(data => {
    //     this.totalScoreBoard = data;
    //   });
    //   this.subscriptions.add(scoreboardSubscription);
    }
  }

  startSignalR() {
    this.signalRService.startConnectionChatHub();
    this.signalRService.startConnectionSyncDataHub();
    this.signalRService.startConnectionDeleteLogoutUserDataHub();
    this.signalRService.startConnectionGroupNoAndOpenDataHub();
   const endThreadHubsubscripton = this.signalRService.notificationEndThreadHub$.subscribe(msg => {
      if (msg) {
        this.getAdminData();
         const tipMode = this.adminForm.get('tipMode')?.value;
      const groupNo = this.adminForm.get('groupNo')?.value;

      //this.getDataPerRoundByGroupNoAndTipMode(Number(groupNo), Number(tipMode));
       
      }
    });
   const syncDataHubsubscripton = this.signalRService.notificationSyncData$.subscribe(msg => {
      if (msg) {
      this.getAdminData();
         const tipMode = this.adminForm.get('tipMode')?.value;
         const groupNo = this.adminForm.get('groupNo')?.value;
      }
    });
   const deleteLogoutHubsubscripton = this.signalRService.notificationDeleteLogoutUsers$.subscribe(msg => {
      if (msg) {
         this.getAdminData();
       
      }
    });

   const groupAndOpenSelectHubsubscripton = this.signalRService.notificationgroupAndOpenSelect$.subscribe(msg => {
      if (msg) {
        console.log(msg)
        this.getAdminData();
      }
    });

    this.subscriptions.add(endThreadHubsubscripton)
    this.subscriptions.add(syncDataHubsubscripton)
    this.subscriptions.add(deleteLogoutHubsubscripton)
    this.subscriptions.add(groupAndOpenSelectHubsubscripton)
  }

  getDataTotalScoreBoardByGroupNoAndTipMode(groupNo: number, tipMode: number) {
    // Cache the API result
    const adminSubscription= this.adminService
      .GetDataTotalScoreBoardByGroupNoAndTipMode(Number(groupNo), Number(tipMode))
      .subscribe(val=>{
       this.lstScoreBoardGrid= val.lstScoreBoardGrid;
       this.scoreBoardTotal=val.scoreBoardTotal?? new ScoreBoardTotal();
      })
      this.subscriptions.add(adminSubscription);
    
  }


  lstDataPerRound:DataPerRoundSum[]=[]
  getDataPerRoundByGroupNoAndTipMode(groupNo: number, tipMode: number) {
   const sub= this.adminService
      .GetDataPerRoundByGroupNoAndTipMode(Number(groupNo), Number(tipMode))
      .subscribe(val=>{
        this.lstDataPerRound=val;
      })
      this.subscriptions.add(sub);
  }

  calculations: AdminCalculations[]=[];
  getAdminSummaryAndDataByGroupNoAndTipMode(groupNo: number, tipMode: number) {
   const subs= this.adminService
      .GetAdminSummaryAndDataByGroupNoAndTipMode(Number(groupNo), Number(tipMode))
      .subscribe(data=>{
       this.calculations= data.calculations??[]
      })
      this.subscriptions.add(subs)
  }

    ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

