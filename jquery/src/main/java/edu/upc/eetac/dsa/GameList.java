package edu.upc.eetac.dsa;

import java.util.List;
import java.util.ArrayList;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class GameList {
	
	private List<Game> games;
	
	public GameList() {
		super();
		games = new ArrayList<>();
	}
	
	public List<Game> getGames() {
		return games;
	}

	public void setGames(List<Game> games) {
		this.games = games;
	}
	
	public void addGame(Game game) {
		this.games.add(game);
	}

		
}

