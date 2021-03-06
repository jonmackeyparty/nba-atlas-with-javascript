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
      $.notify("Invitation declined.", "success");
      let x = document.getElementById("pend_invites")
      let y = document.getElementById("pending_invites")
      $(`#invite-${id}`).remove();
      if (y.childElementCount === 0) {
        toggleButton(x);
      }
    }
  })
}

function submitInvitation(selector){
  $.ajax({
    type: "POST",
    url: $(selector).attr('action'),
    data: $(selector).serialize(),
    error: function(data) {
      console.log(data);
    },
    success: function(data) {
      let x = document.getElementById('rec_invites');
      $.notify("Invitation Sent.", "success");
      if (currentUser.id === data.player_id) {
        $("#no_pending_invites").empty();
        makePendingInvites();
      } else if (x.style.display === "none") {
        $("#recent_invites").empty();
        makeRecentInvites();
      }
    },
  });
}
