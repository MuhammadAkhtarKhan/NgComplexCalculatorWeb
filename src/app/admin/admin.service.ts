import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { DataPerRoundSum, TotalScoreBoradModelResponse } from '../core/models/TotalScoreBoradModelResponse.model';
import { SummaryAndAdminCalculationsResponse } from '../core/models/SummaryAndAdminCalculationsResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly adminnUrl = `${environment.baseUrl}/api/Admin/GetDataTotalScoreBoardByGroupNoAndTipMode`;
  private readonly urlGetAllThreadByGroupNo = `${environment.baseUrl}/api/Calculator/GetAllEndThreadByGroupNo`;
  private readonly urlGetDataPerRoundByGroupNoAndTipMode = `${environment.baseUrl}/api/Admin/GetDataPerRoundByGroupNoAndTipMode`;
  private readonly urlGetAdminSummaryAndDataByGroupNoAndTipMode = `${environment.baseUrl}/api/Admin/GetAdminSummaryAndDataByGroupNoAndTipMode`;
  
  constructor(private http:HttpClient) { }
// Example: Get single user by ID
  GetDataTotalScoreBoardByGroupNoAndTipMode(groupNo: number, tipMode:number): Observable<TotalScoreBoradModelResponse> {
    return this.http.get<TotalScoreBoradModelResponse>(`${this.adminnUrl}?groupNo=${groupNo}&tipMode=${tipMode}`);
  }
  GetAllEndThreadByGroupNo(groupNo: number): Observable<TotalScoreBoradModelResponse> {
    return this.http.get<TotalScoreBoradModelResponse>(`${this.urlGetAllThreadByGroupNo}?groupNo=${groupNo}`);
  }
  GetDataPerRoundByGroupNoAndTipMode(groupNo: number, tipMode:number=5000): Observable<DataPerRoundSum[]> {
    return this.http.get<DataPerRoundSum[]>(`${this.urlGetDataPerRoundByGroupNoAndTipMode}?groupNo=${groupNo}&tipMode=${tipMode}`);
  }
  GetAdminSummaryAndDataByGroupNoAndTipMode(groupNo: number, tipMode:number=5000): Observable<SummaryAndAdminCalculationsResponse> {
    return this.http.get<SummaryAndAdminCalculationsResponse>(`${this.urlGetAdminSummaryAndDataByGroupNoAndTipMode}?groupNo=${groupNo}&tipMode=${tipMode}`);
  }
}
