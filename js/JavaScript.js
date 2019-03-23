function sendRequest() {
  setSsoCookie();
  var url = document.getElementById("url").value;
  document.write("Redirecting to " + url + " in 2 seconds...");
  /*setTimeout(function() {
    window.location = url;
  }, 2000);*/
}

function setSsoCookie() {
  var userToken = document.getElementById("userToken").value;
  var cookieKey = encodeURIComponent("usertoken") + "=";
  var expiredOn = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  var cookieSuffix = expiredOn;
  var domain = ";domain=etude.tr";
  cookieSuffix += domain;
  if (userToken) {
    document.cookie = cookieKey + userToken + cookieSuffix;
  } else {
    document.cookie =
      cookieKey + "b45a2b0774394b48922994f6f8e6180e" + cookieSuffix;
  }
  console.log(document.cookie);
}

function hideFullUrl(hide) {
  document.getElementById("fullUrlSection").hidden = hide;
  document.getElementById("baseUrlFas-section").hidden = hide;
  document.getElementById("baseUrl-section").hidden = !hide;
}

function setUrl(value, isSimulation = true) {
  if (isSimulation) {
    document.getElementById("url").value =
      document.getElementById("baseUrl").value + "?simulate=" + value;
  } else {
    document.getElementById("url").value = document.getElementById(
      "baseUrl"
    ).value;
  }
  hideFullUrl(true);
}

function getLogin(){
	return document.getElementById("login").value;
}

function getMail(){
	return document.getElementById("mail").value;
}

function getGenderCode(){
	return document.getElementById("genderCode").value;
}

function getCountryCode(){
	return document.getElementById("countryCode").value;
}

function getLanguageCode(){
	return document.getElementById("languageCode").value;
}

function getPhone(){
	return document.getElementById("phone").value;
}

function getMobile(){
	return document.getElementById("mobile").value;
}

function getTecService(){
	return document.getElementById("tecService").value;
}

function getCgv(){
	return document.getElementById("cgv").checked;
}

function getUserToken(){
	return document.getElementById("userToken").value;
}

function getSsin(){
	return document.getElementById("ssinAtlasKo").value;
}

function setUrlWithUserData() {
  var login = getLogin()
  var mail = getMail()
  var genderCode = getGenderCode()
  var countryCode = getCountryCode()
  var languageCode = getLanguageCode()
  var phone = getPhone()
  var tecService = getTecService()
  var cgv = getCgv()
  var userToken = getUserToken()
  var ssin = getSsin()
  var resultUrl =
    document.getElementById("baseUrlFas").value +
    "?login=" +
    login +
    "&mail=" +
    mail +
    "&genderCode=" +
    genderCode +
    "&countryCode=" +
    countryCode +
    "&languageCode=" +
    languageCode +
    "&phone=" +
    phone +
    "&tecService=" +
    tecService +
    "&cgv=" +
    cgv +
    "&ssoToken=" +
    userToken +
    "&ssin=" +
    ssin;
  document.getElementById("url").value = resultUrl;
  document.getElementById("fullUrlViewer").value = resultUrl;
  hideFullUrl(false);
}

function appendSsin(ssinFieldId) {
  console.log("ssinFieldId" + ssinFieldId);
  var hasQuerystring = document.getElementById("url").value.split("?")[1];
  var separator = "?";
  if (hasQuerystring) {
    separator = "&";
    var hasMoreThanOneQuerystring = hasQuerystring.split("&")[1];
    if (hasMoreThanOneQuerystring) {
      document.getElementById("url").value =
        document
          .getElementById("url")
          .value.substring(
            0,
            document.getElementById("url").value.lastIndexOf("ssin")
          ) +
        "ssin=" +
        document.getElementById(ssinFieldId).value;
    } else {
      document.getElementById("url").value +=
        separator + "ssin=" + document.getElementById(ssinFieldId).value;
    }
  } else {
    document.getElementById("url").value +=
      separator + "ssin=" + document.getElementById(ssinFieldId).value;
  }
}

function toggleSections(value) {
  var koSections = document.querySelectorAll('[id$="-ko-section"]');
  koSections.forEach(function(koSection) {
    koSection.hidden = true;
  });
  var section = document.getElementById(value + "-section");
  section.hidden = false;
}

function replicateUrl(baseUrl) {
  document.getElementById("url").value =
    baseUrl + "?" + document.getElementById("url").value.split("?")[1];
  document.getElementById("fullUrlViewer").value =
    baseUrl +
    "?" +
    document.getElementById("fullUrlViewer").value.split("?")[1];
}

window.addEventListener("load", function(event) {
  setError(event);
  setSsoCookie();
});

function setError(e) {
  // the query string result pattern is ?error_atlas={errorValue}
  var error = e.target.baseURI.split("?")[1];
  if (!error) return;
  var errorValue = error.split("=")[1];
  if (!errorValue) return;
  var radioElement = document.getElementById(errorValue);
  if (!radioElement) return;
  radioElement.checked = true;
  setUrl(radioElement.value);
  var closestSection = radioElement.closest("section");
  if (!closestSection) return;
  if (closestSection.id === "bcde-ko-section") {
    appendSsin("ssin");
  }
  var selectedSectionId = closestSection.id.replace("-section", "");
  toggleSections(selectedSectionId);
  var switchElement = document.getElementById(selectedSectionId);
  if (!switchElement) return;
  switchElement.checked = true;
}

function setUrlFromContext(value) {
  var section = document.getElementById(value + "-section");
  var options = section.querySelectorAll('input[type="radio"]');
  options.forEach(function(option) {
    if (option.checked) {
      option.click();
    }
  });
}

function getContextRegistration(){
	return document.getElementById("infotecContext").checked;
}

var postDatabtn = document.querySelector("#postdata");
if (postDatabtn != undefined) {
  postDatabtn.addEventListener("click", event => {
    var viewModel = {
      "IsContextRegistration": getContextRegistration(),
      "LoginWeb": getLogin(),
      "Email": getMail(),
      "CivilityCode": getGenderCode(),
      "CountryCode": getCountryCode(),
      "LanguageCode": getLanguageCode(),
      "LandlinePhoneNumber": getPhone(),
      "MobileNumberNumber": getMobile(),
      "CustomerServiceCode": getTecService(),
      "AcceptedTermsOfSales": getCgv()
    };
    console.log("view model", viewModel);
    var url = document.getElementById("baseUrlFas").value;
    console.log("URL", url);
    var params = {
      method: "POST",
      "content-type": "application/json",
      body: JSON.stringify(viewModel)
    };
    
    const request = new Request(url, params);
    fetch(request, params)
      .then(response => {
        if (response.ok) {
          const jsonData = response.json();
          console.log(jsonData);
          return jsonData;
        }
        console.log("Fetch failed response", response);
      })
      .then(data => {
        console.log("FAS Request Url", data);
        window.location = data.RedirectionUrl;
      })
      .catch(err => {
        console.log("Error", err);
      });
  });
}
