package com.navras.springmvcangularjs.database;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.HashMap;

public class OracleCon{

    final Logger logger = LoggerFactory.getLogger("OracleCon");

    private OracleCon(){

    }

//    public String getSql(String sql, String column){
//        initialize();
//
//
//        return "";
//    }

    public static void main(String args[]){
        OracleCon.getSql("select * from prima where id=2", "id,text");

    }

    public static void getSql(String sql, String column) {
        Connection con = null;
        HashMap<String, String> resp = null;
        String multiCols[] = new String[1];
        int cont = 0;
        if (!column.trim().isEmpty() && !column.trim().equals("") && !column.contains("*")) {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "cld", "cld");
            Statement stmt = con.createStatement();

            ResultSet rs = stmt.executeQuery(sql);

            ResultSetMetaData rsCols = rs.getMetaData();
            int numberOfCols = rsCols.getColumnCount();
            int comaNumber = 1;

            if (column.contains(",")) {
                comaNumber = column.split(",").length;
                multiCols = column.split(",");
            }else{
                multiCols[0]=column;
            }

            while (rs.next()) {

                for (cont = 1; cont <= numberOfCols; cont++) {

                    String numeCol = rsCols.getColumnName(cont);

                    int i = 0;
                    for (i = 0; i < comaNumber; i++){

                        if (numeCol.toUpperCase().equals(multiCols[i].toUpperCase())) {

                            if (multiCols[i] != null && rs.getString(numeCol) != null){
                                resp.put("ceva","altceva");
                                resp.put(multiCols[i],rs.getString(numeCol));
                            }




//                        return rs.getString(numeCol);
                        }

                    }
                }
            }
            System.out.println(resp);


//step5 close the connection object
//            con.close();

        } catch (Exception e) {
            System.out.println(e);
        } finally {
            try {
                if (con != null) {
                    con.close();
                }
            } catch (Exception e) {
//                logger.error("Canot close db connection: " + e);
                System.out.println(e);
            }
        }
    }

    }
}
