// Acciones que hacen los endpoints

const {request , response } = require('express');
const userQueries = require('../models/user');
const pool = require('../config/dbconection');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const showUsers =  async (req= request, res =response) => {
    let conn;
    try {
        //se pone lo que se quiere hacer
        conn = await pool.getConnection();
        const users = await conn.query(userQueries.users.show);
        res.send(users); 
    } catch (err) {
        res.status(500).send("error");
    } finally {
        if (conn) conn.end();
    }
}

const viewUser = async (req= request, res =response) => {
    let conn;
    try {
        const {id} = req.params
        if (isNaN(Number(id))) {
            res.status(400).send("Esto no es un numero");
            return;
        }
        conn = await pool.getConnection();
        const user = await conn.query(userQueries.users.view, [id]);
        if (!user) {
            res.status(404).send("Usuario no encontrado");
            return;
        }
        //console.log(user);
        res.send(user);
    } catch (err) {
        res.status(500).send("error");
    } finally {
        if (conn) conn.end(viewUser);
    }

}

const createUser = async (req = request, res = response) => {
    const {name, lastname, email, password} = req.body;
    if (!name || !lastname || !email || !password){
        res.status(400).send("Faltan datos");
        return;
    }
    //if(require('../models/user').users.find((u)=> u.email === email)){
    ///    res.status(400).send(`Este usuario con correo ${email} ya existe`);
    //    return;
    //}
    if (password.length < 6){
        res.status(400).send("La contraseña debe tener al menos 6 caracteres");
        return;
    }
    //require('../models/user').users.push({
    //    id: require('../models/user').users.length + 1,
    //    name, 
    //    lastname, 
    //    email, 
    //    password
    //}); 
    //res.send({msg: "Usuario creado ", user : {name, lastname, email, password}});
    //res.send(req.body)
    let conn;
    try {
        conn = await pool.getConnection();
        const userExist = await conn.query( userQueries.users.verifyEmail, [email]);
        if (userExist.length > 0) {
            res.status(400).send(`Este usuario con correo ${email} ya existe`);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userCreated = await conn.query(userQueries.users.create, [name, lastname, email, hashedPassword]);

        if (userCreated.affectedRows === 0) {
            res.status(500).send("No se pudo crear el usuario");
            return;
        }
        res.send(`Usuario creado con id ${userCreated.insertId}`);
    } catch (err) {
        res.status(500).send("error");
    } finally {
        if (conn) conn.end();
    }
}

const removeUser = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(Number(id))) {
        res.status(400).send("Esto no es un numero");
        return
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const userExist = conn.query(userQueries.users.view,[id]);
        if (!userExist) {
            res.status(404).send("Usuario no encontrado");
            return;
        }
        const userDeleted = await conn.query(userQueries.users.delete, [id]);

        if (userDeleted.affectedRows === 0) {
            res.status(500).send("No se pudo eliminar el usuario");
            return;
        }
        res.send(`Usuario con id ${id} eliminado`);
    } catch (err) {
        res.status(500).send("error");
    } finally {
        if (conn) conn.end();
    }

    // if (!require('../models/user').users.find((user)=> user.id === +id)){
    //     require('../models/user').users = 
    //     require('../models/user').users.filter((user)=> user.id !== +id);
    //     res.send({msg: `Usuario con id ${id} eliminado`});
    //     return; 
    // }
    //res.status(404).send("Usuario no encontrado");
}


const updateUser = async (req = request, res = response) => {
    const {id} = req.params;
    
    if (isNaN(Number(id))) {
        res.status(400).send("Esto no es un numero");
        return;
    }

    let conn;

    try {
        conn = await pool.getConnection();
        const [user] = await conn.query(userQueries.users.view, [id]);

        if (!user){
        res.status(404).send("Usuario no encontrado");
        return;
        }
        const {name, lastname, email, password} = req.body;

        let hashedPassword;
        if (password) {
             hashedPassword = await bcrypt.hash(password, saltRounds);
        } else {
             hashedPassword = user.password;
        }

        const userToUpdate = {
        //id: user.id, //Pasamos el id que ya tenia
        name: name || user.name, //Si no viene name en el body, se queda con el que ya tenia
        lastname: lastname || user.lastname, //Si no viene lastname en el body, se queda con el que ya tenia
        email: email || user.email, //Si no viene email en el body, se queda con el que ya tenia
        password: hashedPassword                    //password || user.password //Si no viene password en el body, se queda con el que ya tenia
        };

        const userUpdate = await conn.query(userQueries.users.update, [
            userToUpdate.name,
            userToUpdate.lastname,
            userToUpdate.email,
            userToUpdate.password,
            id
        ]);

        if (userUpdate.affectedRows === 0) {
            res.status(500).send("No se pudo actualizar el usuario");
            return;
        }
        res.send({msg: "Usuario actualizado", user: userToUpdate});
    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    } finally {
        if (conn) conn.end();
    }
    //const user = require('../models/user').users.find((user)=> user.id === +id);
    
    //require('../models/user').users = require('../models/user').users.map((u) => u.id === +id ? userUpdate : u);

    
}

const loginUser = async (req = request, res = response) => {
    const {email, password} = req.body;

    if (!email || !password){
        res.status(400).send("Faltan datos");
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const [user] = await conn.query(userQueries.users.viewByEmail, [email]);

        if (!user) {
            res.status(404).send("Usuario no encontrado");
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).send("Usuario o contraseña incorrectos");
            return;
        }

        delete user.password; //Eliminar la contraseña antes de enviar la respuesta
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send("error");
    } finally {
        if (conn) conn.end();
    }
}
 module.exports = {
    showUsers,
    viewUser,
    createUser,
    removeUser,
    updateUser,
    loginUser
}
