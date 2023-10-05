const Admin =  require('../models/Admin');

const createAdmin = async (req,res) => {
    console.log(
        "request.body ---->",
        req.body
    )
    const {name, email, password} = req.body;
    const admin = new Admin();

    admin.name = name;
    admin.email = email;
    admin.password = password;

    admin.save((saveError) => {
        if (saveError) {
            res.status(500).json({error: saveError});
        }else{
            res.status(200).json({admin});
        }
    })
    res.send(200);
};

const getAdmins = (req, res) => {};

const getAdminById = (req,res) => {};

const editAdmin = (req, res) => {};

const deleteAdmin = (req, res) => {};

module.exports = {
    createAdmin,
    getAdminById,
    getAdmins,
    editAdmin,
    deleteAdmin
}