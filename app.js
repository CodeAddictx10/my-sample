// VARIABLE DECLARATION
 var bookArray =[];
 var checked = true;
 var editId;


//  CHECK LOCALSTORAGE AND ADD NEW TO AVIOD OVERWRITTEN OF DATA

var bookInStore = JSON.parse(localStorage.getItem("BookSelf"))
if(bookInStore !== null){
    bookArray = bookInStore
}
// else{
//     alert("Empty self")
// }

// GETTTING INPUT FORM THE USER WHEN CLICKING ADD

function addBook(){

    if(checked !== true){
        var newBookName = bookname.value;
        var newNAmeOfAuthor = nameOfAuthor.value;
        var newNumbersOfPages = numberOfPages.value;

        var index = bookInStore.findIndex(b => b.BookID == editId)
        bookInStore[index].BookName = newBookName;
        bookInStore[index]["Name Of Author"] = newNAmeOfAuthor;
        bookInStore[index]["Number Of Pages"] = newNumbersOfPages;

        localStorage.setItem('BookSelf',JSON.stringify(bookInStore))

        self()
        // alert("Weldone")
    } else{
        if(bookname.value==="" || nameOfAuthor.value ===""||numberOfPages.value===""){
            alert("Please, input all feild")
        }else{
            // Check if book exit before storing into the local storage
                
                var id = bookArray.length + 1;
            
                // GET USER'S INPUT AND PUT THEM IN AN OBJECT
            if(bookInStore !== null){
                if(bookInStore.filter(booky=> booky.BookName == bookname.value && booky["Name Of Author"] == nameOfAuthor.value && booky["Number Of Pages"] == numberOfPages.value).length == 0){
    
                    var bookAdd = {BookName:bookname.value, "Name Of Author":nameOfAuthor.value,"Number Of Pages":numberOfPages.value, BookID: id}
                
                    // PUSH THE BOOK OBJECT INTO THE GLOBAL ARRAY 
                
                    bookArray.push(bookAdd)
                    // SAVE USER'S DATA INTO LOCALSTORAGE
                    
                    localStorage.setItem("BookSelf", JSON.stringify(bookArray))
                    self()
                    bookname.value = "";
                    nameOfAuthor.value ="";
                    numberOfPages.value =""
                }else{
                    alert('Book already exit')
                }
            } else{
                var bookAdd = {BookName:bookname.value, "Name Of Author":nameOfAuthor.value,"Number Of Pages":numberOfPages.value, BookID: id}
                
                    // PUSH THE BOOK OBJECT INTO THE GLOBAL ARRAY 
                
                    bookArray.push(bookAdd)
                
                    // SAVE USER'S DATA INTO LOCALSTORAGE
                    
                    localStorage.setItem("BookSelf", JSON.stringify(bookArray))
                    self()
                    bookname.value = "";
                    nameOfAuthor.value ="";
                    numberOfPages.value =""
            }
    
            
        }
    }

 
}

// DISPLAY TABLE WHEN VIEW STORE IS CLICK

function displayBook(){
    self()
}


// DISPALAY BOOKS IN A TABLE FORM
function self(){

    if(bookInStore !== null){
        var tbody = "";
        var count = 1;
        
        // for (let index = 0; index < bookInStore.length;  index++) {
    
        //     tbody += `
        //         <tr>
        //             <td>${count}</td>
        //             <td>${bookInStore[index]["BookName"]}</td>
        //             <td>${bookInStore[index]["Name Of Author"]}</td>
        //             <td>${bookInStore[index]["Number Of Pages"]}</td>
        //             <td><button onclick="removeBook(${bookInStore[index].BookID})" id="del" class="red"><i class="fas fa-times fa-2x"></i></button></td>
        //             <td><button onclick="editBook(${bookInStore[index].BookID})" id="edit"class="green"><i class="fas fa-pen-square fa-2x"></i></button></td>
        //         </tr>
            
        //     `
            
        //     count ++
        // }

        bookInStore.map(book=>
            {
                tbody += 
                `
                    <tr>
                        <td>${count}</td>
                        <td>${book.BookName}</td>
                        <td>${book["Name Of Author"]}</td>
                        <td>${book["Number Of Pages"]}</td>
                        <td><button onclick="removeBook(${book.BookID})" id="del" class="red"><i class="fas fa-times fa-2x"></i></button></td>
                        <td><button onclick="editBook(${book.BookID})" id="edit"class="green"><i class="fas fa-pen-square fa-2x"></i></button></td>
                    </tr>
                `
                count++
            })
    
        tableBody.innerHTML = tbody
    } else{
       res.style.display = "block"
    }

}

// Removing book from the localstorage

function removeBook(book_id){
    var rem = bookInStore.findIndex((remove,index)=> remove.BookID == book_id)
    
     bookInStore.splice(rem,1)
    console.log(bookInStore)
    localStorage.setItem("BookSelf",JSON.stringify(bookInStore))
    self()
}


// Edit State

function editBook(del_id){
    // GET  BOOK TO EDIT STATE WHEN EDIT BUTTON IS CLICKED
    var currentEdit = bookInStore.filter(book=> book.BookID == del_id)

    // SET CHECKED TO FALSE TO BE ABLE TO USE THE ADD BUTTON
    checked = false;

    // PASS THE VALUE BACK TO INPUT FIELD

    bookname.value = currentEdit[0].BookName;
    nameOfAuthor.value = currentEdit[0]["Name Of Author"];;
    numberOfPages.value = parseInt(currentEdit[0]["Number Of Pages"]);

    // GET THE EDIT BOOK ID WHICH WILL BE USED TO EDIT THE BOOK
    editId = del_id;  

}

// SEARCH BOOK IN THE STORE

function searchBook(){
    var t_body ="";
    var count = 1;
    var searchItem = search.value;
    var search_Result = bookInStore.filter(book=> book.BookName == searchItem)

    if(search_Result.length == 0){
        alert("The Book is not in the store")
    } else
    { 
    t_body = `
            <tr>
            <td>${count}</td>
            <td>${search_Result[0].BookName}</td>
            <td>${search_Result[0]["Name Of Author"]}</td>
            <td>${search_Result[0]["Number Of Pages"]}</td>
            </tr>
    
        `

    tableBody.innerHTML =t_body;
}

}

