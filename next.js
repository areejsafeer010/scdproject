const sql = require("mssql/msnodesqlv8");

var config = {
    server: "DESKTOP-SBGDJ25\\SQLEXPRESS", // Your SQL Server instance
    database: "medicaltestreports", // Your database name
    driver: "msnodesqlv8", // Using the msnodesqlv8 driver
    options: { // Correcting the typo here
        trustedConnection: true // This uses Windows Authentication
    }
};

sql.connect(config, function (err) {
    if (err) {
        console.log(err);
    } else {
        var request = new sql.Request();
        request.query("SELECT * FROM Users", function (err, records) {
            if (err) {
                console.log(err);
            } else {
                console.log(records);
            }
        });
    }
});

