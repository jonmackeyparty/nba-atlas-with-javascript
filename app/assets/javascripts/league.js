class League {
  constructor(id, name, type, schedule, admin_id) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.schedule = schedule;
    this.admin_id = admin_id
  }
  returnLeagues() {
    return `<a href="/leagues/${this.id}">${this.name}</a><br>League Type: ${this.type}<br>League Schedule: ${this.schedule}<br>`;
  }
}
