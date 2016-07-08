function loadUsers() {
    return fetch('./data/users.json')
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

drawUserList();