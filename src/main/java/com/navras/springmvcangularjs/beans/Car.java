package com.navras.springmvcangularjs.beans;

/**
 * Created with IntelliJ IDEA.
 * User: navras
 * Date: 12/21/12
 * Time: 12:19 AM
 */
public class Car {

    private Long id;
    private String name;

    public Car() { }

    public Car(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String car) {
        this.name = name;
    }

}
