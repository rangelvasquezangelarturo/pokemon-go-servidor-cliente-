// Se escriben las interacciónes con la BD 

const users = {
    show: "SELECT * FROM users",
    view: "SELECT * FROM users WHERE id = ?",
    verifyEmail: "SELECT * FROM users WHERE email = ?",
    create : "INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)",
    delete: "DELETE FROM users WHERE id = ?",
    update: "UPDATE users SET name = ?, lastname = ?, email = ?, password = ? WHERE id = ?",
    viewByEmail: "SELECT * FROM users WHERE email = ?"  
}


module.exports = {
    users
};
