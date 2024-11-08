// Загрузка информации о текущем пользователе в навигационную панель
function loadUserBar(user) {
    const userBar = document.getElementById("userBar");
    userBar.innerHTML = `${user.login} your role: ${user.roles.map((role) => `${role.value}`).join(", ")}`;
}

// Обновление таблицы с информацией о текущем пользователе
function tableUserUpdate(user) {
    const tableUser = document.getElementById("tableUser");
    tableUser.innerHTML = `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.login}</td>
            <td>${user.roles.map((role) => `${role.value}`).join(", ")}</td>
        </tr>`;
}

// Обновление таблицы со списком пользователей (для администратора)
function tableUsersUpdate(users) {
    const tableUsers = document.getElementById("tableUsers");
    let result = "";
    for (let user of users) {
        result += `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.login}</td>
            <td>${user.roles.map((role) => `${role.value}`).join(", ")}</td>
            <td><button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#editModal" onclick="setPlaceholder('edit'); getUserId(${user.id},'edit')">Edit</button></td>
            <td><button type="button" class="btn btn-danger text-white" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="getUserId(${user.id},'delete')">Delete</button></td>
        </tr>`;
    }
    tableUsers.innerHTML = result;
}

// Валидация полей ввода
function validation(id, type, oldValidation) {
    let result = true;
    switch (type) {
        case "text":
            result = /^[а-яА-Яa-zA-Z]{2,}$/.test(id.value);
            if (!result) {
                id.value = "";
                id.placeholder = "letters only, length > 1";
            }
            break;
        case "login":
            result = /^[а-яА-Яa-zA-Z0-9]{2,}$/.test(id.value);
            if (!result) {
                id.value = "";
                id.placeholder = "only letters and numbers, length > 1";
            }
            break;
        case "age":
            result = /^\d+$/.test(id.value);
            if (!result || id.value < 0 || id.value > 100) {
                id.value = "";
                id.placeholder = "age must be between 0 and 100";
            }
            break;
        case "password":
            if (id.value.length < 3) {
                id.value = "";
                id.placeholder = "minimum 3 characters";
                result = false;
            }
            break;
        case "select":
            if (id.selectedOptions.length < 1) {
                document.getElementById(id.id + "Label").innerHTML = `<b><font color="red">You should choose a role</font></b>`;
                result = false;
            }
            break;
    }
    return oldValidation && result;
}

// Установка плейсхолдера для формы
function setPlaceholder(formId) {
    document.getElementById(formId + 'firstName').placeholder = "First Name";
    document.getElementById(formId + 'lastName').placeholder = "Last Name";
    document.getElementById(formId + 'age').placeholder = "Age";
    document.getElementById(formId + 'login').placeholder = "Login";
    document.getElementById(formId + 'password').placeholder = "Password";
}

// Получение списка ролей (для форм)
async function getRoles(type) {
    let answer = await fetch("/api/admin/roles");
    if (answer.ok) {
        let roles = await answer.json();
        setRoles(roles, type);
    } else {
        alert("Something went wrong, error status: " + answer.status);
    }
}

// Загрузка информации о текущем пользователе
async function getUserBar() {
    let answer = await fetch("/api/user/info");
    if (answer.ok) {
        let user = await answer.json();
        loadUserBar(user);
    } else {
        alert("Something went wrong, error status: " + answer.status);
    }
}

// Получение информации о пользователе по ID
async function getUserId(id, type) {
    let answer = await fetch(`/api/user/${id}`);
    if (answer.ok) {
        let user = await answer.json();
        await showUser(user, type);
    } else {
        alert("Something went wrong, error status: " + answer.status);
    }
}

// Получение списка всех пользователей (для администратора)
async function getUsers() {
    let answer = await fetch("/api/admin/users");
    if (answer.ok) {
        let users = await answer.json();
        tableUsersUpdate(users);
    } else {
        alert("Something went wrong, error status: " + answer.status);
    }
}

// Сохранение нового пользователя (для администратора)
async function saveUser(user) {
    const answer = await fetch("/api/admin/user", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    if (!answer.ok) {
        alert("Something went wrong, error status: " + answer.status);
    }
}

// Редактирование пользователя (для администратора)
async function sendEditUser(user) {
    const answer = await fetch("/api/admin/user", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    if (!answer.ok) {
        alert("Something went wrong, error status: " + answer.status);
    }
}

// Удаление пользователя (для администратора)
async function sendDeleteUser(user) {
    const answer = await fetch("/api/admin/user", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    if (!answer.ok) {
        alert("Something went wrong, error status: " + answer.status);
    }
}

// Установка ролей в форму
function setRoles(roles, type) {
    const elmRoles = document.getElementById(type);
    let result = "";
    for (let role of roles) {
        result += `<option value="${role.role}">${role.value}</option>`;
    }
    elmRoles.innerHTML = result;
}
