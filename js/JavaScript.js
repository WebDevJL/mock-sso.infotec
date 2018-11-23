function sendRequest() {
  var url = document.getElementById("url").value;
  document.write("Redirecting to the url in 3 seconds...");
  setTimeout(function() {
    window.location = url;
  }, 3000);
}

function setUrl(value) {
  document.getElementById("url").value =
    document.getElementById("baseUrl").value + "?simulate=" + value;
}
