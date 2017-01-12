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

import com.navras.springmvcangularjs.beans.RailwayStation;


@Service("RailwayStationService")
public class RailwayStationServiceImpl implements RailwayStationService {
    
    private List<RailwayStation> rsList = new ArrayList<RailwayStation>();
    private Long id = 0L;
    final Logger logger  = LoggerFactory.getLogger("RailwayStationServiceImpl");

    public RailwayStation getRailwayStationById(Long id) {
    	
    	return findRailwayStationById(id);
    }

    private RailwayStation findRailwayStationById(Long id) {
        for (RailwayStation rs : rsList) {
            if (rs.getId() == id) {
                return rs;
            }
        }

        return null;
    }

	public List<RailwayStation> getAllRailwayStations() {		
		return rsList;
	}


	public void addRailwayStation(RailwayStation railwayStation) {
        Collection<File> all = new ArrayList<File>();
        logger.info("Started : {}",System.currentTimeMillis());

        addTree(new File(railwayStation.getName()), all, railwayStation);
        logger.info("Ended : {}", System.currentTimeMillis());

	}

	public void deleteRailwayStationById(Long id) {
        RailwayStation found = findRailwayStationById(id);
        if (found != null) {
            rsList.remove(found);
            id--;
        }
		
	}

	public void updateRailwayStation(RailwayStation railwayStation) {
        RailwayStation found = findRailwayStationById(railwayStation.getId());
        if (found != null) {
            rsList.remove(found);
            rsList.add(railwayStation);
        }
	}

    public void addTree(File file, Collection<File> all, RailwayStation railwayStation) {

        File[] children = file.listFiles();
        if (children != null) {
            for (File child : children) {
                boolean isFile = Files.isRegularFile(child.toPath());
                if (isFile) {
                    splitPath(child.toPath());
                }
                addTree(child, all, railwayStation);

            }
        }
    }

    public void splitPath(Path path){
        String fullPath=path.toString();
        String fileName="";
        String pathName="";
        String fileExtension="";
        RailwayStation railwayStation = new RailwayStation();
        railwayStation.setId(++id);

        try {
            fileExtension = fullPath.substring(fullPath.lastIndexOf("."));
            railwayStation.setExtension(fileExtension);

        }catch(Exception e){
//            e.printStackTrace();
        }finally {
            fileName = fullPath.substring(fullPath.lastIndexOf("\\") + 1);
            pathName = fullPath.substring(0, fullPath.lastIndexOf("\\"));

            railwayStation.setName(fileName);
            railwayStation.setPath(pathName);
            rsList.add(railwayStation);

        }
    }
	
    @Override
    public void deleteAll() {
        rsList.clear();
        id = 0L;
    }
}
