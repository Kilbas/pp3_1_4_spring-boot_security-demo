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

// Загрузка информации о текущем пользователе в навигационную панель
async function getUserBar() {
    let answer = await fetch("/api/user/info");

    if (answer.ok) {
        let user = await answer.json();
        loadUserBar(user);
    } else {
        alert("Something went wrong, error status: " + answer.status);
    }
}

// Получение информации о текущем пользователе для таблицы
async function getUser() {
    let answer = await fetch("/api/user/info");

    if (answer.ok) {
        let user = await answer.json();
        tableUserUpdate(user);
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

// Получение списка всех пользователей (только для администратора)
async function getUsers() {
    let answer = await fetch("/api/admin/users");
    if (answer.ok) {
        let users = await answer.json();
        tableUsersUpdate(users);
    } else {
        alert("Something went wrong, error status: " + answer.status);
    }
}

// Сохранение нового пользователя (только для администратора)
async function saveUser(user) {
    const answer = await fetch("/api/admin/user", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    if (!answer.ok) {
        answer.status === 500 ? alert("The login is probably already taken, the attempt is impossible") : alert("Something went wrong, error status: " + answer.status);
    }
}

// Редактирование пользователя (только для администратора)
async function sendEditUser(user) {
    const answer = await fetch("/api/admin/user", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    if (!answer.ok) {
        answer.status === 500 ? alert("The login is probably already taken, the attempt is impossible") : alert("Something went wrong, error status: " + answer.status);
    }
}

// Удаление пользователя (только для администратора)
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
