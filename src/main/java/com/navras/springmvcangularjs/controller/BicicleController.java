package com.navras.springmvcangularjs.controller;

import com.navras.springmvcangularjs.service.BicicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
//import java.util.logging.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: navras
 * Date: 12/21/12
 * Time: 12:23 AM
 */
@Controller
@RequestMapping("/bicicles")
public class BicicleController {

    final Logger logger = LoggerFactory.getLogger("BicicleController");
//    final Logger logger = Logger.getLogger("ceva");

    @Autowired
    private BicicleService bicicleService;

    @RequestMapping("/biciclelist.json")
    public @ResponseBody List<String> getBicicleList() {
        return bicicleService.getAllBicicles();
    }

    @RequestMapping(value = "/addBicicle/{bicicle}", method = RequestMethod.POST)
    public @ResponseBody void addBicicle(@PathVariable("bicicle") String bicicle) {
        bicicleService.addBicicle(bicicle);
        logger.info("aici");
        logger.error("eroare");
//        logger.warn("warn");
//        logger.error("error");

    }

    @RequestMapping(value = "/removeBicicle/{bicicle}", method = RequestMethod.DELETE)
    public @ResponseBody void removeBicicle(@PathVariable("bicicle") String bicicle) {
        bicicleService.deleteBicicle(bicicle);
//        logger.info("Removed a bicicle "+bicicle);
    }

    @RequestMapping(value = "/removeAllBicicles", method = RequestMethod.DELETE)
    public @ResponseBody void removeAllBicicles() {
        bicicleService.deleteAll();
//        logger.info("Removed bicicles : ");

    }

    @RequestMapping("/layout")
    public String getBiciclePartialPage() {
        return "bicicles/layout";
    }
}
