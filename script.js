var print_div = document.getElementById("print");
//submit button
let submit = document.getElementById("btn");

let allBookNames = [];
const bookStorage = JSON.parse(localStorage.getItem("localData")) ?? []

//locale storage
function lclStorage(){
    bookStorage.push({
        titl : book.titl,
        auteur : book.auteur,
        Email : book.Email,
        langue : book.langue,
        tipe : book.type,
        date : book.date,
        prix : book.prix
    });
    localStorage.setItem("localData", JSON.stringify(bookStorage));
}



//click on add Book to add a book
submit.addEventListener('click', function addBook(event){
    event.preventDefault();
    //get values
    class newBook{
        constructor (titl, auteur, Email, langue, type, date, prix){
            this.titl = titl;
            this.auteur = auteur;
            this.Email = Email;
            this.langue = langue;
            this.type = type;
            this.date = date;
            this.prix = prix;
        }
        detailOuvrage(){
            let allInfos = `L'ouvrage "${book.titl}" est un ${book.type} en langue ${book.langue}, écrit par "${book.auteur}" et publié le ${book.date}. Le prix de "${book.titl}" est de ${book.prix} Dhs.`;
            alert(allInfos);
        }
    }
    book = new newBook(
        document.getElementById("titl").value,
        document.getElementById("auteur").value,
        document.getElementById("Email").value,
        document.getElementById("langue").value,
        document.querySelector('input[name="Type"]:checked').value,
        document.getElementById("date").value,
        document.getElementById("prix").value
    );

    //check email input
    let at = /@/;
    let domain = /.com/;
    let result1 = at.test(book.Email);
    let result2 = domain.test(book.Email);

    if ((book.bookName == "") || (book.auteur == "") || (book.Email == "") || (book.date == "") || (book.prix == "") || (book.langue == "Langue") || (book.langue == "") ){
        alert("fill all blanks");
    }
    else if((book.titl.length > 30) || (book.auteur.length > 30)){
        alert("try less characters");
    }
    else if(prix <= 0){
        alert("enter a correct price");
    }
    else if((result1 == false) || (result2 == false)){
        alert("enter a valid Email");
    }
    else{
        lclStorage();

        //sort book Names
        alltitles.push(book.titl);
        alltitles.sort();
        let index = 1;
        index += allBookNames.indexOf(book.titl);
        var table = document.getElementById('table');

        //add rows to the table
        var row = table.insertRow(index);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

        //add values to table cells
        cell1.innerHTML = book.titl;
        cell2.innerHTML = book.auteur;
        cell3.innerHTML = book.prix;
        cell4.innerHTML = book.date;
        cell5.innerHTML = book.langue;
        cell6.innerHTML = book.type;
        cell7.innerHTML = book.Email;
        cell8.innerHTML = '<button type="button" value="Edit" class="modify" id="modify" onclick="ModifyRow(this)">Modify</button>';
        cell9.innerHTML = '<button class="delete" onclick="deleteRow(this)">Delete</button>';

        //make the input boxes empty again
        document.getElementById("titl").value = "";
        document.getElementById("auteur").value = "";
        document.getElementById("date").value = "";
        document.getElementById("prix").value = "";
        document.getElementById("Email").value = "";

        //show all book infos (DétailOuvrage):
        book.detailOuvrage();
    }
});

//click on delete button to delete row
function deleteRow(r){
    if(confirm('You sure you want to delete this row?')){
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("table").deleteRow(i);
    }
}

// make the input boxes empty again
function resetForm(){
    document.getElementById("titl").value = "";
    document.getElementById("auteur").value = "";
    document.getElementById("date").value = "";
    document.getElementById("prix").value = "";
    document.getElementById("langue").value = "";
    document.getElementById("Email").value = "";
}

// edit       
function ModifyRow(r){
    var i = r.parentNode.parentNode.rowIndex;
    var R = table.rows[i];
    if(document.getElementById("modify").value == "Edit"){
        document.getElementById("titl").value = R.cells[0].innerHTML;
        document.getElementById("auteur").value = R.cells[1].innerHTML;
        document.getElementById("Email").value = R.cells[2].innerHTML;
        document.getElementById("langue").value = R.cells[3].innerHTML;
        document.getElementById("prix").value = R.cells[6].innerHTML;
        document.getElementById("date").value = R.cells[5].innerHTML;
        document.querySelector('input[name="Type"]:checked').value = R.cells[4].innerHTML;

        document.getElementById("modify").value = "save";
        document.getElementById('btn').setAttribute("disabled","true");         
    }     
    else{
        R.cells[0].innerHTML = document.getElementById("titl").value;
        R.cells[1].innerHTML =  document.getElementById("auteur").value;
        R.cells[2].innerHTML =  document.getElementById("Email").value;
        R.cells[6].innerHTML =  document.getElementById("prix").value;
        R.cells[5].innerHTML =  document.getElementById("date").value;
        R.cells[3].innerHTML =  document.getElementById("langue").value;
        R.cells[4].innerHTML = document.querySelector('input[name="Type"]:checked').value 
        document.getElementById("modify").value = "Edit";
        document.getElementById('btn').removeAttribute("disabled");  
        resetForm();          
    } 
};

//fixed table infos
function tableau(){
    const bookStorage = JSON.parse(localStorage.getItem("localData")) ?? [];
    let i = 0;
    allBookNames = [];

    while(i <= bookStorage.length){
        alltitles.push(bookStorage[i].titre);
        alltitles.sort();
        var index2 = 1;
        index2 += alltitles.indexOf(bookStorage[i].titre);

        //add rows to the table
        var table = document.getElementById('table');
        var row = table.insertRow(index2);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

        //add values to table cells
        cell1.innerHTML = bookStorage[i].titl;
        cell2.innerHTML = bookStorage[i].auteur;
        cell3.innerHTML = bookStorage[i].prix;
        cell4.innerHTML = bookStorage[i].date;
        cell5.innerHTML = bookStorage[i].langue;
        cell6.innerHTML = bookStorage[i].tipe;
        cell7.innerHTML = bookStorage[i].Email;
        cell8.innerHTML = '<button type="button" value="Edit" class="modify" id="modify" onclick="ModifyRow(this)">Modify</button>';
        cell9.innerHTML = '<button class="delete" onclick="deleteRow(this)">Delete</button>';
        i++;
    }
}
tableau();
function print_btn(){
    var temp_div = print_div.innerHTML;
    var temp_body = document.body.innerHTML;
    document.body.innerHTML = temp_div;
    window.print();
    document.body.innerHTML = temp_body;
}

form_el.addEventListener("submit", validate)