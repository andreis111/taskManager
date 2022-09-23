const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Todo = require("../models/Todo");
const User = require("../models/User");
const Staff = require("../models/Staff");

module.exports = {

  getFeed: async (req, res) => {
    try {
      const tasks = await Todo.find().sort({ createdAt: "desc" }).lean();
      const activeStaff = await Staff.find({ active: true, role: 'staff', adminId: req.user.id }).lean()
      if (req.user.role === 'admin') {
        res.render("profileAdmin.ejs", { tasks: tasks, user: req.user, staff: activeStaff });
      } else {
        res.redirect("/staff" )
      }

    } catch (err) {
      console.log(err);
    }
  },

  getStaff: async (req, res) => {
    try {
      // finding all the staff with the associed id
      const staffMembers = await Staff.find({ adminId: req.user.id });

      // rendering profile page with the data from the DB
      if (req.user.role === 'admin') {
        res.render("adminStaffMenu.ejs", { staff: staffMembers });
      }
    } catch (err) {
      console.log(err);
    }
  },
  
  
};
