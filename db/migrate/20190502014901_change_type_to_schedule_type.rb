class ChangeTypeToScheduleType < ActiveRecord::Migration[5.2]
  def change
    rename_column :leagues, :type, :schedule_type
  end
end
