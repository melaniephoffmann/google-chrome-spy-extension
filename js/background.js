var statista_gender_csv = "../csv/gender.csv";
var statista_marital_status_csv = "../csv/marital-status.csv";
var statista_gender;
var statista_marital_status;

var evidenceGender;
var evidenceMarital;
var evidenceIncome;

var probability_likelihood_female, probability_likelihood_male;
var probability_likelihood_single,
  probability_likelihood_married,
  probability_likelihood_relationship,
  probability_likelihood_divorcedWidowed


var probability_likelihood_low,
  probability_likelihood_medium,
  probability_likelihood_high

var currentEvidenceGender;
var currentEvidenceMarital;
var all_records;
var statista_data;

var pMale;
var pFemale;

var arrayWithFinalValuesGender = [];
var arrayWithFinalValuesMaritalStatus = [];
var arrayWithFinalValuesIncome = [];

var arrayWithFinalLikelihoodGender = [];
var arrayWithFinalLikelihoodMaritalStatus = [];
var arrayWithFinalLikelihoodIncomeGroup = [];


var femaleRecordsForLikelihood ;
var maleRecordsForLikelihood ;


function parseUrl(requestString) {
  try{
    const url = new URL(requestString);
    const hostname = url.hostname;
    console.log('HOSTNAME BACKGROUND', hostname)
    const splitHostname = hostname.split(".");
    const parsedUrl = splitHostname.slice(1, 3).toString().replace(",", ".");
    return parsedUrl;
  }

 catch(err){
   console.log('ERROR:', err)
 }

}

function parseRequestToArray(request) {
  var urlArray = Object.values(request);
  return urlArray;
}

function parseUrlArrayToString(requestAsArray) {
  var urlString = requestAsArray[0].toString();
  return urlString;
}

function round(value) {
  return Number(Math.round(value + "e" + 4) + "e-" + 4);
}




function putInArrayLikelihoodGender(
  likelihoodFemale, likelihoodMale, url
) {
  arrayWithFinalLikelihoodGender.push(
    {status: "female", data: likelihoodFemale, url: url},
    {status:"male", data: likelihoodMale, url: url})


  return arrayWithFinalLikelihoodGender;
}



function putInArrayLikelihoodMaritalStatus(
  likelihoodSingle, likelihoodMarried, likelihoodDivorcedWidowed, likelihoodRelationship, url
) {
  arrayWithFinalLikelihoodMaritalStatus.push(
    {status: "single", data: likelihoodSingle, url: url},
    {status:"married", data: likelihoodMarried, url: url},
    {status:"divorcedWidowed", data: likelihoodDivorcedWidowed, url: url},
    {status:"relationship", data: likelihoodRelationship, url: url})


  return arrayWithFinalLikelihoodMaritalStatus;
}

function putInArrayLikelihoodIncomeGroup(
  likelihoodLow, likelihoodMedium, likelihoodHigh, url
) {
  arrayWithFinalLikelihoodIncomeGroup.push(
    {status: "low", data: likelihoodLow, url: url},
    {status:"medium", data: likelihoodMedium, url: url},
    {status:"high", data: likelihoodHigh, url: url})


  return arrayWithFinalLikelihoodIncomeGroup;
}


function computeProbabilityOfLikelihoodGender(url) {
  var elemForGender = getElemForGender(url);
  var female_records_for_url = getFemaleRecordsForUrl(elemForGender);
  var male_records_for_url = getMaleRecordsForUrl(elemForGender);



  putInArrayLikelihoodGender(female_records_for_url / sumFemaleRecords, male_records_for_url / sumMaleRecords, url);

console.log('probablity_l_f', probability_likelihood_female)

  probability_likelihood_female == null
  ? 
  (probability_likelihood_female =
     female_records_for_url) :
      probability_likelihood_female +=
      female_records_for_url

    probability_likelihood_male == null
    ? 
    (probability_likelihood_male = 
      male_records_for_url) : 
      probability_likelihood_male += 
      male_records_for_url ;

    console.log('female_records_for_url', female_records_for_url, url)
    console.log('probability_likelihood_male', probability_likelihood_male, url)

}

