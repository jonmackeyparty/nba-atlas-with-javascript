class Invitation < ApplicationRecord
  belongs_to :league
  belongs_to :player
  scope :pending, -> { where(accepted: false) }
  scope :approved, -> { where(accepted: true) }
  scope :recent, -> { order(created_at: :desc).where(created_at: 1.week.ago..DateTime.now) }

  def league_name
    League.find(self.league_id).name
  end

  def admin_name
    League.find(self.league_id).admin.name
  end

  def player_name
    Player.find(self.player_id).name
  end

  def created_date
    self.created_at.strftime("%A, %b %d")
  end 

end
