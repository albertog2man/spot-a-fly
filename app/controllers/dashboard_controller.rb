class DashboardController < ApplicationController
  before_action :clean_params

  def index
    if @params
      search_term = @params[:search_term]
      @result = Spotify.new.search(search_term)
      @result = @result.first.id
    end
  end

	def clean_params
		@params = params.permit(:search_term)
	end
end
