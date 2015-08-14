(function() {
  var playerStatus = {
    playerEnergy: 100,
    playerSteps: 0
  };

  var status = document.getElementById("status");
  for(key in playerStatus) {
    status.innerHTML = status.innerHTML + "<div>" + key + ": " + playerStatus[key] + "</div>";

  }

})();
