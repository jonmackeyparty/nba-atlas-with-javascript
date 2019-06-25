class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :league_id, :player_id
  belongs_to :league
  belongs_to :player

end
