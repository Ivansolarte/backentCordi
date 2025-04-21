import mysql from 'mysql2';

//  conexión
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dbcordinadora'
  });



connection.connect((err) => {
    if (err) {
      console.error(' Error de conexión a MySQL:', err);
      return;
    }
    console.log(' Conectado a la base de datos MySQL');
  });

export default connection;