(function() {
  var playerStatus = {
    playerEnergy: 100,
    playerSteps: 0
  };
  //grabs the status div
  var status = document.getElementById("status");
  //fills in the box on the right side of the page with any key/value pair from
  //the playerStatus struct-obj.
  for(key in playerStatus) {
    status.innerHTML = status.innerHTML + "<div>" + key + ": " + playerStatus[key] + "</div>";
  }
})();
