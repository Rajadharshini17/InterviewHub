package com.app.entity;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class InterviewExperience {
	
	@Id
	@GeneratedValue
	private int id;
	private String company;
	private String role;
	private String packageoffer;
	private String technologies;
	private int rounds;
	private int likes=0;
	private int dislikes;
	
	public void setDislikes(int dislikes) {
		this.dislikes = dislikes;
	}

	private String location;
	private String mode;
	private String email;
	
	
	@ManyToOne
	@JoinColumn(name = "approved_by")
	private Admin admin;
	

public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}



@OneToMany(mappedBy = "experience", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"experience", "replies", "parent"})


private List<Comment> comments;

	public List<Comment> getComments() {
	return comments;
}

public void setComments(List<Comment> comments) {
	this.comments = comments;
}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	@Column(length=2000)
	private String questions;
	
	private String experience;
	
	private String status="Pending";
	
	@ManyToOne
	private User user;

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

	public String getPackageoffer() {
		return packageoffer;
	}

	public void setPackageoffer(String packageoffer) {
		this.packageoffer = packageoffer;
	}

	public String getTechnologies() {
		return technologies;
	}

	public void setTechnologies(String technologies) {
		this.technologies = technologies;
	}

	public int getRounds() {
		return rounds;
	}

	public void setRounds(int rounds) {
		this.rounds = rounds;
	}

	public String getQuestions() {
		return questions;
	}

	public void setQuestions(String questions) {
		this.questions = questions;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public int getLikes() {
		return likes;
	}

	public int getDislikes() {
		return dislikes;
	}

}
