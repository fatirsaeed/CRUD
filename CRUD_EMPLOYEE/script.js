var selectedRow = null;

// Show Alerts
function showAlert(message,className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".contaier");
    const main = document.querySelector(".main");
    container.insertBefore(div,main);
    
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}


//Clear All Fields
function clearFields(){
    document.querySelector("firstName").value = "";
    document.querySelector("lastName").value = "";
    document.querySelector("employeeID").value = "";
}

// Add Data
document.querySelector("#employeeForm").addEventListener("submit", (e) =>{
    e.preventDefault();

    //Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const employeeID = document.querySelector("#employeeID").value;

    //validate
    if(firstName == "" || lastName == "" || employeeID == ""){
        showAlert("Please fill in all fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#employeeList");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${employeeID}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Employee Added to the list", "success");
        }
         else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = employeeID;
            selectedRow = null;
            showAlert("Employee Info Edited", "info");
         }
         clearFields();
    }
});

//Edit Data
document.querySelector("employeeList").addEventListener("click", (e) =>{
    target=e.target;
    if(target.classlist.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("firstName").value = selectedRow.children[0].textContent;
        document.querySelector("lastName").value = selectedRow.children[1].textContent;
        document.querySelector("employeeID").value = selectedRow.children[2].textContent;
    }
})



//Delete Data
document.querySelector("#employeeList").addEventListener("click",(e)=>{
    target = e.target;
    if(target.classlist.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Employee Record Deleted","danger");
    }
});