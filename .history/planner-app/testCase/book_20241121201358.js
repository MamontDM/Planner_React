
class Book {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        }
}

class Student  {
    constructor(name) {
        this.name = name;
        this.bookHold = null;
    }
}


class Library {
    constructor() {
        this.bookStorage = [];
        this.bookHolders = [];
        this.avaliableBook = [];
    }

    addNewBook(book){
       this.bookStorage.push(book);
    }

    borrowBook(bookId, student){
       return this.bookStorage[book.name];
    }
    isAvaliable(bookId){
  
        // const result = this.bookStorage.findIndex(item => item.id === bookId);
    }
}

const lib = new Library();

lib.addNewBook(new Book(10, 'Libertad'));
lib.addNewBook(new Book(82, 'Vermont'));
lib.addNewBook(new Book(7, 'Conde'));
lib.addNewBook(new Book(6, 'Petro'));
lib.addNewBook(new Book(4, 'Colombo'));
lib.addNewBook(new Book(1, 'Montana'));

const est = lib.isAvaliable(7);

console.log(est);
// console.log(lib.bookStorage);


// public class Book {
//     private int id;
//     private String title;
// public interface Library {
//     void addNewBook(Book book);

//     void borrowBook(Book book, String student);

//     void returnBook(Book book, String student);

//     List<Book> getAvailableBooks();
// }