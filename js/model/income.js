var statista_income_csv = "../csv/income.csv";
 
var statista_income_json;

var sumLowRecords = 0;
var sumMediumRecords = 0;
var sumHighRecords = 0;
var sumIncomeRecords = 0;


var lowPrior;
var mediumPrior;
var highPrior;


var pLow;
var pMedium;
var pHigh;

var sumLowRecordsForLikelihood = 0;
var sumMediumRecordsForLikelihood = 0;
var sumHighRecordsForLikelihood = 0;


chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    console.log("INSTALL");
    parseStatistaIncomeCSVToJson(statista_income_csv);
  }
});

function parseStatistaIncomeCSVToJson() {
  Papa.parse(statista_income_csv, {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function saveAsJson(results) {
      statista_income_json = results;
      

      sumIncomeRecords = getTotalIncomeRecords();
      lowPrior = getLowPrior();
      mediumPrior = getMediumPrior();
      highPrior = getHighPrior();
 
      console.log("statista_income_json", statista_income_json);
    },
  });
}


function checkUrlInIncomeDataset(url){
  var urlInDataset;
  for (elem in statista_income_json["data"]) {

    if (statista_income_json["data"][elem]["url"].toLowerCase() == url) {
  
     urlInDataset = true;
     
   
    } 
  }

  return urlInDataset;
}




function getTotalIncomeRecords() {
  for (elem in statista_income_json["data"]) {
      sumLowRecords += statista_income_json["data"][elem]["low"];
      sumMediumRecords += statista_income_json["data"][elem]["medium"];
      sumHighRecords += statista_income_json["data"][elem]["high"];
    

  }  
    console.log('SumIncomeRecords', sumIncomeRecords)

    return (sumIncomeRecords == 0 ? 
      sumIncomeRecords = 
      sumLowRecords + 
      sumMediumRecords +
      sumHighRecords 
      
      : sumIncomeRecords = sumIncomeRecords);
  }

  


function getTotalIncomeRecordsForUrl(elem) {


  try {
    return statista_income_json["data"][elem]["low"] +
    statista_income_json["data"][elem]["medium"] +
    statista_income_json["data"][elem]["high"] 
  }
  catch(err){
    console.log('ERROR:', err)
  }
   

}




function getElemForIncome(url) {
  for (elem in statista_income_json["data"]) {
    if (statista_income_json["data"][elem]["url"].toLowerCase() == url) {
     console.log('URL IM DATASET',statista_income_json["data"][elem]["url"].toLowerCase())
     console.log('URL DIE GESUCHT WIRD', url)
      return elem;
    }
    
  }
}

function getLowPrior() {
  return sumLowRecords / sumIncomeRecords;
}
function getMediumPrior() {
  return sumMediumRecords / sumIncomeRecords;
}

function getHighPrior() {
  return sumMediumRecords / sumIncomeRecords;
}


function getLowRecordsForUrl(elem) {

  try {
    return statista_income_json["data"][elem]["low"];
  }
  
  catch(err) {
    console.log('ERROR:', err)
  }
}


function getMediumRecordsForUrl(elem) {

  try {
    return statista_income_json["data"][elem]["medium"];
  }
  
  catch(err) {
    console.log('ERROR:', err)
  }
}

function getHighRecordsForUrl(elem) {

  try {
    return statista_income_json["data"][elem]["high"];
  }
  
  catch(err) {
    console.log('ERROR:', err)
  }
}


