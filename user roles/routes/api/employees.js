const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LISt = require('./../../config/roles_list');
const verifyRoles = require('./../../middleware/verofyRoles')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LISt.Admin,ROLES_LISt.Editor), employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LISt.Admin,ROLES_LISt.Editor),employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LISt.Admin),employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;