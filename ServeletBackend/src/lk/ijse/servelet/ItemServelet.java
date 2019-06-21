package lk.ijse.servelet;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet(urlPatterns = "/Items")
public class ItemServelet extends HttpServlet {

    @Resource(name = "java:comp/env/jdbc/pool")
    private DataSource ds;


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (PrintWriter out = resp.getWriter()) {
            System.out.println("search" + req.getParameter("code"));
            if (req.getParameter("code") != null) {
                resp.setContentType("application/json");
                System.out.println("search");
                String code = req.getParameter("code");

                try {
                    Connection connection = ds.getConnection();

                    PreparedStatement pstm = connection.prepareStatement("SELECT * FROM Item WHERE code=?");
                    pstm.setObject(1, code);
                    ResultSet rst = pstm.executeQuery();

                    if (rst.next()) {
                        JsonObjectBuilder ob = Json.createObjectBuilder();
                        ob.add("code", rst.getString(1));
                        ob.add("description", rst.getString(2));
                        ob.add("unitPrice", rst.getString(3));
                        ob.add("qtyOnHand", String.valueOf((rst.getInt(4))));

                        resp.setContentType("application/json");
                        out.println(ob.build());
                    } else {
                        resp.sendError(HttpServletResponse.SC_NOT_FOUND);
                    }

                } catch (Exception ex) {
                    ex.printStackTrace();
                }


//                                      customer getall

            } else {
                try {
                    System.out.println("get All");
                    Connection connection = ds.getConnection();

                    Statement stm = connection.createStatement();
                    ResultSet rst = stm.executeQuery("SELECT * FROM Item");

                    JsonArrayBuilder items = Json.createArrayBuilder();

                    while (rst.next()) {
                        String code = rst.getString("code");
                        String description = rst.getString("description");
                        String unitPrice = rst.getString("unitPrice");
                        String qtyOnHand = String.valueOf((rst.getInt("qtyOnHand")));


                        JsonObject item = Json.createObjectBuilder()
                                .add("code", code)
                                .add("description", description)
                                .add("unitPrice",unitPrice)
                                .add("qtyOnHand", qtyOnHand)
                                .build();
                        items.add(item);
                    }

                    ((PrintWriter) out).println(items.build().toString());

                    connection.close();
                } catch (Exception ex) {
                    resp.sendError(500, ex.getMessage());
                    ex.printStackTrace();
                }
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
