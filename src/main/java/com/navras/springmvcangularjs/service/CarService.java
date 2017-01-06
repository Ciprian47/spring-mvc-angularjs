package com.navras.springmvcangularjs.service;

import com.navras.springmvcangularjs.beans.Car;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: navras
 * Date: 12/20/12
 * Time: 11:12 PM
 */
public interface CarService {
    public List<Car> getAllCars();

    public void addCar(Car car);

    public void deleteCar(Car car);

    public void deleteAll();

    public Car getCarById(Long id);

}
