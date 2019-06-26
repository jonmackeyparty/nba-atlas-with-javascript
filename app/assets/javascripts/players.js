$(document).ready(function() {
  attachListeners();
})

function attachListeners(){
  $("button#leagues").on("click", function(){
    makeLeagues();
  });
}

function makeLeagues() {
  console.log('clicked')
  $.get("/approved_invites", function(data) {
    debugger;


  })
}

class Player {
  constructor(name, jerseyNumber, position) {
  this.name = name;
  this.jerseyNumber = jerseyNumber;
  this.position = position;
  }

}

class League {
  
}
