class AddPasswordConfirmationToPlayers < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :password_confirmation, :string
  end
end
