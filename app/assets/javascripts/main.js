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
        debugger;
        let leagueFromArray = new League(league.league_id, league.league.name, league.league.league_type, league.league.schedule, league.league.admin_id);
        $("#player_leagues").append(`${leagueFromArray.returnPlayerLeagues()}`)
        leagueFromArray.attachLeagueListeners(leagueFromArray.id);
      })
    }
    else {
      $("#player_leagues").append("No Active Leagues.")
    }
  });
}

function makeAdminLeagues() {
  $.get("/admin_leagues", function(data) {
    if (data.length > 0) {
      data.forEach(function(league, index) {
        let leagueFromArray = new League(league.id, league.name, league.league_type, league.schedule);
        $("#admin_leagues").append(`${leagueFromArray.returnAdminLeagues()}`);
        leagueFromArray.attachLeagueListeners(leagueFromArray.id);
      })
    } else {
      $("#admin_leagues").append("No Active Leagues.");
    }
  });
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
      $("#no_pending_invites").append("No Pending Invitations.");
    }
  });
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
  });
}
