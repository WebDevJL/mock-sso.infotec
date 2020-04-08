function processPostReponse(data) {
	if (data && !data.RedirectionUrl) {
		alert("Error is: " + data.ErrorCode);
		return;
	}
	
	var simulateChangeInRedirectUrl = getModifyEshopFlag();
	console.log("FAS Request Url", data);
	if (simulateChangeInRedirectUrl) {
		data.RedirectionUrl = `${data.RedirectionUrl}+hackstring`;
	}
	var redirectionUrl = data.RedirectionUrl.toLowerCase().indexOf("infotec") > 0 ?
		`${data.RedirectionUrl}&ssotoken=${getUserToken()}` :
		data.RedirectionUrl;
	if (redirectionUrl.toLowerCase().indexOf("&") > 0 && redirectionUrl.toLowerCase().indexOf("?") == -1) {
		redirectionUrl = redirectionUrl.replace("&", "?");
	}
	window.location = redirectionUrl;
}


var currentUrl = document.location.href;
console.log("currentUrl", currentUrl);
console.log("currentUrl", currentUrl);
var postDatabtn = document.querySelector("#postdata");
if (postDatabtn != undefined) {
  postDatabtn.addEventListener("click", event => {
    var viewModel = {
      IsContextRegistration: getContextRegistration(),
      LoginWeb: getLogin(),
      Email: getMail(),
      CivilityCode: getGenderCode(),
      CountryCode: getCountryCode(),
      LanguageCode: getLanguageCode(),
      LandlinePhoneNumber: getPhone(),
      MobilePhoneNumber: getMobile(),
      CustomerServiceCode: getTecService(),
      AcceptedTermsOfSales: getCgv(),
      Ssin: getSsin(),
      SimulateError: getSimulateError(),
      SkipRnCallLimitation: getSkipRnLimitsFlag()
    };
    console.log("view model", viewModel);
    var url = getFullUri();
    console.log("URL", url);
	url = `${url}?ssotoken=${getUserToken()}`
    if (url === "" || url.indexOf("http") === -1) {
      var errorMessage = "Please a base url and a page";
      alert("Please a base url and a page");
      throw new Error(errorMessage);
    }
    var params = {
      method: 'POST',
      'content-type': 'application/json',
      body: JSON.stringify(viewModel),
      redirect: 'follow'
    };

    const request = new Request(url, params);
    fetch(request, params)
      .then(response => {
        console.log("Fetch response", response)
		if (response.redirected) {
		  alert("what is the redirection?");
		  window.location = response.url;
		}
        if (response.ok) {
          const jsonData = response.json();
          console.log(jsonData);
          return jsonData;
        }
        console.log("Fetch failed response", response);
      })
      .then(data => {
        processPostReponse(data);
      })
      .catch(err => {
	    alert("Check console");
        console.log("Error", err);
      });
  });
}
