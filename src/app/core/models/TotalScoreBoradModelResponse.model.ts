export class ScoreBoardGrid {
  mainTube: number = 0;
  luozi: number = 0;
  smallTable: number = 0;
  statistics: number = 0;
  inputByUser: number = 0;
  shutting: number = 0;
}

export class ScoreBoardTotal {
  one: number = 0;
  two: number = 0;
  three: number = 0;
  four: number = 0;
  five: number = 0;
  six: number = 0;
  totalMainTube: number = 0;
  totalLuozi: number = 0;
  totalSmallTable: number = 0;
  totalSmallTableAndMainTube: number = 0;
  totalWinOrLose: number = 0;
  totalCurrentlyOnlineUsers: number = 0;
  totalSignedInUsers: number = 0;
}

export class TotalScoreBoradModelResponse {
  lstScoreBoardGrid: ScoreBoardGrid[] = [];
  scoreBoardTotal: ScoreBoardTotal = new ScoreBoardTotal();
}

export class DataPerRoundSum {
  tube: string = "";
  luozi: number = 0;
  winOrLose: number = 0;
  smallTable: number = 0;
  statistics: number = 0;  
}



