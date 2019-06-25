class CreateInvitations < ActiveRecord::Migration[5.2]
  def change
    create_table :invitations do |t|
      t.integer :league_id
      t.integer :player_id
      t.boolean :accepted?, :default => false

      t.timestamps
    end
  end
end
