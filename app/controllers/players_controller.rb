class PlayersController < ApplicationController
  include PlayersHelper
  before_action :check_cancel, only: [:edit]
  before_action :require_login
  skip_before_action :require_login, only: [:new, :create]

  def new
    if logged_in?
      redirect_to player_path(current_user)
    else
      @player = Player.new
    end
  end

  def create
    @player = Player.new(player_params)
    if @player.checks_out && @player.save
      session[:player_id] = @player.id
      flash[:message] = "Profile successfully created."
      redirect_to player_path(@player)
    else
      render :new
    end
  end

  def get_approved_invites
    current_user
    render json: @player, status: 200
  end

  def get_pending_invites
    current_user
    @invitations = @player.invitations.pending
    render json: @invitations, status: 200
  end

  def destroy
  end

  def show
    current_user
    @invitation = Invitation.new
  end

  def edit
    current_user
  end

  def update
    current_user
    @player.update(player_params)
    redirect_to player_path(@player)
  end

  private

  def player_params
    params.require(:player).permit(:name, :age, :nickname, :position, :jersey_number, :admin, :password, :password_confirmation)
  end

end
