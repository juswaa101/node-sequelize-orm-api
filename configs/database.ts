import { Sequelize } from "sequelize";

export = (() => {
    // setup db credentials
    const sequelize = new Sequelize('sequelize', 'root', '', {
        host: 'localhost',
        dialect: 'mariadb'
    });

    // connect to database
    return sequelize;
})();