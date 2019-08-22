function getLogin() {
  return document.getElementById("login").value;
}

function getMail() {
  return document.getElementById("mail").value;
}

function getGenderCode() {
  return document.getElementById("genderCode").value;
}

function getCountryCode() {
  return document.getElementById("countryCode").value;
}

function getLanguageCode() {
  return document.getElementById("languageCode").value;
}

function getPhone() {
  return document.getElementById("phone").value;
}

function getMobile() {
  return document.getElementById("mobile").value;
}

function getTecService() {
  return document.getElementById("tecService").value;
}

function getCgv() {
  return document.getElementById("cgv").checked;
}

function getUserToken() {
  return document.getElementById("UserToken").value;
}

function getSsin() {
  return document.getElementById("ssin").value;
}

function getContextRegistration() {
  return document.getElementById("infotecContext").checked;
}

function getSimulateError() {
  return document.getElementById("simulate").value;
}
function getSsin() {
  return document.getElementById("ssin").value;
}
function getModifyEshopFlag() {
  return document.getElementById("modifyEshop").checked;
}
function getSkipRnLimitsFlag() {
  return document.getElementById("skipRnLimits").checked;
}
  function getEnvironment() {
  return document.getElementById("environment").value;
}
function getPage() {
  return document.getElementById("page").value;
}
function getFullUri() {
  return `${getEnvironment()}${getPage()}`;
}
