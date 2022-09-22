const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Todo = require("../models/Todo");
const Staff = require("../models/User");

module.exports = {

  getFeed: async (req, res) => {
    try {
      const tasks = await Todo.find({ adminId: req.user.id }).sort({ createdAt: "desc" }).lean();
      const activeStaff = await Staff.find({ active: true, role: 'staff' }).lean()
      if (req.user.role === 'admin') {
        res.render("profileAdmin.ejs", { tasks: tasks, user: req.user, staff: activeStaff });
      } else {
        res.render("profileStaff.ejs", { tasks: tasks, user: req.user, staff: activeStaff })
      }

    } catch (err) {
      console.log(err);
    }
  },
  
};
