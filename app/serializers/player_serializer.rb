class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :position, :nickname, :jersey_number, :admin
  has_many :leagues, through: :invitations
  has_many :invitations
  has_many :leagues, :foreign_key => 'admin_id'
end
