class ChangeAdminIdToPlayerId < ActiveRecord::Migration[5.2]
  def change
    rename_column :leagues, :admin_id, :player_id
  end
end
