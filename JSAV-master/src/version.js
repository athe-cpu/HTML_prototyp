/**
* Version support
* Depends on core.js
*/
(function() {
  if (typeof JSAV === "undefined") { return; }
  var theVERSION = "";

  JSAV.version = function() {
    return theVERSION;
  };
})();
