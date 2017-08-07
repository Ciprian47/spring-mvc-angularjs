package com.navras.springmvcangularjs.service;

import com.navras.springmvcangularjs.beans.Folder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by infrasoft25 on 8/7/2017.
 */
@Service("folderService")
public class FolderServiceImpl implements FolderService {
    private static List<Folder> folderList = new ArrayList<Folder>();

    @Override
    public List<Folder> getAllFolders() {
        return folderList;
    }

    @Override
    public void addFolder(Folder folder) {

    }

    @Override
    public void deleteFolder(Folder car) {

    }

    @Override
    public void deleteAll() {
        folderList.clear();
    }

    @Override
    public Folder getFolderById(Long id) {
        return null;
    }
}
