const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Todo = require("../models/Todo");
const User = require("../models/User");
const Staff = require("../models/Staff");

module.exports = {

  getFeed: async (req, res) => {
    try {
      const tasks = await Todo.find({ adminId: req.user.id }).sort({ createdAt: "desc" }).lean();
      const activeStaff = await User.find({ active: true, role: 'staff' }).lean()
      if (req.user.role === 'admin') {
        res.render("profileAdmin.ejs", { tasks: tasks, user: req.user, staff: activeStaff });
      } else {
        res.render("profileStaff.ejs", { tasks: tasks, user: req.user, staff: activeStaff })
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
      res.render("adminStaffMenu.ejs", { staff: staffMembers });
    } catch (err) {
      console.log(err);
    }
  },
  
  
};
