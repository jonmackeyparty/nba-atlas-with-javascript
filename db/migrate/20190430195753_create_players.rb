class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :age
      t.string :nickname
      t.string :position
      t.integer :jersey_number

      t.timestamps
    end
  end
end
