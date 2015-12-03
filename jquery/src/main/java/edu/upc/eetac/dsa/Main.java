package edu.upc.eetac.dsa;

import org.glassfish.grizzly.http.server.HttpHandler;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.server.NetworkListener;
import org.glassfish.grizzly.http.server.StaticHttpHandler;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.io.IOException;
import java.net.URI;

/**
 * Main class.
 *
 */
public class Main {
    // Base URI the Grizzly HTTP server will listen on
    public static final String BASE_URI = "http://localhost:8080/myapp/";

    /**
     * Starts Grizzly HTTP server exposing JAX-RS resources defined in this application.
     * @return Grizzly HTTP server.
     */
    public static HttpServer startServer() {
        // create a resource config that scans for JAX-RS resources and providers
        // in edu.upc.eetac.dsa package
        final ResourceConfig rc = new ResourceConfig().packages("edu.upc.eetac.dsa");

        // create and start a new instance of grizzly http server
        // exposing the Jersey application at BASE_URI
        
        HttpServer httpServer = GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc);
        //HttpHandler httpHandler = new CLStaticHttpHandler(HttpServer.class.getClassLoader(), "/web/");
        HttpHandler httpHandler = new StaticHttpHandler("./web/");
        httpServer.getServerConfiguration().addHttpHandler(httpHandler, "/");
        
        for (NetworkListener l : httpServer.getListeners()) {
            l.getFileCache().setEnabled(false);
        }
        
        return httpServer;
    }

    /**
     * Main method.
     * @param args
     * @throws IOException
     */
    @SuppressWarnings("deprecation")
	public static void main(String[] args) throws IOException {
        final HttpServer server = startServer();
        System.out.println(String.format("Jersey app started with WADL available at "
                + "%sapplication.wadl\nHit enter to stop it...", BASE_URI));
        System.in.read();
        server.stop();
    }
}



