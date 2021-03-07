var statista_marital_status_csv = "../csv/marital-status.csv";

var statista_marital_status_json;

var sumMaritalRecords = 0;
var sumSingleRecords = 0;
var sumRelationshipRecords = 0;
var sumMarriedRecords = 0;
var sumDivorcedWidowedRecords = 0;


var sumSingleRecordsForLikelihood = 0;
var sumMarriedRecordsForLikelihood = 0;
var sumRelationshipRecordsForLikelihood = 0;
var sumDivorcedWidowedRecordsForLikelihood = 0;


var singlePrior;
var relationshipPrior;
var marriedPrior;
var divorcedWidowedPrior;


var pSingle;
var pRelationship;
var pMarried;
var pDivorcedWidowed;


chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    console.log("INSTALL");
    parseStatistaMaritalStatusCSVToJson(statista_marital_status_csv);
    
  }
});

function parseStatistaMaritalStatusCSVToJson() {
  Papa.parse(statista_marital_status_csv, {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function saveAsJson(results) {
      statista_marital_status_json = results;
      
      sumMaritalRecords = getTotalMaritalRecords();
      singlePrior = getSinglePrior();
      relationshipPrior = getRelationshipPrior();
      marriedPrior = getMarriedPrior();
      divorcedWidowedPrior = getDivorcedWidowedPrior();

      console.log("statista_marital_status_json", statista_marital_status_json);
      
    },
  });
}



function checkUrlInMaritalDataset(url) {
  var urlInDataset;
  for (elem in statista_marital_status_json["data"]) {
    if (
      statista_marital_status_json["data"][elem]["url"].toLowerCase() == url
    ) {
      urlInDataset = true;
     console.log('urlInDataset', urlInDataset)
    }
  }
  return urlInDataset;
}

function getTotalMaritalRecords() {
  for (elem in statista_marital_status_json["data"]) {
  
      sumSingleRecords += statista_marital_status_json["data"][elem]["single"];
      sumRelationshipRecords +=
        statista_marital_status_json["data"][elem]["relationship"];
      sumMarriedRecords +=
        statista_marital_status_json["data"][elem]["married"];
      sumDivorcedWidowedRecords +=
        statista_marital_status_json["data"][elem]["divorced/widowed"];
  }

  
  console.log('sumMaritalRecords', sumMaritalRecords)
  
  return (sumMaritalRecords == 0 ?
    sumMaritalRecords =
    sumSingleRecords +
    sumRelationshipRecords +
    sumMarriedRecords +
    sumDivorcedWidowedRecords 
    : sumMaritalRecords = sumMaritalRecords) ;   
}




function getTotalMaritalRecordsForUrl(elem) {
  try {

    return statista_marital_status_json["data"][elem]["single"] +
    statista_marital_status_json["data"][elem]["relationship"] +
    statista_marital_status_json["data"][elem]["married"] +
    statista_marital_status_json["data"][elem]["divorced/widowed"] 

  }
  catch(err){
    console.log('ERROR:', err)
  }
  
}

function getElemForMarital(url) {
  for (elem in statista_marital_status_json["data"]) {
    if (
      statista_marital_status_json["data"][elem]["url"].toLowerCase() == url
    ) {
      return elem;
    }
  }
}

function getSinglePrior() {
  return sumSingleRecords / sumMaritalRecords;
}

function getRelationshipPrior() {
  return sumRelationshipRecords / sumMaritalRecords;
}

function getMarriedPrior() {
  return sumMarriedRecords / sumMaritalRecords;
}

function getDivorcedWidowedPrior() {
  return sumDivorcedWidowedRecords / sumMaritalRecords;
}


function getSingleRecordsForUrl(elem) {
  try {
    return  statista_marital_status_json["data"][elem]["single"];
  }
  
  catch(err){
    console.log('ERROR:', err)

  }
}

function getRelationshipRecordsForUrl(elem) {
  try {
    return  statista_marital_status_json["data"][elem]["relationship"];
  }
  catch(err){
    console.log('ERROR:', err)
  }
}
  

function getMarriedRecordsForUrl(elem) {
  try {
    return statista_marital_status_json["data"][elem]["married"];
  }
  catch(err){
    console.log('ERROR:', err)
  }
  
}
function getDivorcedWidowedRecordsForUrl(elem) {
  try {
    return  statista_marital_status_json["data"][elem]["divorced/widowed"];
  }
  catch(err){
    console.log('ERROR:', err)
  }
  
}







