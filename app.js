// VARIABLE DECLARATION
var bookArray = [];
var checked = true;
var editId;
var newBookName = bookname.value;
var newNAmeOfAuthor = nameOfAuthor.value;
var newNumbersOfPages = numberOfPages.value;
var companyName = document.querySelector("#company").value;
var year = document.querySelector("#year").value;

//  CHECK LOCALSTORAGE AND ADD NEW TO AVIOD OVERWRITTEN OF DATA

var bookInStore = JSON.parse(localStorage.getItem("BookSelf"));
if (bookInStore !== null) {
  bookArray = bookInStore;
}
// else{
//     alert("Empty self")
// }

// GETTTING INPUT FORM THE USER WHEN CLICKING ADD

function addBook() {
  var newBookName = bookname.value;
  var newNAmeOfAuthor = nameOfAuthor.value;
  var newNumbersOfPages = numberOfPages.value;
  var companyName = document.querySelector("#company").value;
  var year = document.querySelector("#year").value;
  if (checked !== true) {
    var index = bookInStore.findIndex((b) => b.BookID == editId);
    if (
      newBookName === "" ||
      newNAmeOfAuthor === "" ||
      newNumbersOfPages === ""
    ) {
      alert("Please fill all input");
    } else {
      bookInStore[index].BookName = newBookName;
      bookInStore[index]["Name Of Author"] = newNAmeOfAuthor;
      bookInStore[index]["Number Of Pages"] = newNumbersOfPages;
      bookInStore[index]["Company"] = companyName;
      bookInStore[index]["Year"] = year;

      localStorage.setItem("BookSelf", JSON.stringify(bookInStore));
      setTimeout(() => {
        self();
      }, 2000);
    }
  } else {
    if (
      bookname.value === "" ||
      nameOfAuthor.value === "" ||
      numberOfPages.value === "" ||
      year == "" ||
      companyName == ""
    ) {
      alert("Please, input all feild");
    } else {
      // Check if book exit before storing into the local storage

      var id = bookArray.length + 1;

      // GET USER'S INPUT AND PUT THEM IN AN OBJECT
      if (bookInStore !== null) {
        if (
          bookInStore.filter(
            (booky) =>
              booky.BookName == bookname.value &&
              booky["Name Of Author"] == nameOfAuthor.value &&
              booky["Number Of Pages"] == numberOfPages.value &&
              booky["Company"] == companyName &&
              booky["Year"] == year
          ).length == 0
        ) {
          var bookAdd = {
            BookName: bookname.value,
            "Name Of Author": nameOfAuthor.value,
            "Number Of Pages": numberOfPages.value,
            Company: companyName,
            Year: year,
            BookID: id,
          };

          // PUSH THE BOOK OBJECT INTO THE GLOBAL ARRAY

          bookArray.push(bookAdd);
          // SAVE USER'S DATA INTO LOCALSTORAGE

          localStorage.setItem("BookSelf", JSON.stringify(bookArray));
          self();
          bookname.value = "";
          nameOfAuthor.value = "";
          numberOfPages.value = "";
          companyName = "";
          year = "";
        } else {
          alert("Book already exit");
        }
      } else {
        var bookAdd = {
          BookName: bookname.value,
          "Name Of Author": nameOfAuthor.value,
          "Number Of Pages": numberOfPages.value,
          Company: companyName,
          Year: year,
          BookID: id,
        };

        // PUSH THE BOOK OBJECT INTO THE GLOBAL ARRAY

        bookArray.push(bookAdd);

        // SAVE USER'S DATA INTO LOCALSTORAGE

        localStorage.setItem("BookSelf", JSON.stringify(bookArray));
        self();
        bookname.value = "";
        nameOfAuthor.value = "";
        numberOfPages.value = "";
        company.value = "";
        year.value = "";
      }
    }
  }
}

// DISPLAY TABLE WHEN VIEW STORE IS CLICK

function displayBook() {
  self();
}

// DISPALAY BOOKS IN A TABLE FORM
function self() {
  if (bookInStore !== null) {
    var tbody = "";
    var count = 1;

    bookInStore.map((book) => {
      tbody += `
                    <tr>
                        <td>${count}</td>
                        <td>${book["Number Of Pages"]}</td>
                        <td>${book["Name Of Author"]}</td>
                        <td>${book.BookName}</td>
                        <td>${book["Company"]}</td>
                        <td>${book["Year"]}</td>
                        <td><button onclick="removeBook(${book.BookID})" id="del" class="btn btn-danger py-0"><span class='font-weight-bold'>-</span></button></td>
                        <td><button onclick="editBook(${book.BookID})" id="edit"class="btn btn-success py-0">Edit</button></td>
                    </tr>
                `;
      count++;
    });

    tableBody.innerHTML = tbody;
  } else {
    alert(
      "There is no document in the self currently, kindly add a document and check back"
    );
  }
}

// Removing book from the localstorage

function removeBook(book_id) {
  if (confirm("This book will be deleted from the list")) {
    var rem = bookInStore.findIndex(
      (remove, index) => remove.BookID == book_id
    );

    bookInStore.splice(rem, 1);
    console.log(bookInStore);
    localStorage.setItem("BookSelf", JSON.stringify(bookInStore));
    self();
  }
}

// Edit State

function editBook(del_id) {
  // GET  BOOK TO EDIT STATE WHEN EDIT BUTTON IS CLICKED
  var currentEdit = bookInStore.filter((book) => book.BookID == del_id);

  // SET CHECKED TO FALSE TO BE ABLE TO USE THE ADD BUTTON
  checked = false;

  // PASS THE VALUE BACK TO INPUT FIELD

  document.getElementById("addBook").innerText = "Update Book";
  bookname.value = currentEdit[0].BookName;
  nameOfAuthor.value = currentEdit[0]["Name Of Author"];
  companyName = currentEdit[0]["Company"];
  numberOfPages.value = parseInt(currentEdit[0]["Number Of Pages"]);
  year = parseInt(currentEdit[0]["Year"]);

  // GET THE EDIT BOOK ID WHICH WILL BE USED TO EDIT THE BOOK
  editId = del_id;
}

// SEARCH BOOK IN THE STORE

function searchBook() {
  if (bookInStore !== null) {
    bookArray = bookInStore;
  } else {
    bookArray = [];
  }
  var t_body = "";
  var count = 1;
  var searchItem = search.value.toLowerCase();
  var search_Result = bookInStore.filter(
    (book) => book.BookName.toLowerCase() == searchItem
  );

  if (search_Result.length == 0) {
    search_Result = bookInStore.filter(
      (book) => book.Company.toLowerCase() == searchItem
    );
    if (search_Result.length == 0) {
      alert("The book you search doesnt exist in our store");
    } else {
      t_body = `
    <tr>
    <td>${count}</td>
    <td>${search_Result[0]["Number Of Pages"]}</td>
    <td>${search_Result[0]["Name Of Author"]}</td>
    <td>${search_Result[0].BookName}</td>
    <td>${search_Result[0]["Company"]}</td>
    <td>${search_Result[0]["Year"]}</td>
    </tr>

`;

      tableBody.innerHTML = t_body;
    }
  } else {
    t_body = `
            <tr>
            <td>${count}</td>
            <td>${search_Result[0]["Number Of Pages"]}</td>
            <td>${search_Result[0]["Name Of Author"]}</td>
            <td>${search_Result[0].BookName}</td>
            <td>${search_Result[0]["Company"]}</td>
            <td>${search_Result[0]["Year"]}</td>
            </tr>
    
        `;

    tableBody.innerHTML = t_body;
  }
}
