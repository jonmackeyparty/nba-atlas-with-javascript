# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project
- [x] Include at least one has_many relationship (x has_many y; e.g. User has_many Recipes)
  -League has_many Invitations
- [x] Include at least one belongs_to relationship (x belongs_to y; e.g. Post belongs_to User)
  -League belongs_to Player(as admin)
- [x] Include at least two has_many through relationships (x has_many y through z; e.g. Recipe has_many Items through Ingredients)
  -Player has_many Leagues through Invitations
  -League has_many Players through Invitations
- [x] Include at least one many-to-many relationship (x has_many y through z, y has_many x through z; e.g. Recipe has_many Items through Ingredients, Item has_many Recipes through Ingredients)
  -Player has_many Leagues through Invitations
  -League has_many Players through Invitations
- [x] The "through" part of the has_many through includes at least one user submittable attribute, that is to say, some attribute other than its foreign keys that can be submitted by the app's user (attribute_name e.g. ingredients.quantity)
  -Invitation includes "accepted" attribute, which can be set to "true" by user
- [x] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item)
  -Player model:
    -validates presence of name, uniqueness with validates method
    -validates password and confirmation with has_secure_password
    -uses strong_params
  -League model:
    -validates presence of name, uniqueness with validates method
    -uses strong_params
- [x] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes)
    -scope :pending in Invitation
    -scope :recent in Invitation
    -scope :approved in Invitation
    -custom route '/players/:id/pending_invitations' shows :pending and :recent invitations via invitations#index
- [x] Include signup (how e.g. Devise)
- [x] Include login (how e.g. Devise)
- [x] Include logout (how e.g. Devise)
- [x] Include third party signup/login (how e.g. Devise/OmniAuth)
  -Github signin via omniauth
- [x] Include nested resource show or index (URL e.g. users/2/recipes)
  -players/:id/leagues/index
- [x] Include nested resource "new" form (URL e.g. recipes/1/ingredients/new)
  -players/:id/leagues/new
- [x] Include form display of validation errors (form URL e.g. /recipes/new)

Confirm:
- [x] The application is pretty DRY
- [x] Limited logic in controllers
- [x] Views use helper methods if appropriate
- [x] Views use partials if appropriate
