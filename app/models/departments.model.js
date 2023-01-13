module.exports = (sequelize, Sequelize) => {
  const Departments = sequelize.define("departments", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    path: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.INTEGER
    },
    manager_id: {
      type: Sequelize.INTEGER
    },
    effective_date: {
      type: Sequelize.DATEONLY
    },
    expired_date: {
      type: Sequelize.DATEONLY
    },
    parent_id: {
      type: Sequelize.INTEGER
    },
  },
  {
    schema: 'hrm',
    timestamps: false
  });

  return Departments;
};
