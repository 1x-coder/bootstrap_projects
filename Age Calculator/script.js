//Form element
const form = document.querySelector("form");

//Day, Month and Year Input field
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
// Day, month and Year error Field
const errorDay = document.querySelector(".day-error");
const errorMonth = document.querySelector(".month-error");
const errorYear = document.querySelector(".year-error");

//Day,Month and Year output
const yearOutput = document.querySelector(".year");
const monthOutput = document.querySelector(".month");
const daysOutput = document.querySelector(".days");

// to Check the valid date
dayInput.addEventListener("input", (e) => {
  if (+dayInput.value > 31 || +dayInput.value === 0) {
    errorDay.innerText = "Must be a valid Day";
    return false;
  } else {
    errorDay.innerText = " ";
  }
});

// to Check the valid Month
monthInput.addEventListener("input", (e) => {
  if (+monthInput.value > 12 || +monthInput.value === 0) {
    errorMonth.innerText = "Must be a valid Month";
    return false;
  } else {
    errorMonth.innerText = " ";
  }
});

// to Check the valid Year
yearInput.addEventListener("input", (e) => {
  if (+yearInput.value > new Date().getFullYear() || +yearInput.value === 0) {
    errorYear.innerText = "Must be a valid Year";
    return false;
  } else {
    errorYear.innerText = " ";
  }
});

// to check required input field filled
function checkInputs() {
  const inputs = document.querySelectorAll("input");
  // Labels Element in array form
  const labels = [].slice.call(document.querySelectorAll("label"));

  let hasError = false;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const Parent = input.parentElement;

    if (!input.value) {
      hasError = true;
      labels[i].classList.add("error");
      Parent.querySelector("small").innerText = "This Field is required";
    } else {
      const error = input.parentElement.querySelector(".error");
      if (error) {
        hasError = false;
        labels[i].classList.remove("error");
        Parent.querySelector("small").innerText = " ";
      }
    }
  }
  return hasError;
}

//get maxdays in a month;
function getMaxDays(month, year) {
  const date = new Date(year, month, 0);
  return date.getDate();
}

// Get age as on today
function getAge() {
  //User entered value of day,month and year
  let month = parseInt(monthInput.value);
  let year = parseInt(yearInput.value);
  let day = parseInt(dayInput.value);

  // Fulldate of Today and birthdate
  let today = new Date();
  let birthDate = new Date(year, month - 1, day);

  // Year  of Today and birthdate
  let birthYear = birthDate.getFullYear();
  let todayYear = today.getFullYear();

  // Month  of Today and birthdate
  let birthMonth = birthDate.getMonth() + 1;
  let todayMonth = today.getMonth() + 1;
  //date of today and birthdate
  let bithDate = birthDate.getDate();
  let todayDate = today.getDate();
  const maxDays = getMaxDays(month, year);

  if (birthDate > today) {
    alert("The Date of Birth can not be in the future");
    return;
  }

  if (day > maxDays) {
    errorDay.innerHTML = "Must be a valid date";
    return;
  }

  if (todayDate < bithDate) {
    todayDate = todayDate + getMaxDays(birthMonth, birthYear);
    todayMonth--;
  }

  if (todayMonth < birthMonth) {
    todayMonth += 12;
    todayYear--;
  }

  //Difference in Date, Month and Year
  let diffInDay = todayDate - bithDate;
  let diffInMonth = todayMonth - birthMonth;
  let diffInYear = todayYear - birthYear;

  //Display Value in output Field
  yearOutput.innerHTML = diffInYear;
  monthOutput.innerHTML = diffInMonth;
  daysOutput.innerHTML = diffInDay;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!checkInputs()) {
    getAge();
  }
});