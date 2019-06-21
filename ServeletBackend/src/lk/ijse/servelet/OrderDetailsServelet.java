package lk.ijse.servelet;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
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
import java.sql.SQLException;
import java.sql.Statement;

@WebServlet(urlPatterns = "/orderdetails")
public class OrderDetailsServelet extends HttpServlet {

    @Resource(name = "java:comp/env/jdbc/pool")
    private DataSource ds;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonReader reader = Json.createReader(req.getReader());
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();

        Connection connection = null;

        try {
            JsonObject customer = reader.readObject();
            String code = customer.getString("code");
            String oid = customer.getString("oid");
            Double unitPrice = Double.parseDouble(customer.getString("unitPrice")) ;
            Double qty1 = Double.parseDouble(customer.getString("qty")) ;
            connection = ds.getConnection();
            System.out.println(code);

//            Statement stm = connection.createStatement();
//            stm.executeUpdate(
//                    "UPDATE item SET qty =" +qty1+
//                            "WHERE code =" +code
//            );

            PreparedStatement pstm = connection.prepareStatement("INSERT INTO OrderDetails VALUES (?,?,?,?)");
            pstm.setObject(1, code);
            pstm.setObject(2, oid);
            pstm.setObject(3, unitPrice);
            pstm.setObject(4, qty1);
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
    }

