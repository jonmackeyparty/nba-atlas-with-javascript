class AddUidToPlayers < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :uid, :integer
  end
end
