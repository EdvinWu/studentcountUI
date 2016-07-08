function loadUsers() {
    return fetch('http://localhost:8080/students')
        .then(function (response) {
            return response.json();
        });
}

function drawUserList() {
    loadUsers().then(function (users) {
        var userListTemplate = Handlebars.compile(document.querySelector('#user-list').innerHTML);
        var userTemplate = Handlebars.compile(document.querySelector('#user').innerHTML);

        var userList = '';
        users.forEach(function (user) {
            userList += userTemplate(user);
        });

        var userList = userListTemplate({
            body: userList
        });
        var userListContainer = document.createElement('div');
        userListContainer.innerHTML = userList;
        document.querySelector(".list").appendChild(userListContainer);

    });
}

function postStudent(event) {
    event.preventDefault();
    fetch('http://localhost:8080/students', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createStudent())
    }).then(function () {
        var qs = document.querySelector(".list");
        qs.removeChild(qs.lastElementChild);
        drawUserList();
    });

}

function createStudent() {
    var formName = document.user.name.value;
    var formSurname = document.user.surname.value;
    console.log(formName);
    console.log(formSurname);

    return {name: formName, surname: formSurname};
}
function deleteStudent(id){
    fetch('http://localhost:8080/students/'+id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        var qs = document.querySelector(".list");
        qs.removeChild(qs.lastElementChild);
        drawUserList();
    });
    console.log(id);
}
drawUserList();