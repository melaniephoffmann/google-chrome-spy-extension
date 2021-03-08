function getMax(prev, current) {
    return (prev.data > current.data) ? prev : current
}

function getClassGender(prev, current) {
    return (prev.data = current_prediction_class_gender) ? prev : current
}

function getClassMarital(prev, current) {
    return (prev.data = current_prediction_class_marital) ? prev : current
}

function getClassIncome(prev, current) {
    return (prev.data = current_prediction_class_income) ? prev : current
}


Number.prototype.percentage = function() {
    return (this.valueOf() * 100).toFixed(2).toString() + "%"
}

function checkPredictionShowStatus(el) {
    if (el.checked) {
        document.querySelector(".prediction .prediction-"+el.id).style.display = "inline-block";
    } else {
        document.querySelector(".prediction .prediction-"+el.id).style.display = "none";
    }
}


var predictions = ["gender", "marital", "income", "likelihood_gender", "likelihood_marital_status", "likelihood_income_group"];

var current_prediction_class_gender;
var current_prediction_class_marital;
var current_prediction_class_income;


chrome.storage.local.get(predictions, function(result) {
    for (prediction of predictions) {
        el_prediction = document.getElementById(prediction);

        el_prediction.checked = result[prediction] === undefined || null ? true : result[prediction];

        el_prediction.addEventListener("change", function() {
            chrome.storage.local.set({ [this.id]: this.checked }, () => {
                checkPredictionShowStatus(this);
            });
        });
    }

    chrome.runtime.sendMessage({ message: "Opened Popup" }, function(data) {
        var arrayWithFinalValuesGender        = data.arrayWithFinalValuesGender;
        var arrayWithFinalValuesMaritalStatus = data.arrayWithFinalValuesMaritalStatus;
        var arrayWithFinalValuesIncome        = data.arrayWithFinalValuesIncome;

        var arrayWithFinalLikelihoodGender        = data.arrayWithFinalLikelihoodGender;
        var arrayWithFinalLikelihoodMaritalStatus       = data.arrayWithFinalLikelihoodMaritalStatus;
        var arrayWithFinalLikelihoodIncomeGroup = data.arrayWithFinalLikelihoodIncomeGroup;
    
        var highest_gender         = arrayWithFinalValuesGender.reduce(getMax);
        var highest_marital_status = arrayWithFinalValuesMaritalStatus.reduce(getMax);
        var highest_income         = arrayWithFinalValuesIncome.reduce(getMax);        


        current_prediction_class_gender = highest_gender.gender;
        current_prediction_class_marital = highest_marital_status.status;
        current_prediction_class_income = highest_income.income;

        
        var highest_likelihood_gender  = arrayWithFinalLikelihoodGender.reduce(getClassGender);
        var highest_likelihood_marital_status = arrayWithFinalLikelihoodMaritalStatus.reduce(getClassMarital);
        var highest_likelihood_income_group = arrayWithFinalLikelihoodIncomeGroup.reduce(getClassIncome);
        
        console.log('???', arrayWithFinalLikelihoodMaritalStatus)
        document.querySelector(".prediction").innerHTML = `
        <span class="badge rounded-pill bg-primary prediction-gender">${highest_gender.gender}: ${highest_gender.data.percentage()}</span>
        <span class="badge rounded-pill bg-primary prediction-marital">${highest_marital_status.status}: ${highest_marital_status.data.percentage()}</span>
        <span class="badge rounded-pill bg-primary prediction-income">${highest_income.income}: ${highest_income.data.percentage()}</span>
        <span class="badge rounded-pill bg-primary prediction-likelihood_gender">${highest_likelihood_gender.data}: ${highest_likelihood_gender.url}</span>
        <span class="badge rounded-pill bg-primary prediction-likelihood_marital_status">${highest_likelihood_marital_status.data}: ${highest_likelihood_marital_status.url}</span>
        <span class="badge rounded-pill bg-primary prediction-likelihood_income_group">${highest_likelihood_income_group.data}: ${highest_likelihood_income_group.url} </span>   
        `;

        for (prediction of predictions) {
            checkPredictionShowStatus(document.getElementById(prediction));
        }

    });

});