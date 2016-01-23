class DashboardController < ApplicationController
  before_action :clean_params
  def index
    if !@params.blank?
      search_term = @params[:search_term]
      result = Spotify.new.search(search_term)
      @trackset = ""
      result.each{|r| @trackset += "#{r.id},"}
      @trackset = @trackset.chop
    end
  end

	def clean_params
		@params = params.permit(:search_term)
	end
end
