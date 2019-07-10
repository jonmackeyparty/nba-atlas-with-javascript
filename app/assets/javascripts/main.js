$(document).ready(function() {
  attachListeners();
  getCurrentUser();
})

let currentUser;

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
      data.forEach(function(invitation) {
        let leagueFromArray = new League(invitation.league_id, invitation.league.name, invitation.league.league_type, invitation.league.schedule, invitation.league.admin_id);
        $("#player_leagues").append(`${leagueFromArray.returnPlayerLeagues()}`)
        leagueFromArray.attachPlayerListener(leagueFromArray.id);
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
      data.forEach(function(league) {
        let leagueFromArray = new League(league.id, league.name, league.league_type, league.schedule, league.admin.id);
        $("#admin_leagues").append(`${leagueFromArray.returnAdminLeagues()}`);
        leagueFromArray.attachAdminListener(leagueFromArray.id);
      })
    } else {
      $("#admin_leagues").append("No Active Leagues.");
    }
  });
}

function makePendingInvites() {
  $.get("/pending_invites", function(data) {
    if (data.length > 0) {
      data.forEach(function(invite){
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
      data.forEach(function(invite){
        let inviteFromArray = new Invitation(invite.id, invite.league.name, invite.player.name);
        $("#recent_invites").append(`${inviteFromArray.returnRecentInvites()}`);
      })
    } else {
      $("#recent_invites").append("No Recent Invitations.");
    }
  });
}
