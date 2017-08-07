package com.navras.springmvcangularjs.beans;

/**
 * Created by infrasoft25 on 8/7/2017.
 */
public class Folder {

    private Long id;
    private String name;

    public Folder() { }

    public Folder(Long id, String name) {
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
