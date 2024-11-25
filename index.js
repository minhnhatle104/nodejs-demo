const express = require('express');
const app = express();
const port = 3000;
const expressHbs = require("express-handlebars");
const { createPagination } = require("express-handlebars-paginate");

const fs = require('fs');
const path = require('path');
require('dotenv').config({
    path: '.env',
    override: true,
});; // Load environment variables from .env file and override username ( default username = username of local machine)

// Path to the config.json file
const configPath = path.join(__dirname, './config/config.json');

// Read and parse the existing config.json
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const currentUsername = config.development.username;
const currentPassword = config.development.password;
const currentDB = config.development.database;
const currentHost = config.development.host;
const currentCa = config.development.dialectOptions.ssl.ca;

if (currentCa !== process.env.ca || currentUsername !== process.env.username || currentPassword !== process.env.password
    && currentDB != process.env.database || currentHost != process.env.host
) {
    // Update the value dynamically
    config.development.username = process.env.username;
    config.development.password = process.env.password;
    config.development.database = process.env.database;
    config.development.host = process.env.host;
    config.development.dialectOptions.ssl.ca = process.env.ca;
    // Rewrite the updated configuration back to config.json
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    console.log('config.json updated successfully.');
}

app.use(express.static(__dirname + "/html"))

app.engine('hbs', expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: "hbs",
    defaultLayout: "layout",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        createPagination,
        formatDate: (date) => {
            return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
    },
})
);

app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    res.redirect("/blogs")
});
app.use("/blogs", require("./routes/blogRouter"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));