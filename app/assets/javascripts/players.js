$(document).ready(function() {
  attachListeners();
})

function attachListeners(){
  $("button#view leagues").on("click", function(){
    makeLeagues();
  });
}

class Player {
  constructor(name, jerseyNumber, position) {
  this.name = name;
  this.jerseyNumber = jerseyNumber;
  this.position = position;
  }

}
