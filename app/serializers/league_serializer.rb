class LeagueSerializer < ActiveModel::Serializer
  attributes :id, :name, :league_type, :schedule
  belongs_to :admin, :class_name => 'Player'
  has_many :invitations
  has_many :players, through: :invitations
end
