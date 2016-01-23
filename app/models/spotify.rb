class Spotify

  def search(search_term)
    RSpotify::Track.search(search_term)
  end

end
