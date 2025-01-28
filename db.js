// db.js
const sql = require('mssql/msnodesqlv8');

class Database {
    constructor() {
        this.config = {
            server: "DESKTOP-SBGDJ25\\SQLEXPRESS",
            database: "medicaltestreports",
            driver: "msnodesqlv8",
            options: {
                trustedConnection: true
            }
        };
        this.connection = null;
    }

    async getConnection() {
        if (!this.connection) {
            try {
                this.connection = await sql.connect(this.config);
                console.log("Connected to the database successfully!");
            } catch (err) {
                console.log("Database connection failed:", err);
            }
        }
        return this.connection;
    }

// New query function to execute SQL queries
    async query(queryString, inputs = []) {
        try {
            const connection = await this.getConnection();
            const request = new sql.Request(connection);

            // Add parameters to the query if they are provided
            inputs.forEach(input => {
                request.input(input.name, input.type, input.value);
            });

            // Execute the query and return the results
            const result = await request.query(queryString);
            return result.recordset;  // Return only the data from the query
        } catch (err) {
            console.error('Error executing query:', err);
            throw err; // Rethrow the error to be handled by the calling function
        }
    }
}

const databaseInstance = new Database();
Object.freeze(databaseInstance);

module.exports = databaseInstance;
