function handleError(e) {
  // the query string result pattern is ?error={errorValue} where errorValue could be either 'fas' or 'age'
  var error = e.target.baseURI.split("?")[1];
  var errorValue = error.split("=")[1];
  if (!errorValue) return;
}

function readMe(mimi) {
  var miaou = "Miaou!!! ";
  if (mimi) miaou += mimi;
  alert(miaou);
}

window.addEventListener("load", function(event) {
  handleError(event);
  readMe();
});
