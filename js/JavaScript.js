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
	document.getElementById("url").value = 
		baseUrl + "?" + document.getElementById("url").value.split('?')[1]
}

window.addEventListener("load", function(event) {
	setError(event)
  })
  
function setError(e){
  var error = e.target.baseURI.split('?')[1]
  if(!error) return
  var errorValue = error.split('=')[1]
  if(!errorValue) return
  var radioElement = document.getElementById(errorValue)
  if(!radioElement) return
  radioElement.checked = true
  var elementSection = radioElement.closest("section")
  if(!elementSection) return
  var selectedSectionId = elementSection.id.replace('-section','')
  toggleSections(selectedSectionId)
  var switchElement = document.getElementById(selectedSectionId)
  if(!switchElement) return
  switchElement.checked = true
}