module SessionsHelper

  def attribute_check
    if @player.missing_attributes
      redirect_to edit_player_path(@player)
    else
      redirect_to player_path(@player)
    end
  end

end
