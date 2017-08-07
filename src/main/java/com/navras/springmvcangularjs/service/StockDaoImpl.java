package com.navras.springmvcangularjs.service;


import com.navras.springmvcangularjs.beans.Stock;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import java.util.List;

public class StockDaoImpl extends HibernateDaoSupport implements StockDao{

    public void save(Stock stock){
        getHibernateTemplate().save(stock);
    }

    public void update(Stock stock){
        getHibernateTemplate().update(stock);
    }

    public void delete(Stock stock){
        getHibernateTemplate().delete(stock);
    }

    public Stock findByStockCode(String stockCode){
        List list = getHibernateTemplate().find("from Stock where stock_Code=?", stockCode);
        return (Stock)list.get(0);
    }

}
