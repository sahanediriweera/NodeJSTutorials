const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) {this.employees = data}
};

const getAllEmployees = (req,res) => {
    res.json(data.employees);
} 

const createNewEmployee = (req,res) =>{
    const newEmployee = {
        id:data.employees[data.employees.length-1].id+1 || 1,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname ){
        return res.status(400).json({
            "message": "First and Last Names are required"
        });
    }

    data.setEmployees([...data.setEmployees,newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({
            "message":`The user in id ${req.body.id} doesn't exist`
        });
    }

    if(res.body.firstname){
        employee.firstname = req.body.firstname
    }

    if(res.body.lastname){
        employee.lastname = req.body.lastname
    }

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.filter) );
    const unsortedArray = [...filteredArray,employee]
    data.setEmployees(unsortedArray.sort((a,b)=>{
        a.id>b.id?1:a.id<b.id?-1:0
    }));
    res.status(200).json(data.employees);
}

const deleteEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({
            "message":`The employee with the id ${req.body.id} is not found `
        });
    }

    const filteredArray = data.employees.filter(emp => emp.id !==parseInt(req.body.id));
    data.setEmployees = [...filteredArray];
    res.status(200).json(data.employees);
}

const getEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({
            "message":`The employee with the id number ${req.body.id} is not found`
        });
    }

    res.status(200).json(employee);
}

module.exports = {
    getAllEmployees,
    updateEmployee,
    createNewEmployee,
    deleteEmployee,
    getEmployee
}