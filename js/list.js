function loadUsers() {
    return fetch('http://localhost:8080/students')
        .then(function(response) {
            return response.json();
        });
}

function drawUserList() {
    loadUsers().then(function(users) {
        var userListTemplate = Handlebars.compile(document.querySelector('#user-list').innerHTML);
        var userTemplate = Handlebars.compile(document.querySelector('#user').innerHTML);

        var userList = '';
        users.forEach(function(user) {
            userList += userTemplate(user);
        });

        var userList = userListTemplate({
            body: userList
        });
        var userListContainer = document.createElement('div');
        userListContainer.innerHTML = userList;
        document.body.appendChild(userListContainer);
    });
}

function postStudent(event){
    event.preventDefault();
    fetch('http://localhost:8080/students',{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createStudent())
        }).then(location.reload());

}

function createStudent(){
    var formName = document.user.name.value;
    var formSurname = document.user.surname.value;
    console.log(formName);
    console.log(formSurname);

    return {name:formName, surname:formSurname};
}
drawUserList();