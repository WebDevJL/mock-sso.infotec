function setSsoCookie() {
  var userToken = document.getElementById("UserToken").value;
  var cookieKey = encodeURIComponent("Usertoken") + "=";
  var expiredOn = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  var cookieSuffix = expiredOn;
  var domain = ";domain=.etude.tr";
  cookieSuffix += domain;
  if (userToken) {
    document.cookie = cookieKey + userToken + cookieSuffix;
  } else {
    document.cookie =
      cookieKey + "b45a2b0774394b48922994f6f8e6180e" + cookieSuffix;
  }
  console.log(document.cookie);
}