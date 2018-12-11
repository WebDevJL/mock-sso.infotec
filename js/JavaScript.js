function sendRequest() {
  setSsoCookie()
  var url = document.getElementById("url").value
  document.write("Redirecting to the url in 2 seconds...")
  setTimeout(function() {
    window.location = url
  }, 2000)
}

function setSsoCookie(){
  var userToken = document.getElementById("userToken").value
  var cookieKey = encodeURIComponent("ssotoken") + "="
  var expiredOn = "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
  var cookieSuffix = expiredOn
  var domain = ";domain=etude.tr"
  cookieSuffix += domain
  if(userToken){
	document.cookie = cookieKey + userToken + cookieSuffix
  }
  else{
	  document.cookie = cookieKey + "b45a2b0774394b48922994f6f8e6180e" + cookieSuffix
  }
  console.log(document.cookie)	
}

function hideFullUrl(hide){
	document.getElementById("fullUrlSection").hidden = hide
	document.getElementById("baseUrlFas-section").hidden = hide
	document.getElementById("baseUrl-section").hidden = !hide
}

function setUrl(value) {
  document.getElementById("url").value =
    document.getElementById("baseUrl").value + "?simulate=" + value
  hideFullUrl(true)
}

function setUrlWithUserData() {
 var login = document.getElementById("login").value
 var mail = document.getElementById("mail").value
 var genderCode = document.getElementById("genderCode").value
 var countryCode = document.getElementById("countryCode").value
 var languageCode = document.getElementById("languageCode").value
 var phone = document.getElementById("phone").value
 var tecService = document.getElementById("tecService").value
 var cgv = document.getElementById("cgv").checked
 var userToken = document.getElementById("userToken").value
 var resultUrl = document.getElementById("baseUrlFas").value +
	"?login=" + login +
	"&mail=" + mail + 
	"&genderCode=" + genderCode +
	"&countryCode=" + countryCode + 
	"&languageCode=" + languageCode +
	"&phone=" + phone +
	"&tecService=" + tecService + 
	"&cgv=" + cgv
	"&ssoToken=" + userToken
  document.getElementById("url").value = resultUrl
  document.getElementById("fullUrlViewer").value = resultUrl 
  hideFullUrl(false)
}

function appendSsin(){
	var hasQuerystring = document.getElementById("url").value.split('?')[1]
	var separator = "?"
	if(hasQuerystring){
		separator = "&"
		var hasMoreThanOneQuerystring = hasQuerystring.split('&')[1]
		if(hasMoreThanOneQuerystring){
			document.getElementById("url").value = 
				document.getElementById("url").value.substring(0, document.getElementById("url").value.lastIndexOf("ssin")) + 
				"ssin=" + document.getElementById("ssin").value
		}
		else{
			document.getElementById("url").value +=  separator + "ssin=" +  document.getElementById("ssin").value
		}
	}
	else{
		document.getElementById("url").value +=  separator + "ssin=" +  document.getElementById("ssin").value
	}
}

function toggleSections(value) {
	var koSections = document.querySelectorAll('[id$="-ko-section"]')
	koSections.forEach(function(koSection) {
		koSection.hidden = true
	})
	var section = document.getElementById(value + "-section")
	section.hidden = false
}

function replicateUrl(baseUrl){
	document.getElementById("url").value = 
		baseUrl + "?" + document.getElementById("url").value.split('?')[1]
	document.getElementById("fullUrlViewer").value = 
		baseUrl + "?" + document.getElementById("fullUrlViewer").value.split('?')[1]
}

window.addEventListener("load", function(event) {
	setError(event)
	setSsoCookie()
  })
  
function setError(e){
  var error = e.target.baseURI.split('?')[1]
  if(!error) return
  var errorValue = error.split('=')[1]
  if(!errorValue) return
  var radioElement = document.getElementById(errorValue)
  if(!radioElement) return
  radioElement.checked = true
  var closestSection = radioElement.closest("section")
  if(!closestSection) return
  var selectedSectionId = closestSection.id.replace('-section','')
  toggleSections(selectedSectionId)
  var switchElement = document.getElementById(selectedSectionId)
  if(!switchElement) return
  switchElement.checked = true
}