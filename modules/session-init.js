const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const storeOptions = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
};

const options = {
	secret: process.env.SESSION_SALT,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false },
	store: new MySQLStore(storeOptions)
}

module.exports = () => session(options);