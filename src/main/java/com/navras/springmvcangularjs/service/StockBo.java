package com.navras.springmvcangularjs.service;

import com.navras.springmvcangularjs.beans.Stock;

public interface StockBo {

    void save(Stock stock);
    void update(Stock stock);
    void delete(Stock stock);
    Stock findByStockCode(String stockCode);
}
