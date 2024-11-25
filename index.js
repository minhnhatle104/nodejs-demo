const express = require('express');
const app = express();
const port = 3000;
const expressHbs = require("express-handlebars");
const { createPagination } = require("express-handlebars-paginate");
const config = require("./config/config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
                ca: config.development.ca
            }
        }
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

app.use(express.static(process.cwd() + "/html"))

app.engine('hbs', expressHbs.engine({
    layoutsDir: process.cwd() + "/views/layouts",
    partialsDir: process.cwd() + "/views/partials",
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