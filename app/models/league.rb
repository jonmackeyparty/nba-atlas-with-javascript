class League < ApplicationRecord
  belongs_to :admin, :class_name => 'Player'
  has_many :teams
  has_many :invitations
  has_many :players, through: :invitations
  validates :name, presence: true, uniqueness: true
end
