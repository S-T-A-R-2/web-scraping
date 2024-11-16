import mysql, { QueryResult } from 'mysql2/promise';

export const connectDB = async (statement: string, word: string) => {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',    
        user: 'frijol',         
        password: 'arroz', 
        database: 'web_scraping',  
      });
      const res = await connection.query(statement, [word]);
      const data: any = res[0];
      // Query
  
      // Cerrar conecxion
      await connection.end();
      return data[0];
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  };