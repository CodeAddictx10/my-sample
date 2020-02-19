// VARIABLE DECLARATION
 var bookArray =[];


//  CHECK LOCALSTORAGE AND ADD NEW TO AVIOD OVERWRITTEN OF DATA

var bookInStore = JSON.parse(localStorage.getItem("BookSelf"))
if(bookInStore !== null){
    bookArray = bookInStore
}else{
    alert("Empty self")
}

// GETTTING INPUT FORM THE USER WHEN CLICKING ADD

function addBook(){
    var id = bookArray.length+1;

    // GET USER'S INPUT AND PUT THEM IN AN OBJECT

    var bookAdd={BookName:bookname.value, "Name Of Author":nameOfAuthor.value,"Number Of Pages":numberOfPages.value, BookID: id}

    // PUSH THE BOOK OBJECT INTO THE GLOBAL ARRAY 

    bookArray.push(bookAdd)

    // SAVE USER'S DATA INTO LOCALSTORAGE
    
    localStorage.setItem("BookSelf", JSON.stringify(bookArray))

    self()
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
        
        for (let index = 0; index < bookInStore.length;  index++) {
    
            tbody += `
                <tr>
                    <td>${count}</td>
                    <td>${bookInStore[index]["BookName"]}</td>
                    <td>${bookInStore[index]["Name Of Author"]}</td>
                    <td>${bookInStore[index]["Number Of Pages"]}</td>
                </tr>
            
            `
            
            count ++
        }
    
        tableBody.innerHTML = tbody
    } else{
        alert("Nothing to display")
    }

}


