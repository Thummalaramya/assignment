module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "your_password",
    DB: "store_ratings",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  