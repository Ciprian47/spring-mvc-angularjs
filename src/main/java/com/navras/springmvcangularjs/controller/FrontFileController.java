package com.navras.springmvcangularjs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.navras.springmvcangularjs.beans.FrontFile;
import com.navras.springmvcangularjs.service.FrontFileServiceImpl;

@Controller
@RequestMapping("/frontfiles")
public class FrontFileController {

    @Autowired
    private FrontFileServiceImpl frontFilesService;

    @RequestMapping("frontfilelist.json")
    public @ResponseBody List<FrontFile> getFrontFileList() {
        return frontFilesService.getAllFrontFiles();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public @ResponseBody void addFrontFile(@RequestBody FrontFile frontFile) {
        frontFilesService.addFrontFile(frontFile);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public @ResponseBody void updateFrontFile(@RequestBody FrontFile frontFile) {
        frontFilesService.updateFrontFile(frontFile);
    }

    @RequestMapping(value = "/remove/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void removeFrontFile(@PathVariable("id") Long id) {
        frontFilesService.deleteFrontFileById(id);
    }

    @RequestMapping(value = "/removeAll", method = RequestMethod.DELETE)
    public @ResponseBody void removeAllFrontFiles() {
        frontFilesService.deleteAll();
    }

    @RequestMapping("/layout")
    public String getFrontFilePartialPage(ModelMap modelMap) {
        return "frontfiles/layout";
    }
}
