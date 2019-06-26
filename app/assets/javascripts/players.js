$(document).ready(function() {
  attachListeners();
})

function attachListeners(){
  $("button#pl_leagues").on("click", function(){
    makeLeagues();
    hideButton(this);
  });
  $("button#ad_leagues").on("click", function(){
    makeAdminLeagues();
    hideButton(this);
  });
}

function hideButton(id) {
  console.log(id)
  let x = document.getElementById(id["id"])
  //debugger;
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function makeLeagues() {
  $.get("/approved_invites", function(data) {
    if (data.leagues.length > 0) {
      data.leagues.forEach(function(league, index) {
        let leagueFromArray = new League(league.id, league.name, league.league_type,   league.schedule);
        $("#player_leagues").append(`${leagueFromArray.returnLeagues()}`)
      })
    }
    else {
      $("#player_leagues").append("No Active Leagues.")
    }
  })
}

function makeAdminLeagues() {
  $.get("/admin_leagues", function(data) {
    debugger;
    if (data.length > 0) {
      data.forEach(function(league, index) {
        let leagueFromArray = new League(league.id, league.name, league.league_type,   league.schedule);
        $("#admin_leagues").append(`${leagueFromArray.returnLeagues()}`)
      })
    }
    else {
      $("#admin_leagues").append("No Active Leagues.")
    }
  })
}

class Player {
  constructor(id, name, jerseyNumber, position) {
  this.id = id;
  this.name = name;
  this.jerseyNumber = jerseyNumber;
  this.position = position;
  }

}

class League {
  constructor(id, name, type, schedule) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.schedule = schedule;
  }
  returnLeagues() {
    return `<ul><a href="/leagues/${this.id}">${this.name}</a><li>${this.type}</li><li>${this.schedule}</li></ul>`
  }
}
