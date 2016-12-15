package com.navras.springmvcangularjs.service;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: navras
 * Date: 12/20/12
 * Time: 11:12 PM
 */
public interface BicicleService {
    public List<String> getAllBicicles();

    public void addBicicle(String bicicle);

    public void deleteBicicle(String bicicle);

    public void deleteAll();
}
