class LeaguesController < ApplicationController
  before_action :require_login
  before_action :check_cancel, only: [:create, :update]
  before_action :current_user
  skip_before_action :current_user, only: [:new]

  def index
  end

  def new
    @player = Player.find_by(:id => params[:player_id])
    if @player.nil? || @player != current_user
      flash[:message] = "Please use a valid Administrator."
      redirect_to player_path(current_user)
    else
      @league = League.new(:admin_id => params[:player_id])
    end
  end

  def create
    @league = League.new(league_params)
    if @league.save
      redirect_to player_path(@league.admin)
    else
      render 'new'
    end
  end

  def update
    @league = League.find(params[:id])
    @league.update(league_params)
    redirect_to player_path(@league.admin)
  end

  def show
    @league = League.find(params[:id])
  end

  def edit
    @league = League.find(params[:id])
  end

  def destroy
    @league = League.find(params[:id])
    @league.delete
    redirect_to player_path(current_user)
  end

  private

  def league_params
    params.require(:league).permit(:name, :league_type, :schedule, :admin_id)
  end


end
