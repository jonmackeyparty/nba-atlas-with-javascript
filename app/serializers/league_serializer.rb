class LeagueSerializer < ActiveModel::Serializer
  attributes :id, :name, :league_type, :schedule
end
