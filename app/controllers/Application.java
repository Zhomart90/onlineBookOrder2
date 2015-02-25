package controllers;

import play.*;
import play.mvc.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import models.*;

public class Application extends Controller {

	public static void signUp(User user) {
		user.save();
	}

	public static void signIn(String login, String password) {
		System.out.println("login: " + login);
		System.out.println("password: " + password);
		User connectedUser = User.find("byLoginAndPassword", login, password)
				.first();

		if (login.equals("") && password.equals("")) {
			flash.error("Введите пожалуйста ваш логин и пароль!");
			index();
		}
		if (login.equals("")) {
			flash.error("Введите пожалуйста ваш логин!");
			index();
		}
		if (password.equals("")) {
			flash.error("Введите пожалуйста ваш пароль!");
			index();
		}

		if (connectedUser != null) {
			if (connectedUser.getLogin().equals("admin")) {
				adminPage();
			} else {
				System.out.println("System will open userPage");
				userPage();
			}
		} else {
			System.out.println("No such user in database!");
			flash.error("Неверное имя пользователя или пароль!");
			index();
		}
	}

	public static void addBook(String name, String author, String date,
			int genreId) {
		Date manuDate = null;
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		try {
			manuDate = formatter.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Book book = new Book();
		book.setName(name);
		book.setAuthor(author);
		book.setManufacturedDate(manuDate);
		System.out.println("genreId is: " + genreId);
		Genre genre = Genre.findById(Long.valueOf(genreId));
		// System.out.println("genre name is: "+genre.getName());
		book.setGenre(genre);
		book.save();
		adminPage();
	}

	public static void getBooksById(int selectedGenreId) {
		System.out.println("getGenreById method is called");
		long id = Long.valueOf(selectedGenreId);
		System.out.println("id is " + id);
		Genre genre = Genre.findById(Long.valueOf(selectedGenreId));
		if (genre != null) {
			System.out.println("Genre is not null " + genre.getName());
			List<Book> books = genre.getBooks();
			Gson gson = new GsonBuilder()
					.excludeFieldsWithoutExposeAnnotation().create();
			String json = gson.toJson(books);
			renderJSON(json);
		}
	}

	public static void orderBook(String selectedBooks, String login) {
		List<Book> userOrderedBooks = new ArrayList<Book>();
		List<Book> newOrderedBooks = new ArrayList<Book>();
		System.out.println("selectedBooks " + selectedBooks);
		System.out.println(" login " + login);

		User user = User.find("byLogin", login).first();
		if (user != null) {
			System.out.println("We found user byLogin and his surname is: "
					+ user.getSurname());
		}
		userOrderedBooks = user.getBooks();
		System.out.println("userOrderedBooks size: " + userOrderedBooks.size());

		String[] orderedBooks = selectedBooks.split(",");

		for (int i = 0; i < orderedBooks.length; i++) {
			boolean youHaveThisBook = false;
			System.out.println("bookId: " + orderedBooks[i]);
			Book book = Book.findById(Long.valueOf(orderedBooks[i]));
			for (int j = 0; j < userOrderedBooks.size(); j++) {
				Book userBook = userOrderedBooks.get(j);
				if (userBook.getName().equals(book.getName())) {
					System.out.println("You have ordered this book yesterday!");
					youHaveThisBook = true;
					break;
				}
			}
			if (!youHaveThisBook) {
				System.out.println("You havent ordered this book name is: "
						+ book.getName());
				userOrderedBooks.add(book);
				newOrderedBooks.add(book);
			}
		}
		System.out.println("the size of userOrderedBooks: "
				+ userOrderedBooks.size());
		user.setBooks(userOrderedBooks);
		user.save();
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		String json = gson.toJson(newOrderedBooks);
		renderJSON(json);
	}

	public static void getAllGenres() {
		List<Genre> genres = Genre.all().fetch();
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		String json = gson.toJson(genres);
		renderJSON(json);
	}

	public static void getUserDataByLogin(String login) {
		System.out.println("getUserDataByLogin() method is called!");
		System.out.println("login: " + login);
		User connectedUser = User.find("byLogin", login).first();
		if (connectedUser != null) {
			System.out.println("connectedUser is not null: "
					+ connectedUser.getSurname());
		}
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		String json = gson.toJson(connectedUser);
		renderJSON(json);
	}

	public static void getUserOrderedBooks(String login) {
		System.out.println("getUserOrderedBooks() called");
		User user = User.find("byLogin", login).first();
		List orderedBooks = null;
		if (user != null) {
			System.out.println("We find user: " + user.getSurname());
			orderedBooks = user.getBooks();
		}
		System.out.println("ordered books : " + orderedBooks.size());
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		String json = gson.toJson(orderedBooks);
		renderJSON(json);

	}

	public static void adminPage() {
		System.out.println("adminPage method is called!");
		render();
	}

	public static void addGenre(Genre genre) {
		genre.save();
		adminPage();
	}

	public static void index() {
		render();
	}

	public static void signUpPage() {
		render();
	}

	public static void userPage() {
		System.out.println("We are in userPage method");
		render();
	}

}