class ChangeScheduleTypeToLeagueType < ActiveRecord::Migration[5.2]
  def change
    rename_column :leagues, :schedule_type, :league_type
  end
end
