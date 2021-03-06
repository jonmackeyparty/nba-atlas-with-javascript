Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'players#new'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'
  get '/signup' => 'players#new'
  get '/auth/github/callback' => 'sessions#github_login'
  get '/players/:id/pending_invitations' => 'invitations#index'
  get '/approved_invites' => 'players#get_approved_invites'
  get '/admin_leagues' => 'leagues#get_admin_leagues'
  get '/pending_invites' => 'players#get_pending_invites'
  get '/current_user' => 'players#get_current_user'
  get '/recent_invites' => 'players#get_recent_invites'

  resources :players do
    resources :leagues, :shallow => true
    resources :invitations, :shallow => true
  end

end
