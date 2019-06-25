module PlayersHelper

  def checks_out?
    @player.password == @player.password_confirmation && Player.find_by(:name => @player.name) == nil
  end

end
