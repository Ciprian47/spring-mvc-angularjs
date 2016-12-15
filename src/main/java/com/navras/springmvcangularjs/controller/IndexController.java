package com.navras.springmvcangularjs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created with IntelliJ IDEA.
 * User: navras
 * Date: 12/20/12
 * Time: 5:27 PM
 */
@Controller
@RequestMapping("/")
public class IndexController {

    @RequestMapping
    public String getIndexPage() {
        return "index";
    }
}
