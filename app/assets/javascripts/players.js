$(document).ready(function() {
  attachListeners();
  getCurrentUser();
})

var currentUser;

function getCurrentUser() {
  $.get("/current_user", function(data) {
    currentUser = new Player(data.id, data.name, data.jersey_number, data.position)
  })
}

function attachListeners(){
  $("button#pl_leagues").on("click", function(){
    makeLeagues();
    hideButton(this);
  });
  $("button#ad_leagues").on("click", function(){
    makeAdminLeagues();
    hideButton(this);
  });
  $("button#pend_invites").on("click", function(){
    makePendingInvites();
    hideButton(this);
  });
}

function hideButton(id) {
  let x = document.getElementById(id["id"])
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
    if (data.length > 0) {
      data.forEach(function(league, index) {
        let leagueFromArray = new League(league.id, league.name, league.league_type,   league.schedule);
        $("#admin_leagues").append(`${leagueFromArray.returnLeagues()}`);
      })
    } else {
      $("#admin_leagues").append("No Active Leagues.");
    }
  })
}

function makePendingInvites() {
  $.get("/pending_invites", function(data) {
    if (data.length > 0) {
      data.forEach(function(invite, index){
        let inviteFromArray = new Invitation(invite.id, invite.league.name, invite.player.name);

        $("#pending_invites").append(`${inviteFromArray.returnInvitation()}`);
        $("#pending_invites").append(`<button id="accept-${inviteFromArray.id}">Accept Invitation</button>`);
        $(`#accept-${inviteFromArray.id}`).on("click", function(){
          acceptInvitation(inviteFromArray.id);
        })

        $("#pending_invites").append(`<button id="decline-${inviteFromArray.id}">Decline Invitation</button>`);
        $(`#decline-${inviteFromArray.id}`).on("click", function(){
          declineInvitation(inviteFromArray.id);
        })
      })
    } else {
      $("#pending_invites").append("No Pending Invitations.");
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
    return `<a href="/leagues/${this.id}">${this.name}</a><br>League Type: ${this.type}<br>League Schedule: ${this.schedule}<br>`
  }
}

class Invitation {
  constructor(id, league_name, league_admin) {
    this.id = id;
    this.league_name = league_name;
    this.league_admin = league_admin;
  }
  returnInvitation() {
    return `Invitation received from ${this.league_name}, courtesy of ${this.league_admin}.</br>`
  }
}

function acceptInvitation(id) {
  debugger;
  $.ajax({
    url: `/invitations/${id}`,
    type: 'PATCH',
    data: { authenticity_token: $('[name="csrf-token"]')[0].content, accepted: true },
    success: function(data) {
      debugger;
      if (document.getElementById("pend_invites").style.display === "none") {
        makeLeagues();
      }
      console.log(data);
    },
    error: function(data) {
      console.log(data);
    }
  })
}

function declineInvitation(id) {
  debugger;
  $.ajax({
    url: `/invitations/${id}`,
    type: 'DELETE',
    data: { authenticity_token: $('[name="csrf-token"]')[0].content },
    error: function(data) {
      console.log(data);
    },
    success: function(data) {
      console.log(data);
    }
  })
}
