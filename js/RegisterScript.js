function toggleSections(value) {
  var koSections = document.querySelectorAll('[id$="-section"]')
  koSections.forEach(function(koSection) {
    koSection.hidden = true
  })
  var section = document.getElementById(value + "-section")
  section.hidden = false
}

function handleError(e) {
  // the query string result pattern is ?error={errorValue} where errorValue could be either 'fas' or 'age'
  var error = e.target.baseURI.split("?")[1]
  if (!error) toggleSections('ok')
  var errorValue = error.split("=")[1]
  if (!errorValue) return
  toggleSections(errorValue)
}

function readMe(mimi) {
  var miaou = 'Miaou!!! '
  if (mimi) miaou += mimi
  alert(miaou)
}

window.addEventListener("load", function(event) {
  handleError(event)
  readMe()
});
