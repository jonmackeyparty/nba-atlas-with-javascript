class ChangePlayerIdToAdminId < ActiveRecord::Migration[5.2]
  def change
    rename_column :leagues, :player_id, :admin_id
  end
end
