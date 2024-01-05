const form = document.forms["birth"];
const day = document.querySelector("input[name='Day']");
const month = document.querySelector("input[name='Month']");
const year = document.querySelector("input[name='Year']");
function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let ageYears = today.getFullYear() - birthDateObj.getFullYear();
  let ageMonths = today.getMonth() - birthDateObj.getMonth();
  let ageDays = today.getDate() - birthDateObj.getDate();
  let spans = document.querySelectorAll(".display span");

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageDays < 0) {
    ageMonths--;
    const monthDays = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    ageDays += monthDays;
  }
  spans[0].textContent = ageYears;
  spans[1].textContent = ageMonths;
  spans[2].textContent = ageDays;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  function isRequired(value) {
    if (value == "") {
      return false;
    } else {
      return true;
    }
  }
  function chlength(length, max, min) {
    if (length >= min && length <= max) {
      return true;
    } else {
      return false;
    }
  }
  function showError(input, messeg) {
    const parent = input.parentElement;
    parent.classList.add("error");
    const small = parent.querySelector("small");
    small.textContent = messeg;
  }
  function seccses(input) {
    const parent = input.parentElement;
    parent.classList.remove("error");
    const small = parent.querySelector("small");
    small.innerHTML = " ";
  }
  //all validation
  function allinone() {
    function dayCheck() {
      const dvalue = day.value;
      const max = 31;
      const min = 1;
      if (!isRequired(dvalue)) {
        showError(day, "This Filed is Required");
      } else if (!chlength(dvalue, max, min)) {
        showError(day, `The Day must be valid day`);
      } else {
        seccses(day);
        return true;
      }
    }
    function monthCheck() {
      const mvalue = month.value;
      const max = 12;
      const min = 1;
      if (!isRequired(mvalue)) {
        showError(month, "This Filed is Required");
      } else if (!chlength(mvalue, max, min)) {
        showError(month, `The Month must be valid Month`);
      } else {
        seccses(month);
        return true;
      }
    }
    function yearCheck() {
      const yvalue = year.value;
      const date = new Date();
      const max = date.getFullYear();
      const min = max - 164;
      if (!isRequired(yvalue)) {
        showError(year, "This Filed is Required");
      } else if (!chlength(yvalue, max, min)) {
        showError(year, `The Year must be valid Year`);
      } else {
        seccses(year);
        return true;
      }
    }
    yearCheck();
    monthCheck();
    dayCheck();
    if (yearCheck() && monthCheck() && dayCheck()) {
      const birthDay = `${year.value}-${month.value}-${day.value}`.toString();
      calculateAge(birthDay);
    } else {
      let spans = document.querySelectorAll(".display span");
      spans[0].textContent = "--";
      spans[1].textContent = "--";
      spans[2].textContent = "--";
    }
  }
  allinone();
});
