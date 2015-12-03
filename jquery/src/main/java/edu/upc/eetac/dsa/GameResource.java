package edu.upc.eetac.dsa;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/game")
public class GameResource {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGame() {
        Game game = new Game();
        game.setId("test");
        game.setDescription("Partida de prueba");
        game.setUrl("http://prova/test");
        return Response.ok(game).build();
    }

    
    @GET @Path("/{gameid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGamebyName(@PathParam("gameid") String gameid) {
        Game game = GameDao.instance.getModel().get(gameid);
        Response response;
        
        if(game==null) {
        	response = Response.status(Response.Status.NOT_FOUND).build();
            
        } else {
        	response = Response.ok(game).build();
        }
        return response;
    }
    

    @GET @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGames() {
    	List<Game> values = new ArrayList<Game>();
        values.addAll(GameDao.instance.getModel().values());
        GameList games = new GameList();
        games.setGames(values);

        return Response.ok(games).build();
    }

   
    @POST 
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response newGameInJSON(Game newgame) {

		if (newgame.getId() == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
		if (newgame.getUrl() == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}

		if (newgame.getUserlist() == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}

		Game game = GameDao.instance.getModel().get(newgame.getId());
		if (game != null) {
			return Response.status(Response.Status.CONFLICT).build();
		}

		if (newgame.getCreationdate() == null) {
			Date now = new Date();
			newgame.setCreationdate(now);
		}
		
		GameDao.instance.getModel().put(newgame.getId(), newgame);

		return Response.ok(newgame).build();
    }
   
    
    @PUT  @Path("/{gameid}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateGameInJSON(@PathParam("gameid") String gameid, Game newgame) {
        if (newgame.getId()==null){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        if (newgame.getUrl()==null){
           return Response.status(Response.Status.BAD_REQUEST).build();
        }
		if (newgame.getUserlist() == null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
        if(!gameid.equals(newgame.getId())) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        Game game = GameDao.instance.getModel().get(gameid);
        if(game==null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        
        GameDao.instance.getModel().put(newgame.getId(), newgame);

        return Response.ok(newgame).build();

    }

    
	@DELETE
	@Path("/{gameid}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteGamebyId(@PathParam("gameid") String gameid) {
		Game game = GameDao.instance.getModel().get(gameid);
		if (game == null) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
		
		game = GameDao.instance.getModel().remove(gameid);
		return Response.status(Response.Status.ACCEPTED).build();

	}

	
	
	@GET @Path("/pagination")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getpaginationlist(@QueryParam("page") int page) {
		
    	List<Game> values = new ArrayList<Game>();
        values.addAll(GameDao.instance.getModel().values());
        int size = values.size();
        
        if (page > size) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
        if (page < 0) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}

        GameList games = new GameList();
        games.addGame(values.get((page)));
        
        String link = "";
        if (page == 0){
        	link = "<http://localhost:8080/myapp/game/pagination?page=" + (page+1) + ">; rel=\"next\"";
        }
        
        if (page == size-1){
        	link = "<http://localhost:8080/myapp/game/pagination?page=" + (page-1) + ">; rel=\"prev\"";
        }
        
        if (page < size-1 && page > 0){
        	link = "<http://localhost:8080/myapp/game/pagination?page=" + (page-1) + ">; rel=\"prev\", " + "<http://localhost:8080/myapp/game/pagination?page=" + (page+1) + ">; rel=\"next\"";
        }
        
        return Response.ok(games).header("Link", link).build();
    }
    
}


