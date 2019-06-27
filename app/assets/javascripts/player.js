$(document).ready(function() {
  attachListeners();
  getCurrentUser();
})

var currentUser;

function getCurrentUser() {
  $.get("/current_user", function(data) {
    currentUser = new Player(data.id, data.name, data.jersey_number, data.position, data.admin)
  })
}

function attachListeners(){
  $("button#pl_leagues").on("click", function(){
    makeLeagues();
    toggleButton(this);
  });
  $("button#ad_leagues").on("click", function(){
    makeAdminLeagues();
    toggleButton(this);
  });
  $("button#pend_invites").on("click", function(){
    makePendingInvites();
    toggleButton(this);
  });
  $("button#rec_invites").on("click", function(){
    makeRecentInvites();
    toggleButton(this);
  });
  $("form#new_invitation").submit(function(event){
    event.preventDefault();
    submitInvitation(this);
  })
}

function toggleButton(id) {
  let x = document.getElementById(id["id"])
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function makeLeagues() {
  $.get("/approved_invites", function(data) {
    if (data.length > 0) {
      data.forEach(function(league, index) {
        let leagueFromArray = new League(league.league_id, league.league.name, league.league.league_type, league.league.schedule);
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
        let leagueFromArray = new League(league.id, league.name, league.league_type, league.schedule);
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
        inviteFromArray.attachInviteListeners(inviteFromArray.id);
      })
    } else {
      $("#pending_invites").append("No Pending Invitations.");
    }
  })
}

function makeRecentInvites() {
  $.get("/recent_invites", function(data) {
    if (data.length > 0) {
      data.forEach(function(invite, index){
        let inviteFromArray = new Invitation(invite.id, invite.league.name, invite.player.name);
        $("#recent_invites").append(`${inviteFromArray.returnRecentInvites()}`);
      })
    } else {
      $("#recent_invites").append("No Recent Invitations.");
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
    return `<a href="/leagues/${this.id}">${this.name}</a><br>League Type: ${this.type}<br>League Schedule: ${this.schedule}<br>`;
  }
}

class Invitation {
  constructor(id, league_name, player) {
    this.id = id;
    this.league_name = league_name;
    this.player = player;
  }
  returnInvitation() {
    return `<div id="invite-${this.id}">Invitation #${this.id} received from ${this.league_name}.</br><button id="accept-${this.id}">Accept Invitation</button><button id="decline-${this.id}">Decline Invitation</button></div>`
  }
  returnRecentInvites() {
    return `Invitation sent to ${this.player} on behalf of ${this.league_name}.<br>`
  }
  attachInviteListeners(id) {
    $(`#accept-${this.id}`).on("click", function(){
      acceptInvitation(id);
    })
    $(`#decline-${this.id}`).on("click", function(){
      declineInvitation(id);
    })
  }
}

function acceptInvitation(id) {
  $.ajax({
    url: `/invitations/${id}`,
    type: 'PATCH',
    data: { authenticity_token: $('[name="csrf-token"]')[0].content, invitation: {accepted: true} },
    success: function(data) {
      let x = document.getElementById("pend_invites")
      $(`#invite-${id}`).remove();
      toggleButton(x);
      $("#player_leagues").empty();
      makeLeagues();
    },
    error: function(data) {
      console.log(data);
    }
  })
}

function declineInvitation(id) {
  $.ajax({
    url: `/invitations/${id}`,
    type: 'DELETE',
    data: { authenticity_token: $('[name="csrf-token"]')[0].content },
    error: function(data) {
      console.log(data);
    },
    success: function(data) {
      let x = document.getElementById("pend_invites")
      $(`#invite-${id}`).remove();
      toggleButton(x);
    }
  })
}

function submitInvitation(selector){
  debugger;
  $.ajax({
    type: "POST",
    url: $(selector).attr('action'),
    data: $(selector).serialize(),
    error: function(data) {
      console.log(data);
    },
  });
}
