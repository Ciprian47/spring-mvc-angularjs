package com.navras.springmvcangularjs.controller;

import com.navras.springmvcangularjs.beans.Car;
import com.navras.springmvcangularjs.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: navras
 * Date: 12/21/12
 * Time: 12:23 AM
 */
@Controller
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarService carService;

    @RequestMapping("carlist.json")
    public @ResponseBody List<Car> getCarList() {
        return carService.getAllCars();
    }

    @RequestMapping(value = "/addCar", method = RequestMethod.POST)
    public @ResponseBody void addCar(@RequestBody Car car) {
        carService.addCar(car);
    }

    @RequestMapping(value = "/removeCar/{car}", method = RequestMethod.DELETE)
    public @ResponseBody void removeCar(@PathVariable("car") Car car) {
        carService.deleteCar(car);
    }

    @RequestMapping(value = "/removeAllCars", method = RequestMethod.DELETE)
    public @ResponseBody void removeAllCars() {
        carService.deleteAll();
    }

    @RequestMapping("/layout")
    public String getCarPartialPage(ModelMap modelMap) {
        return "cars/layout";
    }
}
