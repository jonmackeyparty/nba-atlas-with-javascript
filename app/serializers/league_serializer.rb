class LeagueSerializer < ActiveModel::Serializer
  attributes :id, :name, :league_type, :schedule
  has_many :teams
end
