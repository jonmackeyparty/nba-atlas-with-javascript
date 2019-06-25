# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
player_list = [
  ["Charles Barkley", "The Round Mound of Rebound", 33, 34, "Small forward", "spacejam", "spacejam"],
  ["Shawn Bradley", "Stormin Mormon", 29, 76, "Center", "spacejam", "spacejam"],
  ["Patrick Ewing", "Hoya Detroya", 31, 33, "Center", "spacejam", "spacejam"],
  ["Larry Johnson", "Grandmama", 27, 2, "Power forward", "spacejam", "spacejam"],
  ["Tyrone Bogues", "Muggsy", 32, 1, "Point guard", "spacejam", "spacejam"]
]

player_list.each do |name, nickname, age, jersey_number, position, password, password_confirmation|
  Player.create!(name: name, nickname: nickname, age: age, jersey_number: jersey_number, position: position, password: password, password_confirmation: password_confirmation)
end

bill = Player.create!(name: "Bill Murray", nickname: "The Murricane", age: 55, jersey_number: 24, position: "Coach", admin: true, password: "spacejam", password_confirmation: "spacejam")

space = League.new(name: "Space League", league_type: "Tournament", schedule: "Annual")
space.admin = bill
space.save

space_players = [1, 3, 5]
space_players.each do |player|
  space.invitations.create!(player_id: player)
end

wayne = Player.create!(name: "Wayne Knight", nickname: "Newman", age: 45, jersey_number: 3, position: "Publicist", admin: true, password: "spacejam", password_confirmation: "spacejam")

nbl = League.new(name: "National Basketball League", league_type: "Professional", schedule: "October-June")
nbl.admin = wayne
nbl.save

nbl_players = [1, 2, 4, 5]
nbl_players.each do |player|
  nbl.invitations.create!(player_id: player)
end
