package com.navras.springmvcangularjs.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.navras.springmvcangularjs.beans.FrontFile;


@Service("FrontFileService")
public class FrontFileServiceImpl implements FrontFileService {
    
    private List<FrontFile> rsList = new ArrayList<FrontFile>();
    private Long id = 0L;
    final Logger logger  = LoggerFactory.getLogger("FrontFileServiceImpl");

    public FrontFile getFrontFileById(Long id) {
    	
    	return findFrontFileById(id);
    }

    private FrontFile findFrontFileById(Long id) {
        for (FrontFile rs : rsList) {
            if (rs.getId() == id) {
                return rs;
            }
        }

        return null;
    }

	public List<FrontFile> getAllFrontFiles() {
		return rsList;
	}


	public void addFrontFile(FrontFile frontFile) {
        Collection<File> all = new ArrayList<File>();
        logger.info("Started : {}",System.currentTimeMillis());

        addTree(new File(frontFile.getName()), all, frontFile);
        logger.info("Ended : {}", System.currentTimeMillis());

	}

	public void deleteFrontFileById(Long id) {
        FrontFile found = findFrontFileById(id);
        if (found != null) {
            rsList.remove(found);
            id--;
        }
		
	}

	public void updateFrontFile(FrontFile frontFile) {
        FrontFile found = findFrontFileById(frontFile.getId());
        if (found != null) {
            rsList.remove(found);
            rsList.add(frontFile);
        }
	}

    public void addTree(File file, Collection<File> all, FrontFile frontFile) {

        File[] children = file.listFiles();
        if (children != null) {
            for (File child : children) {
                boolean isFile = Files.isRegularFile(child.toPath());
                if (isFile) {
                    splitPath(child.toPath());
                }
                addTree(child, all, frontFile);

            }
        }
    }

    public void splitPath(Path path){
        String fullPath=path.toString();
        String fileName="";
        String pathName="";
        String fileExtension="";
        FrontFile frontFile = new FrontFile();
        frontFile.setId(++id);

        try {
            fileExtension = fullPath.substring(fullPath.lastIndexOf("."));
            frontFile.setExtension(fileExtension);

        }catch(Exception e){
//            e.printStackTrace();
        }finally {
            fileName = fullPath.substring(fullPath.lastIndexOf("\\") + 1);
            pathName = fullPath.substring(0, fullPath.lastIndexOf("\\"));

            frontFile.setName(fileName);
            frontFile.setPath(pathName);
            rsList.add(frontFile);

        }
    }
	
    @Override
    public void deleteAll() {
        rsList.clear();
        id = 0L;
    }
}
