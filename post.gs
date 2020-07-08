function doPost(e) {
  
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;

  var messageParameter = userMessage.split(/\r\n|\n/);
 
  var targetSs = SpreadsheetApp.openById('1Y7IYRoQtdbcMfrAYwDGI1WVSErudQi00eWuE_5GbiIc');
  
  var targetSht = targetSs.getSheetByName('シート1');
  
  var lastRow = targetSht.getLastRow() + 1;

  var date = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'MM-dd');
  
  var weightRange = targetSht.getRange("D:D").getValues();
  
  var weightLastRow = weightRange.filter(String).length + 2;
  
  
 // 引数の数字はセルのアルファベットを意味する。（A,B,C,...が、1,2,3,...という対応関係です。）
  targetSht.getRange(weightLastRow, 3).setValue(date);
  
  targetSht.getRange(weightLastRow, 4).setValue(messageParameter[0]);
  
  targetSht.getRange(weightLastRow, 8).setValue(messageParameter[1]);

  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
  
}
