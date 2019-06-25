class InvitationsController < ApplicationController
  include InvitationsHelper
  before_action :require_login
  before_action :check_cancel, only: [:create]

  def index
    current_user
  end

  def new
    current_user
    @invitation = Invitation.new
  end

  def create
      @invitation = Invitation.new(invitations_params)
      if @invitation.save
        flash[:message] = "Invitation successfully sent."
        redirect_to player_path(current_user)
      else
        redirect_to new_player_invitation_path(current_user)
      end
  end

  def update
    @invitation = Invitation.find(params[:id])
    check_duplicates
  end

  def destroy
    @invitation = Invitation.find(params[:id])
    @invitation.delete
    flash[:message] = "Invitation deleted."
    redirect_to player_path(current_user)
  end

  private

  def invitations_params
    params.require(:invitation).permit(:player_id, :league_id, :accepted)
  end

end
