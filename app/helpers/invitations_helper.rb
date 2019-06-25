module InvitationsHelper

  def check_duplicates
    if current_user.duplicate_invitation(@invitation.league_id)
      @invitation.delete
      flash[:message] = "You already belong to this league."
      redirect_to player_path(current_user)
    else
      @invitation.update(invitations_params)
      redirect_to player_path(current_user)
    end
  end

end
