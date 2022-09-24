const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Todo = require("../models/Todo");
const User = require("../models/User");
const Staff = require("../models/Staff");

module.exports = {

  getFeed: async (req, res) => {
    try {
      const tasks = await Todo.find({completedBy: null}).sort({createdDate: 'desc'}).lean();
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
  
  getTasksCompleted: async (req, res) => {
    try {
      const tasks = await Todo.find({ completed: true }).sort({ createdDate: 'desc' }).lean();
      console.log(tasks);
      const staff = []
      for (task of tasks) {
        console.log(task.completedBy);
        staff.push(await Staff.findById(task.completedBy)); 
      }
      console.log(staff);
      if (req.user.role === 'admin') {
        res.render("profileAdminDone.ejs", { tasks: tasks, user: req.user, staff: staff });
      } else {
        res.redirect("/staff" )
      }

    } catch (err) {
      console.log(err);
    }
  },
};