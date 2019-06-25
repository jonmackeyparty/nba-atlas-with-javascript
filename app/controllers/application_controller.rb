class ApplicationController < ActionController::Base

  private

  def current_user
    @player ||= Player.find(session[:player_id]) if session[:player_id]
  end

  def require_login
    return head(:forbidden) unless session.include? :player_id
  end

  def logged_in?
    session[:player_id] != nil && session[:player_id] != ""
  end

  def check_cancel
    if params['commit'] == "Cancel"
      redirect_to player_path(current_user)
    end
  end
  
end
