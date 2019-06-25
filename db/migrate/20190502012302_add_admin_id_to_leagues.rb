class AddAdminIdToLeagues < ActiveRecord::Migration[5.2]
  def change
    add_column :leagues, :admin_id, :integer
  end
end
