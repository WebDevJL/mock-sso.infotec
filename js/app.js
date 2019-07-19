function sendRequest() {
  setSsoCookie();
  var url = document.getElementById("url").value;
  document.write("Redirecting to " + url + " in 2 seconds...");
  /*setTimeout(function() {
    window.location = url;
  }, 2000);*/
}

function setUrl(value, isSimulation = true) {
  if (isSimulation) {
    document.getElementById("url").value =
      document.getElementById("baseUrlFas").value + "?simulate=" + value;
  } else {
    document.getElementById("url").value = document.getElementById(
      "baseUrlFas"
    ).value;
  }
}


window.addEventListener("load", function(event) {
  console.log("event", event);
  setSsoCookie();
});


