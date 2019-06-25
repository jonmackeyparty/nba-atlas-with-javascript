class Player < ApplicationRecord
  has_many :invitations
  has_many :leagues, :foreign_key => 'admin_id'
  has_many :teams, through: :leagues
  has_many :leagues, through: :invitations
  validates :name, presence: true, uniqueness: true
  has_secure_password

  def checks_out
      self.password == self.password_confirmation && Player.find_by(:name => self.name) == nil
  end

  def missing_attributes
    age.nil? || nickname.nil? || position.nil? || jersey_number.nil?
  end

  def duplicate_invitation(id)
    invitations.approved.select{ |i| i.league_id == id}.count > 0
  end

  def league_admin
    League.where(:admin => self)
  end

  def recent_invitations
    league_admin.each do |league|
      Invitation.recent.include?(league.invitations)
    end
  end


end
