(function() {
  //  getting handles to various DOM elements.
  var leftDiv = document.getElementById("left");
  var midDiv = document.getElementById("middle");
  var status = document.getElementById("status");
  var walkButton = document.getElementById('walkTrailButton');
  var berriesButton;
  var playerStatus = {
    energy: 100,
    steps: 0
  };
  //grabs the status div
  //fills in the box on the right side of the page with any key/value pair from
  //the playerStatus struct-obj.
  //updateDom resets the status
  function updateDom () {
    status.innerHTML = ''; // replace status.innerHTML, don't add to it;
    for(key in playerStatus) {
      status.innerHTML = status.innerHTML + "<div>" + key + ": " + playerStatus[key] + "</div>";
    }
  };
  // this runs updateDom(); every 16 ms or approx. 61 frames per second
  setInterval( function () {
    updateDom();
   }, 16); //16.6 ms is 60 fps via dimensional analysis.


  // makes stuff happen when the walkButton is clicked.
  walkButton.addEventListener('click',
      function () { // on click, the walk button ...
        leftDiv.innerHTML = leftDiv.innerHTML
          + "You continue down the path."
          + "<p>";  // ... prints to the left div...
        walkButton.setAttribute("disabled", "true"); // ...is disabled...
        playerStatus.steps += 1; // ...updates global state ...
        playerStatus.energy -= Number(Math.random() * 10).toFixed(0);
        setTimeout( function () {
          walkButton.removeAttribute("disabled");
        }, 300) // <-- and is re-enabled after 3 secs. //DEBUG CHANGED TO 300ms FOR TESTING
        if ( playerStatus.steps % 10 === 0 && playerStatus.steps != 0 ) {
          var berriesButton = createButton (
              'pick-berries', "middle", "pick berries" );
          //for berry eating.
          function eatBerries() {
              var eatBerriesButton = createButton("eat-berries",
                  "middle", "eat berries?");
              eatBerriesButton.addEventListener('click', function() {
                playerStatus.berries -= 1;
                playerStatus.energy += 2;
                midDiv.removeChild(eatBerriesButton);
                leftDiv.innerHTML = leftDiv.innerHTML
                  + "You eat berries.";
              })
          };
          // eatBerries check every 10s.  Buttons addin' up. . .
          setInterval ( eatBerries, 10000 );
          berriesButton.addEventListener('click',
            function () {
              var berriesAdded = Number(Math.random() * 10).toFixed(0);
              playerStatus.berries ? playerStatus.berries += Number(berriesAdded) :
                playerStatus.berries = Number(berriesAdded);
              midDiv.removeChild(berriesButton);
              leftDiv.innerHTML = leftDiv.innerHTML
                + "You pick " + berriesAdded + " berries.";
        });
        }
        if ( playerStatus.steps % 20 == 0 && playerStatus.steps != 0 ){
          var waterButton = createButton (
              "water", "middle", "attempt to get water?" );
          waterButton.addEventListener('click', function () {
            var waterAdded = Number(Math.round(Math.random()));
            playerStatus.water ? playerStatus.water += Number(waterAdded) :
              playerStatus.water = Number(waterAdded);
            midDiv.removeChild(waterButton);
            var waterMsg = waterAdded == 1 ? "You found water." : "you didn't find any water."
            leftDiv.innerHTML = leftDiv.innerHTML + waterMsg;
          })
          //for berry eating.
          function drinkWater() {
              var drinkWaterButton = createButton("drink-water",
                  "middle", "Drink water ? ");
              drinkWaterButton.addEventListener('click', function() {
                playerStatus.water -= 1;
                playerStatus.energy += 10;
                midDiv.removeChild(drinkWaterButton);
                leftDiv.innerHTML = leftDiv.innerHTML
                  + "You drink water and gain energy.";
              })
          };
        setInterval(drinkWater, 5000);
        }
      });
  // helper function creates button and returns a handle to the created button
  function createButton ( id, position, displayText ) {
    var newButton = document.createElement('button');
    newButton.id = id;
    newButton.innerHTML = String(displayText);
    document.getElementById(position).appendChild(newButton);
    return newButton;
  }
})();
