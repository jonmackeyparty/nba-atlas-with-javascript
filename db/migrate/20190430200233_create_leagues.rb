class CreateLeagues < ActiveRecord::Migration[5.2]
  def change
    create_table :leagues do |t|
      t.string :name
      t.string :type
      t.string :schedule

      t.timestamps
    end
  end
end
