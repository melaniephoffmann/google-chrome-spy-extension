var statista_gender_csv = "../csv/gender.csv";

var statista_gender_json;

var sumMaleRecords = 0;
var sumFemaleRecords = 0;
var sumGenderRecords = 0;
var sumFemaleRecordsForLikelihood = 0;
var sumMaleRecordsForLikelihood = 0;

var pFemale;
var pMale;

var femalePrior;
var malePrior

 

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    console.log("INSTALL");
    parseStatistaGenderCSVToJson(statista_gender_csv);
  }
});


function parseStatistaGenderCSVToJson() {
  Papa.parse(statista_gender_csv, {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function saveAsJson(results) {
      statista_gender_json = results;
      sumGenderRecords = getTotalGenderRecords();

        
      femalePrior = getFemalePrior();
      malePrior = getMalePrior();
      console.log("statista_gender_json", statista_gender_json);
    },
  });
}


function round(value) {
  return Number(Math.round(value + "e" + 4) + "e-" + 4);
}

function checkUrlInGenderDataset(url){
  var urlInDataset;
  for (elem in statista_gender_json["data"]) {

    if (statista_gender_json["data"][elem]["url"].toLowerCase() == url) {
     console.log('URL IM DATASET',statista_gender_json["data"][elem]["url"].toLowerCase())
     console.log('URL DIE GESUCHT WIRD', url)
     urlInDataset = true;
     console.log('urlInDataset', urlInDataset)
   
    } 
  }

  return urlInDataset;
}


function getTotalGenderRecords() {
  for (elem in statista_gender_json["data"]) {
      sumFemaleRecords += statista_gender_json["data"][elem]["female"];
      sumMaleRecords += statista_gender_json["data"][elem]["male"];
    
  }
    console.log('sumGenderRecords', sumGenderRecords)

    return (sumGenderRecords == 0 ? 
      sumGenderRecords = 
      sumMaleRecords + 
      sumFemaleRecords : sumGenderRecords = sumGenderRecords);
}


function getElemForGender(url) {

  for (elem in statista_gender_json["data"]) {
    if (statista_gender_json["data"][elem]["url"].toLowerCase() == url) {
     console.log('URL IM DATASET',statista_gender_json["data"][elem]["url"].toLowerCase())
     console.log('URL DIE GESUCHT WIRD', url)
  
      return elem;
    }
    
  }
}


function getFemalePrior() {
  console.log('FEMALE PROIOR', round(sumFemaleRecords) / round(sumGenderRecords) )
  return round(sumFemaleRecords) / round(sumGenderRecords);
}
function getMalePrior() {
  console.log('MALE PRIOR', sumMaleRecords / sumGenderRecords)
  return sumMaleRecords / sumGenderRecords;
}

function getFemaleRecordsForUrl(elem) {

  try {
           
    return statista_gender_json["data"][elem]["female"];
  }
  
  catch(err) {
    console.log('ERROR:', err)
  }
}


function getMaleRecordsForUrl(elem) {

  try {
    return statista_gender_json["data"][elem]["male"];
  }
  
  catch(err) {
    console.log('ERROR:', err)
  }
}




