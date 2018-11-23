function sendRequest() {
  var url = document.getElementById("url").value
  document.write("Redirecting to the url in 2 seconds...")
  setTimeout(function() {
    window.location = url
  }, 2000)
}

function setUrl(value) {
  document.getElementById("url").value =
    document.getElementById("baseUrl").value + "?simulate=" + value
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
	document.getElementById("url").value = baseUrl + "?" + document.getElementById("url").value.split('?')[1]
}