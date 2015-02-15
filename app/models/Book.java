package models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import com.google.gson.annotations.Expose;
import play.db.jpa.GenericModel;
import play.db.jpa.Model;

@Entity
@Table(name = "books")
public class Book extends GenericModel {
	@Id
	@Expose
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	@Expose
	private String name;
	@Expose
	private String author;
	@Expose
	private Date manufacturedDate;
	@Expose
	@ManyToOne
	private Genre genre;
	@Expose(serialize = false)
	@ManyToMany(mappedBy = "books")
	public List<User> users = new ArrayList<User>();

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Date getManufacturedDate() {
		return manufacturedDate;
	}

	public void setManufacturedDate(Date manufacturedDate) {
		this.manufacturedDate = manufacturedDate;
	}

	public Genre getGenre() {
		return genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}

	

}
