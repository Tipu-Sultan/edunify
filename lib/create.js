import db from "./db";

/**
 * Initializes the database and the schools table if they do not exist.
 * @returns {Promise<string>} - A message indicating the result of the operation.
 */
export async function setupDatabase() {
  try {
    // Create database if it doesn't exist
    await db.query('CREATE DATABASE IF NOT EXISTS edunify');

    // Use the edunify database
    await db.query('USE edunify');

    // Create schools table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        contact VARCHAR(20) NOT NULL,
        image VARCHAR(255),
        email_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=INNODB;
    `;
    await db.query(createTableQuery);

    return 'Database and table setup completed successfully.';
  } catch (error) {
    console.error('Error setting up database and table:', error);
    throw new Error('Failed to set up database and table.');
  }
}

// (async () => {
//   try {
//     const result = await setupDatabase();
//     console.log(result);
//   } catch (error) {
//     console.error(error.message);
//   }
// })();

