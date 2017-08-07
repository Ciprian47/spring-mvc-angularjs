package com.navras.springmvcangularjs.controller;

import com.navras.springmvcangularjs.beans.Folder;
import com.navras.springmvcangularjs.service.FolderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
//import java.util.logging.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: navras
 * Date: 12/21/12
 * Time: 12:23 AM
 */
@Controller
@RequestMapping("/folders")
public class FolderController {

    final Logger logger = LoggerFactory.getLogger("FolderController");
//    final Logger logger = Logger.getLogger("ceva");

    @Autowired
    private FolderService folderService;

    @RequestMapping("/folderlist.json")
    public @ResponseBody List<Folder> getFolderList() {
        return folderService.getAllFolders();
    }

    @RequestMapping(value = "/addFolder/{folder}", method = RequestMethod.POST)
    public @ResponseBody void addFolder(@PathVariable("folder") Folder folder) {
        folderService.addFolder(folder);
        logger.info("aici");
        logger.error("eroare");
//        logger.warn("warn");
//        logger.error("error");

    }

    @RequestMapping(value = "/removeFolder/{folder}", method = RequestMethod.DELETE)
    public @ResponseBody void removeFolder(@PathVariable("folder") Folder folder) {
        folderService.deleteFolder(folder);
//        logger.info("Removed a folder "+folder);
    }

    @RequestMapping(value = "/removeAllFolders", method = RequestMethod.DELETE)
    public @ResponseBody void removeAllFolders() {
        folderService.deleteAll();
//        logger.info("Removed folders : ");

    }

    @RequestMapping("/layout")
    public String getFolderPartialPage() {
        return "folders/layout";
    }
}
