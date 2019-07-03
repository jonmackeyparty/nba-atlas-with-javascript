module InvitationsHelper

  def check_duplicates
    if current_user.duplicate_invitation(@invitation.league_id)
      @invitation.delete
      #flash[:message] = "You already belong to this league."
    else
      @invitation.update(invitations_params)
    end
  end

end
