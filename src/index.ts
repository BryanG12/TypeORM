import 'reflect-metadata'
import app from './app';

import { AppDateSource } from './db';



async function main() {
  try {
    
    await AppDateSource.initialize();
    console.log('Database connected');
    
    app.listen(3000);
    console.log('Server is running on port 3000');

  } catch (error) {
    console.error(error);
  }

}

main();


