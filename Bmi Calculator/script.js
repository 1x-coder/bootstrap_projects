
// -----------variables--------------

const metInput = document.getElementById('metric__input');
const impInput = document.getElementById('imperial__input');
const metRadio = document.getElementById('metric__radio');
const impRadio = document.getElementById('imperial__radio');
const cmInput= document.getElementById('cm__input');
const kgInput= document.getElementById('kg__input');
const ftInput= document.getElementById('ft__input');
const inInput= document.getElementById('in__input');
const stInput= document.getElementById('st__input');
const lbsInput= document.getElementById('lbs__input');
const allForms = document.querySelectorAll('.form-control');
let measurementType;
let cmUser;
let kgUser;
let ftUser;
let inUser;
let stUser;
let lbsUser;
let heightInMeters = cmUser/100;
let bmi;
let metricResult = document.getElementById('metric__result');
let imperialResult = document.getElementById('imperial__result');
let classification;
const recommendation = document.getElementById('recommendation');
const recRangeMetric = document.getElementById('rec__range__metric');
const recRangeImperial = document.getElementById('rec__range__imperial');
const resultsSection = document.getElementById('results__section');
const welcomeSection = document.getElementById('welcome__section');



//---------------functions--------------

const handleRadioChange = () => {
    clearTextInputs()
    resultsDisplayOff();

  if (metRadio.checked) {
    metInput.style.display = 'block';
    impInput.style.display = 'none';
    metricResult.style.display = 'inline';
    imperialResult.style.display = 'none';
    recRangeMetric.style.display = 'inline';
    recRangeImperial.style.display = 'none';
    measurementType = 'metric';
  } else {
    metInput.style.display = 'none';
    impInput.style.display = 'block';
    metricResult.style.display = 'none';
    imperialResult.style.display = 'inline';
    recRangeMetric.style.display = 'none';
    recRangeImperial.style.display = 'inline';
    measurementType = 'imperial';
  }
}

const clearTextInputs = () => {
    allForms.forEach((input) => {
      input.value = '';
    });
  }

const calculateBMIMetric = () => {
    return kgUser/(cmUser*100)**2
}

const calculateBMIImperial = () => {
    
}

const calcHeightInInches = () => {
    return (ftUser * 12) + inUser;
}

const calcWeightInLbs = () => {
    return (stUser * 14) + lbsUser;
}

const classifyBMI = (bmi) => {
    if (bmi < 18.5) {
        classification = 'underweight.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        classification = 'normal weight.';
    } else if (bmi >= 25 && bmi <= 29.9) {
        classification = 'overweight.';
    } else if (bmi > 30) {
        classification = 'obese.'
    }
}

const calculateHealthyWeightRangeCm = (height) => {
    const lowerBMI = 18.5;
    const upperBMI = 24.9;
    let heightInMeters = height / 100; // Convert cm height to meters
    const lowerWeight = lowerBMI * Math.pow(heightInMeters, 2);
    const upperWeight = upperBMI * Math.pow(heightInMeters, 2);
    return {
      lower: lowerWeight.toFixed(1),
      upper: upperWeight.toFixed(1)
    };
  };

  const calculateHealthyWeightRangeIn = (feet, inches) => {
    const lowerBMI = 18.5;
    const upperBMI = 24.9;
    const heightInMeters = ((feet * 12) + inches) * 0.0254; // Convert inches height to meters
    let lowerWeight = lowerBMI * Math.pow(heightInMeters, 2);
    let upperWeight = upperBMI * Math.pow(heightInMeters, 2);
    lowerWeight = lowerWeight * 2.20463;
    upperWeight = upperWeight * 2.20463;
    return {
      lower: lowerWeight.toFixed(1),
      upper: upperWeight.toFixed(1)
    };
  };

const resultsDisplayOn = () => {
    resultsSection.style.display = 'block';
    welcomeSection.style.display = 'none';
}

const resultsDisplayOff = () => {
    resultsSection.style.display = 'none';
    welcomeSection.style.display = 'block';
}


  
//------------------execution ------------------------

handleRadioChange();
metRadio.addEventListener('click', handleRadioChange);
impRadio.addEventListener('click', handleRadioChange);

//event listener on each input form
allForms.forEach((input) => {
    input.addEventListener('input', (event) => {
        let input = parseInt(event.target.value);
        let inputId = event.target.id;

        //assign corresponding variables & inputs
        if (inputId === 'cm__input') {  
            cmUser = input;  
        } else if (inputId === 'kg__input') {  
            kgUser = input;
        } else if (inputId === 'ft__input') {
            ftUser = input;  
        } else if (inputId === 'in__input') {
            inUser = input; 
        } else if (inputId === 'st__input') {
            stUser = input;
        } else if (inputId === 'lbs__input') {
            lbsUser = input;
        }

        //metric calculations
        if (measurementType === 'metric') {
            bmi = (kgUser / (cmUser/100)**2).toFixed(1);
            metricResult.innerText = bmi

            //only display when all fields are filled with something
            if (!kgInput.value || !cmInput.value) {
                resultsDisplayOff();
            } else {
                resultsDisplayOn();
            }

            //imperial calculations
        } else if (measurementType === 'imperial') {
            let height = calcHeightInInches();
            let weight = calcWeightInLbs();
            bmi = ((weight / (height)**2) * 720).toFixed(1);
            imperialResult.innerText = bmi

            //only display when all fields are filled with something
            if (!ftInput.value || !inInput.value || !stInput.value || !lbsInput.value) {
                resultsDisplayOff();
            } else {
                resultsDisplayOn();
            }
        }

        //only display if input is positive number
        if (input < 0 || isNaN(input)) {
            resultsDisplayOff();
          }

        //bmi classification
        classifyBMI(bmi);
        recommendation.innerText = classification;

        //update recommended weight ranges depending on height entered. 
        recRangeMetric.innerText = `${calculateHealthyWeightRangeCm(cmUser).lower} kg and ${calculateHealthyWeightRangeCm(cmUser).upper} kg`;

        recRangeImperial.innerText = `${calculateHealthyWeightRangeIn(ftUser,inUser).lower} lbs and ${calculateHealthyWeightRangeIn(ftUser,inUser).upper} lbs`;
    })
})



 













  