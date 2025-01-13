
class Book {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        }
}

class Student  {
    constructor(name, bookOwn) {
        this.name = name;
        this.bookHold = [];
    }
}


class Library {
    constructor() {
        this.bookStorage = [];
        this.bookHolders = [];
        this.avaliableBook = [];
    }
    addNewStudent(student){
        this.bookHolders.push(student);
    }

    addNewBook(book){
       this.bookStorage.push(book);
    }

    borrowBook(book, student){
        const holder = this.bookHolders.push(student);
        const result = this.bookStorage.findIndex(item => item.id === book);
        const holders = this.bookHolders.findIndex(person => person.name === student);
        const newHolder = this.bookHolders[holders].bookHold.push(this.bookStorage[result].name);
        return newHolder;
    }



    returnBook(book, student){

    }


    isAvaliable(book){
        const result = this.bookStorage.findIndex(item => item.id === book);
        if(result === -1){
            console.log(`${book} is already borrow` );
        }else{
            console.log(`Story about ${this.bookStorage[result].title} is available`)
        }
    }
}


const lib = new Library();




lib.addNewBook(new Book(10, 'Libertad'));
lib.addNewBook(new Book(82, 'Vermont'));
lib.addNewBook(new Book(5, 'Conde'));
lib.addNewBook(new Book(6, 'Petro'));
lib.addNewBook(new Book(4, 'Colombo'));
lib.addNewBook(new Book(1, 'Montana'));

lib.addNewStudent(new Student())

lib.borrowBook('5', 'Kate')

// console.log(borrow);


// console.log(est);
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