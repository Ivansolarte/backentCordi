import mysql from 'mysql2';
console.log('🌍 ENTORNO:', process.env.DB_HOST);
console.log('🌍 ENTORNO:', process.env.DB_USER);
// Crear la conexión
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dbcordinadora'
  });



connection.connect((err) => {
    if (err) {
      console.error('❌ Error de conexión a MySQL:', err);
      return;
    }
    console.log('✅ Conectado a la base de datos MySQL');
  });

export default connection;