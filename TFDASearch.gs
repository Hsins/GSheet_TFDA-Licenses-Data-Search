function fetchTFDA(licenseName) {
  // Get LiccenseID for Search
  const licenseID = getLicenseID(licenseName);
  
  // Fetch Content From TFDA Website
  const url = 'https://www.fda.gov.tw/mlms/H0001D.aspx?Type=Lic&LicId=' + licenseID;

  // Setup UrlFetch options
  const options = {
    'async': true,
    'crossDomain': true,
    'method': 'GET',
    'headers': {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,la;q=0.5',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
    }
  };

  // Make a GET request and get response.
  const response = UrlFetchApp.fetch(url, options).getContentText();
  const $ = Cheerio.load(response);
  
  // Parse the response
  const updatedTime = new Date().toLocaleString();                                                                                  // 更新時間
  const licenseLink = '=HYPERLINK("https://www.fda.gov.tw/mlms/H0001D.aspx?Type=Lic&LicId=' + licenseID + '", "Link")';             // 許可證詳細內容
  const prescriptionLink = '=HYPERLINK("https://www.fda.gov.tw/mlms/H0001D1.aspx?Type=Lic&LicId=' + licenseID + '", "Link")';       // 詳細處方成分
  const appearanceLink = '=HYPERLINK("https://www.fda.gov.tw/mlms/H0001D2.aspx?Type=Lic&LicId=' + licenseID + '", "Link")';         // 藥物外觀
  const offLabelLink = '=HYPERLINK("https://www.fda.gov.tw/mlms/H0001D3.aspx?Type=Lic&LicId=' + licenseID + '", "Link")';           // 仿單/外盒資料
  const authorizationLink = '=HYPERLINK("https://www.fda.gov.tw/mlms/H0001D4.aspx?Type=Lic&LicId=' + licenseID + '", "Link")';      // 授權使用
  const cancelMark = $("span[id='lblCanMarkMa']").text();                                                                           // 註銷狀態
  const cancelDate = $("span[id='lblCanMarkDate']").text();                                                                         // 註銷日期
  const cancelReason = $("span[id='lblCanRea']").text();                                                                            // 註銷理由
  const gmpQSDNum = $("span[id='lblGmpQSDno']").text();                                                                             // 製造許可登錄編號
  const expireDate = $("span[id='lblEfDate']").text();                                                                              // 有效日期
  const validDate = $("span[id='lblGiDate']").text();                                                                               // 發證日期
  const licenseType = $("span[id='lblLicknd']").text();                                                                             // 許可證種類
  const oldLicenseNum = $("span[id='lblOldLicid']").text();                                                                         // 舊證字號
  const medicalClass = $("span[id='lblMedClass']").text();                                                                          // 醫療器材級數
  const customsClearID = $("span[id='lblSignId']").text();                                                                          // 通關簽審文件編號
  const chineseName = $("span[id='lblChName']").text();                                                                             // 中文品名
  const englishName = $("span[id='lblEnName']").text();                                                                             // 英文品名
  const effectContent = $("span[id='lblEfect']").text();                                                                            // 效能
  const deviceSpec = $("span[id='lblWaySpec']").text();                                                                             // 醫器規格
  const dosageForm = $("span[id='lblDoesName']").text();                                                                            // 劑型
  const packageInformation = $("span[id='lblPack']").text();                                                                        // 包裝資料
  const sheetNote = $("span[id='lblSheetNotes']").text();                                                                           // 標籤、仿單及包裝加註
  const deviceMainKind1 = $("span[id='lblDocKnd1']").text();                                                                        // 醫器主類別一
  const deviceMainKind2 = $("span[id='lblDocKnd2']").text();                                                                        // 醫器主類別二
  const deviceMainKind3 = $("span[id='lblDocKnd3']").text();                                                                        // 醫器主類別三
  const deviceSubKind1 = $("span[id='lblMsKnd1']").text();                                                                          // 醫器次類別一
  const deviceSubKind2 = $("span[id='lblMsKnd2']").text();                                                                          // 醫器次類別二
  const deviceSubKind3 = $("span[id='lblMsKnd3']").text();                                                                          // 醫器次類別三
  const briefIngredient = $("span[id='lblIngrma']").text();                                                                         // 主成分略述
  const restrictItem = $("span[id='lblReStr']").text();                                                                             // 限制項目
  const applyCompany = $("span[id='lblApp']").text();                                                                               // 申請商名稱
  const applyAddress = $("span[id='lblAppAddr']").text();                                                                           // 申請商地址
  const manufactoryMainFirmName = $("span[id='gvFact_lblFact_0']").text();                                                          // 主製造廠名稱
  const manufactoryMainFirmAddress = $("span[id='gvFact_lblFactAddr_0']").text();                                                   // 主製造廠廠址
  const manufactoryMainCompanyAddress = $("span[id='gvFact_lblComAddr_0']").text();                                                 // 主製造廠公司地址
  const manufactoryMainCountry = $("span[id='gvFact_lblCtyMa_0']").text();                                                          // 主製造廠國別
  const manufactoryMainProcess = $("span[id='gvFact_lblMkCouMa_0']").text();                                                        // 主製程
  const manufactorySubFirmName = $("span[id='gvFact2_lblFact_0']").text();                                                          // 次製造廠名稱
  const manufactorySubFirmAddress = $("span[id='gvFact2_lblFactAddr_0']").text();                                                   // 次製造廠廠址
  const manufactorySubCompanyAddress = $("span[id='gvFact2_lblComAddr_0']").text();                                                 // 次製造廠公司地址
  const manufactorySubCountry = $("span[id='gvFact2_lblCtyMa_0']").text();                                                          // 次製造廠國別
  const manufactorySubProcess = $("span[id='gvFact2_lblMkCouMa_0']").text();                                                        // 次製程
 
  const data = [[updatedTime,
                 licenseLink,
                 prescriptionLink,
                 appearanceLink,
                 offLabelLink,
                 authorizationLink,
                 cancelMark,
                 cancelDate,
                 cancelReason,
                 gmpQSDNum,
                 expireDate,
                 validDate,
                 licenseType,
                 oldLicenseNum,
                 medicalClass,
                 customsClearID,
                 chineseName,
                 englishName,
                 effectContent,
                 deviceSpec,
                 dosageForm,
                 packageInformation,
                 sheetNote,
                 deviceMainKind1,
                 deviceMainKind2,
                 deviceMainKind3,
                 deviceSubKind1,
                 deviceSubKind2,
                 deviceSubKind3,
                 briefIngredient,
                 restrictItem,
                 applyCompany,
                 applyAddress,
                 manufactoryMainFirmName,
                 manufactoryMainFirmAddress,
                 manufactoryMainCompanyAddress,
                 manufactoryMainCountry,
                 manufactoryMainProcess,
                 manufactorySubFirmName,
                 manufactorySubFirmAddress,
                 manufactorySubCompanyAddress,
                 manufactorySubCountry,
                 manufactorySubProcess
                ]]
  
  return data;
}

