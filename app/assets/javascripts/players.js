$(document).ready(function() {
  attachListeners();
})

function attachListeners(){
  $("button#leagues").on("click", function(){
    makeLeagues();
    hideLeaguesButton();
  });
}

function hideLeaguesButton() {
  let x = document.getElementById("leagues");

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function makeLeagues() {
  $.get("/approved_invites", function(data) {
    data.leagues.forEach(function(league, index) {
      let leagueFromArray = new League(league.name, league.league_type, league.schedule);
      $("#player_leagues").append(`${leagueFromArray.returnLeagues()}`)
    })

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
  constructor(name, type, schedule) {
    this.name = name;
    this.type = type;
    this.schedule = schedule;
  }
  returnLeagues() {
    return `<ul><strong>${this.name}</strong><li>${this.type}</li><li>${this.schedule}</li></ul>`
  }
}
