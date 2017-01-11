package com.navras.springmvcangularjs.beans;
//gfdg
public class RailwayStation {

	
	private Long id;
	
	private String name;
	
	private Train train;

	private String path;

	private String extension;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Train getTrain() {
		return train;
	}

	public void setTrain(Train train) {
		this.train = train;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}
}
