package com.app.entity;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Comment {
 
    @Id
    @GeneratedValue
    private int id;
    private String message;
    @ManyToOne(fetch = FetchType.EAGER)
      @JoinColumn(name = "user_id")
      @JsonIgnoreProperties({
          "password",
          "username",
          "email",
          "phone",
          "qualification",
          "experienceLevel",
          "hobby",
          "experiences"  
      })
      private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @JsonIgnoreProperties({"replies", "experience", "user"})
    private Comment parent;
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"parent", "experience"})
    private List<Comment> replies;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id")
    @JsonIgnoreProperties({
           "user",
           "comments",
           "likes",
           "dislikes"
       })
      private InterviewExperience experience;

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public User getUser() {
		return user;
	}
	public InterviewExperience getExperience() {
		return experience;
	}

	public void setExperience(InterviewExperience experience) {
		this.experience = experience;
	}

	public void setUser(User user2) {
		
		this.user = user2;
	}

	public Comment getParent() {
		return parent;
	}

	public List<Comment> getReplies() {
		return replies;
	}

	public void setReplies(List<Comment> replies) {
		this.replies = replies;
	}

	public void setParent(Comment parent2) {
		
		this.parent = parent2;
	}
 
    
}
