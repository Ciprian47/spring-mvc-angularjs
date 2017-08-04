package com.navras.springmvcangularjs.database;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
public class OracleCon{

    final Logger logger = LoggerFactory.getLogger("OracleCon");

    private OracleCon(){

    }

    public String getSql(String sql, String column){
        initialize();


        return "";
    }

    public void initialize(){
        Connection con = null;
        int count=0;
        try{
            Class.forName("oracle.jdbc.driver.OracleDriver");
            con=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe","cld","cld");
            Statement stmt=con.createStatement();

            ResultSet rs=stmt.executeQuery("select * from prima");

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnsNumber = rsmd.getColumnCount();

                while (rs.next()) {


                    for (count=1; count<=columnsNumber; count++){
                        String numeCol= rsmd.getColumnName(count);
                        String checkSte =numeCol.substring(0, 1);
                 rsmd.getColumnName(count);
                rs.getString(rsmd.getColumnName(count));
                    }
                }


//step5 close the connection object
            con.close();

        }catch(Exception e){
            System.out.println(e);
        }finally {
            try {
                if (con != null) {
                    con.close();
                }
            }catch(Exception e){
                logger.error("Canot close db connection: " + e);
            }
        }

    }
}