function computeProbabilityOfLikelihoodMarital(url) {
  var elemForMarital = getElemForMarital(url);
  console.log('elemForMarital', elemForMarital);

  var single_records_for_url = getSingleRecordsForUrl(elemForMarital);
  var relationship_records_for_url = getRelationshipRecordsForUrl(
    elemForMarital
  );
  var married_records_for_url = getMarriedRecordsForUrl(elemForMarital);
  var divorcedWidowed_records_for_url = getDivorcedWidowedRecordsForUrl(elemForMarital);

  console.log('single_records_for_url', single_records_for_url); 


    putInArrayLikelihoodMaritalStatus(single_records_for_url / sumSingleRecords,
    relationship_records_for_url / sumRelationshipRecords,
    married_records_for_url / sumMaritalRecords,
    divorcedWidowed_records_for_url / sumDivorcedWidowedRecords,
    url);

  probability_likelihood_single == null
    ? 
    probability_likelihood_single =
        single_records_for_url
    : probability_likelihood_single +=
        single_records_for_url ;

  probability_likelihood_married == null
    ? probability_likelihood_married =
        married_records_for_url 
    : probability_likelihood_married +=
        married_records_for_url ;

  probability_likelihood_relationship == null
    ? probability_likelihood_relationship =
        relationship_records_for_url 
    : probability_likelihood_relationship +=
        relationship_records_for_url;

  probability_likelihood_divorcedWidowed == null
    ? probability_likelihood_divorcedWidowed =
        divorcedWidowed_records_for_url 
    : probability_likelihood_divorcedWidowed +=
        divorcedWidowed_records_for_url;


        
  console.log('probablity_l_single', probability_likelihood_single);
 
}

function computeProbabilityOfLikelihoodIncome(url) {
  var elemForIncome = getElemForIncome(url);

  var low_records_for_url = getLowRecordsForUrl(elemForIncome);
  var medium_records_for_url = getMediumRecordsForUrl(elemForIncome);
  var high_records_for_url = getHighRecordsForUrl(elemForIncome);



  putInArrayLikelihoodIncomeGroup(low_records_for_url / sumLowRecords, medium_records_for_url / sumMediumRecords, high_records_for_url / sumHighRecords,  url);
  

  
  console.log('probability_likelihood_low', probability_likelihood_low)
  console.log('low_records_for_url', low_records_for_url)

  probability_likelihood_low == null
    ? 
    probability_likelihood_low =
        low_records_for_url : 
        probability_likelihood_low +=
        low_records_for_url;

  probability_likelihood_medium == null
    ? probability_likelihood_medium = 
    medium_records_for_url : 
    probability_likelihood_medium += 
      medium_records_for_url;

  probability_likelihood_high == null
    ? probability_likelihood_high = high_records_for_url :
    probability_likelihood_high += 
    high_records_for_url;

    console.log('income_records_for_url', low_records_for_url, url)
    console.log('probability_likelihood_low', probability_likelihood_low, url)
}




chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  const requestAsArray = parseRequestToArray(request);
  const requestString = parseUrlArrayToString(requestAsArray);
  const urlAsString = parseUrl(requestString);

  const testCheckUrlGenderDS = checkUrlInGenderDataset(urlAsString);
  const testCheckUrlMaritalDS = checkUrlInMaritalDataset(urlAsString); 
  const testCheckUrlIncomeDS = checkUrlInIncomeDataset(urlAsString); 

  console.log('testCheckUrlMaritalDS', testCheckUrlGenderDS, testCheckUrlMaritalDS, testCheckUrlIncomeDS)



  if(testCheckUrlGenderDS) {
    
    computeProbabilityOfLikelihoodGender(urlAsString);
  }

  if(testCheckUrlMaritalDS) {
    
    computeProbabilityOfLikelihoodMarital(urlAsString);
    }

  if(testCheckUrlIncomeDS) {
      
      computeProbabilityOfLikelihoodIncome(urlAsString);
      }


  console.log('URL as String', urlAsString)
  
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message = "Opened Popup") {

    naiveBayes();
  


  function naiveBayes() {
  console.log('FEMLAE PRIOR NAIVE BAYES', femalePrior)
  console.log('probability_likelihood_female', probability_likelihood_female)


    teststep = probability_likelihood_female / sumFemaleRecords;
    final_probability_female = teststep * femalePrior; 

    teststep2 = probability_likelihood_male / sumMaleRecords;
    final_probability_male = teststep2 * malePrior;


    final_result_female_male_below = final_probability_female + final_probability_male 
    final_result_female = final_probability_female / final_result_female_male_below 
    final_result_male = final_probability_male / final_result_female_male_below 

      console.log("probability_likelihood_female", probability_likelihood_female)
      console.log("final_probability_female",  final_probability_female );
      console.log("femalePrior", femalePrior);
      console.log("final_result_female", final_result_female)


      console.log("final_result_female_male_below",   final_result_female_male_below);
      console.log("final_result_male = final_probability_male / final_result_female_male_below ", final_result_male = final_probability_male / final_result_female_male_below )
      
  
     
      console.log("singlePrior", singlePrior);
      console.log("relationshipPrior", relationshipPrior);


      teststep_single = probability_likelihood_single / sumSingleRecords;
      teststep_relationship = probability_likelihood_relationship / sumRelationshipRecords;
      teststep_married = probability_likelihood_married / sumMarriedRecords;
      teststep_divorced_widowed = probability_likelihood_divorcedWidowed / sumDivorcedWidowedRecords;

      final_probability_single =  teststep_single * singlePrior;
      final_probability_relationship = teststep_relationship * relationshipPrior;
      final_probability_married = teststep_married * marriedPrior;
      final_probability_divorcedWidowed = teststep_divorced_widowed * divorcedWidowedPrior;
     
      console.log('final_probability_single',final_probability_single)


      final_result_marital_below = final_probability_single + final_probability_relationship  +
      final_probability_married + final_probability_divorcedWidowed;


      final_result_single = final_probability_single / final_result_marital_below
      final_result_married = final_probability_married / final_result_marital_below
      final_result_relationship = final_probability_relationship / final_result_marital_below
      final_result_divorcedWidowed = final_probability_divorcedWidowed / final_result_marital_below
      


    teststep_income_low = probability_likelihood_low / sumLowRecords;
    teststep_income_medium = probability_likelihood_medium / sumMediumRecords;
    teststep_income_high = probability_likelihood_high / sumHighRecords;

      
    final_probability_low = teststep_income_low * lowPrior;
    final_probability_medium = teststep_income_medium * mediumPrior;
    final_probability_high = teststep_income_high * highPrior;
  

      
    final_result_income_below = final_probability_low + final_probability_medium + final_probability_high  
    final_result_low = final_probability_low / final_result_income_below 
    final_result_medium = final_probability_medium / final_result_income_below 
    final_result_high = final_probability_high / final_result_income_below 
    
    console.log('lowPrior', lowPrior)
    console.log('probability_likelihood_low', probability_likelihood_low)
    console.log("final_probability_low",  final_probability_low);
    console.log("final_result_low", final_result_low)

    console.log("probability_likelihood_married", final_probability_married,  final_result_marital_below);





  putInArrayForClassGender(final_result_female,final_result_male);
  putInArrayForClassMaritalStatus(
        final_result_single,
        final_result_married,
        final_result_relationship,
        final_result_divorcedWidowed,
      );

    putInArrayForClassIncomeStatus(
        final_result_low,
        final_result_medium,
        final_result_high,
      );


     // SEND DATA TO POPUP
    
      sendResponse({
        arrayWithFinalValuesGender,
        arrayWithFinalValuesMaritalStatus,
        arrayWithFinalValuesIncome,
        arrayWithFinalLikelihoodGender,
        arrayWithFinalLikelihoodMaritalStatus,
        arrayWithFinalLikelihoodIncomeGroup
      });
   


      console.log('arrayWithFinalValuesGender',arrayWithFinalValuesGender);
      console.log('arrayWithFinalValuesMarital',arrayWithFinalValuesMaritalStatus);
      console.log('arrayWithFinalValuesIncome',arrayWithFinalValuesIncome);
      console.log('arrayWithFinalLikelihoodGender',arrayWithFinalLikelihoodGender);
      console.log('arrayWithFinalLikelihoodMarital',arrayWithFinalLikelihoodMaritalStatus);
      console.log('arrayWithFinalLikelihoodMarital',arrayWithFinalLikelihoodIncomeGroup);
    }
  }

});

function putInArrayForClassGender(
  probability_female,
  probability_male
) {
  arrayWithFinalValuesGender = [
    { gender: "Female", data: probability_female },
    { gender: "Male", data: probability_male }
  ];

  return arrayWithFinalValuesGender;
}

function putInArrayForClassMaritalStatus(
  probability_single,
  probability_married,
  probability_relationship,
  probability_divorcedWidowed,
  url
) {
  arrayWithFinalValuesMaritalStatus = [
    { status: "Single", data: probability_single},
    { status: "Married", data: probability_married},
    { status: "Relationship", data: probability_relationship},
    { status: "Divorced / Widowed", data: probability_divorcedWidowed}
  ];

  return arrayWithFinalValuesMaritalStatus;
}

function putInArrayForClassIncomeStatus(
  probability_income_low,
  probability_income_medium,
  probability_income_high,
) {

  arrayWithFinalValuesIncome = [
    { income: "Low", data: probability_income_low },
    { income: "Medium", data: probability_income_medium },
    { income: "High", data: probability_income_high },

  ];
  return arrayWithFinalValuesIncome;
}
