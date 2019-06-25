class RenameAccepted < ActiveRecord::Migration[5.2]
  def change
    rename_column :invitations, :accepted?, :accepted
  end
end
