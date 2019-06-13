/*
 *  @Project: RA Toolbox
 *  @Author : Hsins
 *  @E-mail : hsinspeng@gmail.com
 */


function onOpen() {
  // Add buttons to menu
  SpreadsheetApp.getUi()
    .createMenu("RA Toolkits")
    .addItem("清除資料","clearData")
    .addItem("查詢許可證資料（先選取資料範圍）","tfdaSearch")
    .addToUi();
  SpreadsheetApp.getUi()
    .alert('【注意】\n\n' +
           '1. 工作表「更新列表」會每天自動抓取數據，不建議更動\n' +
           '2. 工作表「查詢列表」提供查詢功能，會實時從食藥署網站抓取資料\n');
}

function tfdaUpdate() {
  const startTime= new Date();
  const workBook = SpreadsheetApp.getActiveSpreadsheet();
  const workSheet = workBook.getSheets()[0];
  workSheet.sort(2, true);
  
  const numRows = workSheet.getLastRow() - 1;
  const data = workSheet.getRange(2, 1, numRows, 2).getValues();
   
  for (var i = 0; i < numRows; i++) {
    var licenseName = String(data[i][0]);
    var currTime = new Date();
    var updatedTime = data[i][1];
    
    if (currTime - updatedTime >= 86400000 && currTime - startTime <= 60000) {
      var fetchData = fetchTFDA(licenseName);
      
      var range = workSheet.getRange(i+2, 2, 1, 43);
      try {
        range.setValues(fetchData);
      } catch (e) {
        console.log(fetchData);
        Logger.log(e.toString());
      }
    } else {
      continue;
    }  
  }
}

function tfdaSearch() {
  const workBook = SpreadsheetApp.getActiveSpreadsheet();
  const workSheet = workBook.getActiveSheet();
  const dataRange = workSheet.getActiveRange();
  const startRow = dataRange.getRow();
  const data = dataRange.getValues();
  const dataSize = data.length;
  
   
  for (var i = 0; i < dataSize; i++) {
    var licenseName = String(data[i]);
    var fetchData = fetchTFDA(licenseName);
      
    var range = workSheet.getRange(i+startRow, 2, 1, 43);
    try {
      range.setValues(fetchData);
    } catch (e) {
      console.log(fetchData);
      Logger.log(e.toString());
    }
  }
}

function clearData() {
  const workBook = SpreadsheetApp.getActiveSpreadsheet();
  const workSheet = workBook.getActiveSheet();
  const dataRange = workSheet.getRange("A2:AR"+workSheet.getLastRow())
  
  dataRange.clear();
}
