class Team < ApplicationRecord
  belongs_to :league
  has_many :players
  accepts_nested_attributes_for :players
  
end
