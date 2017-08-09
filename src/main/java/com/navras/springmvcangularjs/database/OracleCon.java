package com.navras.springmvcangularjs.database;

import com.navras.springmvcangularjs.beans.Stock;
import com.navras.springmvcangularjs.service.StockBo;
import com.navras.springmvcangularjs.service.StockBoImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.sql.*;
import java.util.HashMap;

public class OracleCon{

    final static Logger logger = LoggerFactory.getLogger("OracleCon");

    private OracleCon(){

    }

//    public String getSql(String sql, String column){
//        initialize();
//
//
//        return "";
//    }

    public static void main(String args[]) {
//        OracleCon.initSql("insert into prima (id, text) values (5, 'cinci')", "id,text", "SET");
        ApplicationContext appContext =
                new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");

//        StockBo stockBo = (StockBo)appContext.getBean("stockBo");
        StockBo stockBo = new StockBoImpl();

        /** insert **/
        Stock stock = new Stock();
        stock.setStockCode("7668");
        stock.setStockName("HAIO");
        stockBo.save(stock);

        /** select **/
        Stock stock2 = stockBo.findByStockCode("7668");
        System.out.println(stock2);

        /** update **/
        stock2.setStockName("HAIO-1");
        stockBo.update(stock2);

        /** delete **/
        stockBo.delete(stock2);

        System.out.println("Done");

    }

    public static void initSql(String sql, String column, String action) {
        Connection con = null;
        HashMap<String, String> resp = new HashMap<>();
        String multiCols[] = new String[1];
        int cont = 0;
//        if (!column.trim().isEmpty() && !column.trim().equals("") && !column.contains("*")) {
            try {
                if (!sql.trim().isEmpty() && !sql.trim().equals("")) {
                    //DB initialization
                    Class.forName("oracle.jdbc.driver.OracleDriver");
                    con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "cld", "cld");
                    Statement stmt = con.createStatement();

                    logger.debug(sql);

                    if (!column.trim().isEmpty() && !column.trim().equals("") && !column.contains("*") && action.equals("GET")) {
                        //executing sql statement
                        ResultSet rs = stmt.executeQuery(sql);

                        //geting result set column names
                        ResultSetMetaData rsCols = rs.getMetaData();
                        int numberOfCols = rsCols.getColumnCount();
                        int comaNumber = 1;

                        if (column.contains(",")) {
                            comaNumber = column.split(",").length;
                            multiCols = column.split(",");

                        } else {
                            multiCols[0] = column;

                        }

                        while (rs.next()) {
                            for (cont = 1; cont <= numberOfCols; cont++) {
                                String numeCol = rsCols.getColumnName(cont);
                                int i = 0;

                                for (i = 0; i < comaNumber; i++) {
                                    if (numeCol.toUpperCase().equals(multiCols[i].toUpperCase())) {

                                        if (multiCols[i] != null && rs.getString(numeCol) != null) {
                                            resp.put(multiCols[i], rs.getString(numeCol));

                                        }
                                    }
                                }
                            }
                        }
                        System.out.println(resp);
                    }

                    if (action.equals("SET")) {
                        //executing sql statement
                        ResultSet rs = stmt.executeQuery(sql);
                    }
                }
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
//    }
}
