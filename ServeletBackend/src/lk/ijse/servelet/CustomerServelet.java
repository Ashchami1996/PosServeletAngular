package lk.ijse.servelet;

import javax.annotation.Resource;
import javax.json.*;
import javax.json.stream.JsonParsingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet(urlPatterns = "/customers")
public class CustomerServelet extends HttpServlet {

    @Resource(name = "java:comp/env/jdbc/pool")
    private DataSource ds;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {


            Connection connection = ds.getConnection();
            Statement stm = connection.createStatement();
            ResultSet rst = stm.executeQuery("SELECT * FROM Customer");

            JsonArrayBuilder ab = Json.createArrayBuilder();
            while (rst.next()) {
                JsonObjectBuilder ob = Json.createObjectBuilder();
                ob.add("id", rst.getString("cid"));
                ob.add("name", rst.getString("name"));
                ob.add("address", rst.getString("address"));

                ab.add(ob.build());
            }
            JsonArray customers = ab.build();
            resp.setContentType("application/json");
            resp.getWriter().println(customers);

            connection.close();
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
    }

    //    @Override
//    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        try (PrintWriter out = resp.getWriter()) {
//            System.out.println("search" + req.getParameter("id"));
//            if (req.getParameter("id") != null) {
//                resp.setContentType("application/json");
//                System.out.println("search");
//                String id = req.getParameter("id");
//
//                try {
//                    Connection connection = ds.getConnection();
//
//                    PreparedStatement pstm = connection.prepareStatement("SELECT * FROM Customer WHERE cid=?");
//                    pstm.setObject(1, id);
//                    ResultSet rst = pstm.executeQuery();
//
//                    if (rst.next()) {
//                        JsonObjectBuilder ob = Json.createObjectBuilder();
//                        ob.add("id", rst.getString(1));
//                        ob.add("name", rst.getString(2));
//                        ob.add("address", rst.getString(3));
//
//
//                        resp.setContentType("application/json");
//                        out.println(ob.build());
//                    } else {
//                        resp.sendError(HttpServletResponse.SC_NOT_FOUND);
//                    }
//
//                } catch (Exception ex) {
//                    ex.printStackTrace();
//                }
//
//
////                                      customer getall
//
//            } else {
//                try {
//                    System.out.println("get All");
//                    Connection connection = ds.getConnection();
//
//                    Statement stm = connection.createStatement();
//                    ResultSet rst = stm.executeQuery("SELECT * FROM Customer");
//
//                    JsonArrayBuilder customers = Json.createArrayBuilder();
//
//                    while (rst.next()) {
//                        String cid = rst.getString("cid");
//                        String name = rst.getString("name");
//                        String address = rst.getString("address");
//
//
//                        JsonObject customer = Json.createObjectBuilder()
//                                .add("id", cid)
//                                .add("name", name)
//                                .add("address", address)
//
//                                .build();
//                        customers.add(customer);
//                    }
//
//                    ((PrintWriter) out).println(customers.build().toString());
//
//                    connection.close();
//                } catch (Exception ex) {
//                    resp.sendError(500, ex.getMessage());
//                    ex.printStackTrace();
//                }
//            }
//        }
//
//    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonReader reader = Json.createReader(req.getReader());
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        Connection connection = null;

        try {
            JsonObject customer = reader.readObject();
            String id = customer.getString("id");
            String name = customer.getString("name");
            String address = customer.getString("address");
            connection = ds.getConnection();
            System.out.println(id);
            PreparedStatement pstm = connection.prepareStatement("INSERT INTO Customer VALUES (?,?,?)");
            pstm.setObject(1, id);
            pstm.setObject(2, name);
            pstm.setObject(3, address);
            boolean result = pstm.executeUpdate() > 0;

            if (result) {
                out.println("true");
            } else {
                out.println("false");
            }

        } catch (Exception ex) {
            ex.printStackTrace();
            out.println("false");
        } finally {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            out.close();
        }

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(req.getParameter("id"));
        System.out.println(req.getParameter("name"));
        System.out.println(req.getParameter("address"));
        if (req.getParameter("id") != null) {

            try {
                JsonReader reader = Json.createReader(req.getReader());
                JsonObject customer = reader.readObject();
                System.out.println(req.getParameter("id"));
                String id = customer.getString("id");
                String name = customer.getString("name");
                String address = customer.getString("address");
                System.out.println(req.getParameter("id")+ id);
                if (!id.equals(req.getParameter("id"))) {
                    resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
                    return;
                }

                Connection connection = ds.getConnection();
                PreparedStatement pstm = connection.prepareStatement("UPDATE Customer SET name=?, address=? WHERE cid =?");
                pstm.setObject(3, id);
                pstm.setObject(1, name);
                pstm.setObject(2, address);
                int affectedRows = pstm.executeUpdate();

                if (affectedRows > 0) {
                    resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
                } else {
                    resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                }

            } catch (JsonParsingException | NullPointerException ex) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
            } catch (Exception ex) {
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }


        } else {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }


    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("working" + req.getParameter("id"));
        String id = req.getParameter("id");

        if (id != null){

            try {
                Connection connection = ds.getConnection();
                PreparedStatement pstm = connection.prepareStatement("DELETE FROM Customer WHERE cid=?");
                pstm.setObject(1, id);
                int affectedRows = pstm.executeUpdate();
                if (affectedRows >  0){
                    resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
                }else{
                    resp.sendError(HttpServletResponse.SC_NOT_FOUND);
                }
            }catch (Exception ex){
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                ex.printStackTrace();
            }

        }else{
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }
}
