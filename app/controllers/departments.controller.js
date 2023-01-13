
const db = require("../models");
const Departments = db.departments;
const Employees = db.employees;
const Op = db.Sequelize.Op;

// Create and Save a new Departments
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code || !req.body.name  || !req.body.type || !req.body.manager_id || !req.body.effective_date   ) {
    res.status(400).send({
      message: "Require content can not be empty!"
    });
    return;
  }

  // Create a Departments
  const department = {
    code: req.body.code,
    name: req.body.name,
    path: req.body.path,
    type: req.body.type,
    manager_id: req.body.manager_id,
    effective_date: req.body.effective_date,
    expired_date: req.body.expired_date,
    parent_id: req.body.parent_id
  };

  // Save Departments in the database
  Departments.create(department)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Departments."
      });
    });
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: result } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, result, totalPages, currentPage };
};

// Retrieve all Departmentss from the database.
exports.search = (req, res) => {
  let limit = req.body.pageSize;
  const offset = req.body.page ? (req.body.page  - 1 ) * limit : 0;
  const page  = req.body.page;

  // const name = (req.query.name) ? req.query.name :[Op.not]: null;
  var name = req.body.name ? {[Op.iLike]: `%${req.body.name}%` } : { [Op.ne]: null }
  var type = req.body.type ? {[Op.eq]: req.body.type} : { [Op.ne]: null }
  var expiratedDate = (req.body.startDate && req.body.endDate) ? {[Op.between]: [req.body.startDate, req.body.endDate]} : { [Op.ne]: null };
  Departments.findAndCountAll({  where: {
     [Op.and]: [
      { name: name, },
      { type: type },
      { expired_date: expiratedDate}
    ]
}, limit: limit,
offset: offset
})
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments."
      });
    });
};

exports.searchEmployee = (req, res) => {
  let limit = req.query.pageSize;
  const offset = req.query.page ? (req.query.page  - 1 ) * limit : 0;
  const page  = req.query.page;

  // const name = (req.query.name) ? req.query.name :[Op.not]: null;
  var name = req.query.name ? {[Op.iLike]: `%${req.query.name}%` } : { [Op.ne]: null }
  var id = req.query.id ? {[Op.eq]: req.query.id} : { [Op.ne]: null }
  Employees.findAndCountAll({  where: {
     [Op.and]: [
      { name: name, },
      { id: id }
    ]
}, limit: limit,
offset: offset
})
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments."
      });
    });
};

// Retrieve all Departmentss from the database.
exports.findAll = (req, res) => {
  Departments.findAll({  where: {
}
})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments."
      });
    });
};

// Retrieve all Employee from the database.
exports.findAllEmployee = (req, res) => {
  Employees.findAll({  where: {
}
})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees."
      });
    });
};

// Update a Departments by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Departments.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Departments was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Departments with id=${id}. Maybe Departments was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Departments with id=" + id
      });
    });
};

// Delete a Departments with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Departments.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Departments was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Departments with id=${id}. Maybe Departments was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Departments with id=" + id
      });
    });
};

// Delete all Departmentss from the database.
exports.deleteAll = (req, res) => {
  const listIdDelete =  req.body.listId;
  console.log(listIdDelete);
  Departments.destroy({
    where: {
      id: listIdDelete
    },
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Departmentss were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};