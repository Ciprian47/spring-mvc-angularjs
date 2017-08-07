package com.navras.springmvcangularjs.service;

import com.navras.springmvcangularjs.beans.Folder;

import java.util.List;

/**
 * Created by infrasoft25 on 8/7/2017.
 */
public interface FolderService {
    public List<Folder> getAllFolders();

    public void addFolder(Folder car);

    public void deleteFolder(Folder car);

    public void deleteAll();

    public Folder getFolderById(Long id);
}
