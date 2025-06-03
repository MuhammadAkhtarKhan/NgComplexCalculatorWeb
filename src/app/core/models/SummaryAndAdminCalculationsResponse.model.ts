

export class SummaryAndAdminCalculationsResponse {
  summary?: CalculatorSumModel;
  calculations?: AdminCalculations[];
  summaryGrid?: SummaryGridPannel;
}

export class CalculatorSumModel {
  one: number = 0;
  two: number = 0;
  three: number = 0;
  four: number = 0;
  five: number = 0;
  six: number = 0;
  luozi: number = 0;
}

export class SummaryGridPannel {
  connectedUsers: number = 0;
  winOrLose: number = 0;
}

export class AdminCalculations {
  rawData: string = '';
  identifiedData: string = '';
  name: string = '';
  one: number = 0;
  two: number = 0;
  three: number = 0;
  four: number = 0;
  five: number = 0;
  six: number = 0;
  luozi: number = 0;
  userId: string = '';
  version: number = 0;
  groupNo?: number;
  shutting?: number;
  inputByUser?: string;
  winOrLose?: number;
  mainTube?: number;
  smallTable?: number;
}
