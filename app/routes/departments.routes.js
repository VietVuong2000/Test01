module.exports = app => {
  const departments = require("../controllers/departments.controller");

  var router = require("express").Router();

  // Create a new Departments
  router.post("/", departments.create);

  // Retrieve all Departmentss
  router.post("/search", departments.search);
  router.get("/", departments.findAll);
  router.get("/get-all-employee", departments.findAllEmployee);
  router.get("/get-all-employee-by-value", departments.searchEmployee);

  // Update a Departments with id
  router.put("/:id", departments.update);

  // Delete a Departments with id
  router.delete("/:id", departments.delete);

  // Delete all Departmentss
  router.post("/multiple-delete", departments.deleteAll);

  app.use("/api/departments", router);
};
