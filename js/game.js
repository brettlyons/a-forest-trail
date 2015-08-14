(function() {
  var playerStatus = {
    playerEnergy: 100,
    steps: 0
  };
  //grabs the status div
  var status = document.getElementById("status");
  var leftDiv = document.getElementById("left");
  //fills in the box on the right side of the page with any key/value pair from
  //the playerStatus struct-obj.
  //updateStatus resets the status
  function updateStatus () {
    status.innerHTML = ''; // replace status.innerHTML, don't add to it;
    for(key in playerStatus) {
      status.innerHTML = status.innerHTML + "<div>" + key + ": " + playerStatus[key] + "</div>";
    }
  };
  // this runs updateStatus(); every 17 ms or approx. 59 frames per second
  setInterval( function () {
    updateStatus();
   }, 16); //16.6 ms is 60 fps via dimensional analysis.
  var walkButton = document.getElementById('walkTrailButton');
  walkButton.removeAttribute("disabled", "true");
  walkButton.addEventListener('click',
      function () { // on click, the walk button ...
        leftDiv.innerHTML = leftDiv.innerHTML
          + "You continue down the path."
          + "<p>";  // ... prints to the left div...
        walkButton.setAttribute("disabled", "true"); // ...is disabled...
        playerStatus.steps += 1; // ...updates global state ...
        setTimeout( function () {
          walkButton.removeAttribute("disabled");
        }, 3000) // <-- and is re-enabled after 3 secs.
      });
})();