function getLicenseID(licenseName) {
  var licenseID;
  const prefixLicenseName = licenseName.substring(0, licenseName.indexOf('第'));
  const suffixLicenseName = licenseName.substring(licenseName.indexOf('第') + 1, licenseName.indexOf('號'));
  
  switch (prefixLicenseName) {
    case '衛署醫器製字':
      licenseID = "05" + suffixLicenseName;
      break;
    case '衛署醫器輸字':
      licenseID = "06" + suffixLicenseName;
      break;
    case '衛署菌疫輸字':
      licenseID = "10" + suffixLicenseName;
      break;
    case '衛署醫器陸輸字':
      licenseID = "42" + suffixLicenseName;
      break;
    case '衛署醫器輸壹字':
      licenseID = "44" + suffixLicenseName;
      break;
    case '衛署醫器陸輸壹字':
      licenseID = "46" + suffixLicenseName;
      break;
    case '衛部醫器製字':
      licenseID = "55" + suffixLicenseName;
      break;
    case '衛部醫器輸字':
      licenseID = "56" + suffixLicenseName;
      break;
    case '衛部醫器製壹字':
      licenseID = "93" + suffixLicenseName;
      break;
    case '衛部醫器輸壹字':
      licenseID = "94" + suffixLicenseName;
      break;
    default:
      break;
  }
  
  return licenseID;
}
