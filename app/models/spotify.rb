class Spotify

  def search(search_term)
    puts "*" * 1000
    p RSpotify::Track.search(search_term)
    puts "*" * 1000
    RSpotify::Track.search(search_term)
  end

end
