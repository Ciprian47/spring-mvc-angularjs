package com.navras.springmvcangularjs.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: navras
 * Date: 12/20/12
 * Time: 11:14 PM
 */
@Service("bicicleService")
public class BicicleServiceImpl implements BicicleService {
    private static List<String> bicicleList = new ArrayList<String>();

    @Override
    public List<String> getAllBicicles() {
        return bicicleList;
    }

    @Override
    public void addBicicle(String bicicle) {
        bicicleList.add(bicicle);
    }

    @Override
    public void deleteBicicle(String bicicle) {
        if (bicicleList.contains(bicicle)) {
            bicicleList.remove(bicicle);
        }
    }

    @Override
    public void deleteAll() {
        bicicleList.clear();
    }
}
