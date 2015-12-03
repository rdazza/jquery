package edu.upc.eetac.dsa;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public enum GameDao {
	instance;

	private Map<String, Game> contentProvider = new HashMap<String, Game>();

	private GameDao() {
		Game game = new Game("1");
		game.setDescription("partida de prueba");
		String[] userlist = {"Juanito", "Jorgito", "Jaimito"};
		game.setUrl("http://prova/1");
		game.setUserlist(userlist);
		String string = "02-07-2014";
		Date date;
		try {
			date = new SimpleDateFormat("dd-MM-yyyy").parse(string);
			game.setCreationdate(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		contentProvider.put("1", game);

		game = new Game("2");
		game.setDescription("segunda partida de prueba");
		String[] userlist2 = {"Juanito", "Jorgito", "Jaimito"};
		game.setUrl("http://prova/2");
		game.setUserlist(userlist2);
		string = "02-04-2015";
		
		try {
			date = new SimpleDateFormat("dd-MM-yyyy").parse(string);
			game.setCreationdate(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		contentProvider.put("2", game);
		
		game = new Game("3");
		game.setDescription("primera partida de verdad");
		String[] userlist3 = {"Sergio", "Roc"};
		game.setUrl("http://prova/3");
		game.setUserlist(userlist3);
		string = "04-04-2015";
		
		try {
			date = new SimpleDateFormat("dd-MM-yyyy").parse(string);
			game.setCreationdate(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		contentProvider.put("3", game);
	
	
	}
	
	public Map<String, Game> getModel(){
		return contentProvider;
	}

} 
