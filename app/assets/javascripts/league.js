class League {
  constructor(id, name, type, schedule, admin_id) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.schedule = schedule;
    this.admin_id = admin_id;
  }
  returnPlayerLeagues() {
    return `<strong>${this.name}</strong><br><button id="player_league_button-${this.id}">Show League Details</button></div><div id="player_league-${this.id}"></div>`
  }
  returnAdminLeagues(){
    return `<strong>${this.name}</strong><br><button id="admin_league_button-${this.id}">Show League Details</button></div><div id="admin_league-${this.id}"></div>`
  }
  attachPlayerListener(id) {
    $(`#player_league_button-${this.id}`).on("click", function(){
      showPlayerLeague(id);
    });
  }
  attachAdminListener(id) {
    $(`#admin_league_button-${this.id}`).on("click", function(){
      showAdminLeague(id);
    });
  }
}

function showPlayerLeague(league_id) {
  $.get(`/leagues/${league_id}`, function(data) {
    $(`#player_league-${league_id}`).append(`League Type: ${data.league_type}<br>League Schedule: ${data.schedule}<br>League Administrator: ${data.admin.name}<br>`);
  });
  let y = document.getElementById(`player_league_button-${league_id}`)
  toggleButton(y);
}

function showAdminLeague(league_id) {
  $.get(`/leagues/${league_id}`, function(data) {
    $(`#admin_league-${league_id}`).append(`League Type: ${data.league_type}<br>League Schedule: ${data.schedule}<br>League Administrator: ${data.admin.name}<br>Players:<br> ${addPlayers(data.players)}`);
  });
  let x = document.getElementById(`admin_league_button-${league_id}`)
  toggleButton(x);
}

function addPlayers(players) {
  let comparePlayers = function(a,b) {
    let aLastName = a.split(' ')[1];
    let bLastName = b.split(' ')[1];
    if (aLastName < bLastName) {
      return -1;
    } else if (aLastName > bLastName) {
      return 1;
    } else {
      return 0;
    }
  };
  let playerArray = players.map(function(player) {
    return `${player.name}`;
  });
  return playerArray.sort(comparePlayers).join('<br>');
}
