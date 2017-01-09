package com.navras.springmvcangularjs.service;

import com.navras.springmvcangularjs.beans.Car;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: navras
 * Date: 12/20/12
 * Time: 11:14 PM
 */
@Service("carService")
public class CarServiceImpl implements CarService {
    private static List<Car> carList = new ArrayList<Car>();
    private static Long id = 0L;


    @Override
    public List<Car> getAllCars() {
        return carList;
    }

    @Override
    public void addCar(Car car) {
        car.setId(++id);
        carList.add(car);
    }

    @Override
    public void deleteCar(Car car) {
        Car foundCar = findCarById(id);
        if (foundCar != null) {
            carList.remove(foundCar);
            id--;
        }
    }


    @Override
    public void deleteAll() {
        carList.clear();
        id = 0L;
    }

    @Override
    public Car getCarById(Long id) {
        return findCarById(id);
    }

    private Car findCarById(Long id) {
        for (Car car : carList) {
            if (car.getId() == id) {
                return car;
            }
        }

        return null;
    }
}
