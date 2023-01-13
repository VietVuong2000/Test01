module.exports = (sequelize, Sequelize) => {
    const Employees = sequelize.define("employees", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING
      },
    },
    {
        schema: 'hrm',
        timestamps: false
      });
  
    return Employees;
  };
  