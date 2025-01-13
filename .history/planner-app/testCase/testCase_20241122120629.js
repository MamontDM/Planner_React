import Book from 'E:/VisualStudio/ProjectByReact/planner-app/testCase/book.js';
import Student from "./student.js";
import Library from "./library.js";

const lib = new Library();

const book1 = new Book('My Little Ponny', 'kidstory');
const book2 = new Book('Lord Of The Rings', 'epicFantasy');
const book3 = new Book('Star Ship Troppers', 'scientific fantastic' )


const user1 = new Student('Kate');
const user2 = new Student('Dmitriy')
const user3 = new Student('Sonya');












// public class Book {
//     private int id;
//     private String title;

// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }