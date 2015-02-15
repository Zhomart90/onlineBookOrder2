package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import play.db.jpa.GenericModel;
import play.db.jpa.Model;

import com.google.gson.annotations.Expose;
import com.sun.xml.internal.ws.api.server.Module;

@Entity
@Table(name = "genres")
public class Genre extends GenericModel {
	@Id
	@Expose
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	@Expose
	private String name;
	@Expose(serialize = false)
	@OneToMany(cascade=CascadeType.ALL, mappedBy="genre")
    public List<Book> books;

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

}
