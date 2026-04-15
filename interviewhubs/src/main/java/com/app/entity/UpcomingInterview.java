package com.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class UpcomingInterview {
 
    @Id 
    @GeneratedValue
    private int id;
    private String company;
    private String role;
    private String date;
    private String location;
    private String mode;
    private String packageOffer;
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getPackageOffer() {
		return packageOffer;
	}
	public void setPackageOffer(String packageOffer) {
		this.packageOffer = packageOffer;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getLocation() {
		return location;
 
	}
	public void setLocation(String location) {
		this.location = location;
	}
}
 