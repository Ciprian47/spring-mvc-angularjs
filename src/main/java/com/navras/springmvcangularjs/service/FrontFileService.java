package com.navras.springmvcangularjs.service;

import com.navras.springmvcangularjs.beans.FrontFile;

import java.util.List;


public interface FrontFileService {
	
    public List<FrontFile> getAllFrontFiles();

    public FrontFile getFrontFileById(Long id);

    public void addFrontFile(FrontFile FrontFile);

    public void deleteFrontFileById(Long id);

    public void deleteAll();

    public void updateFrontFile(FrontFile FrontFile);
}
