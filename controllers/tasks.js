const Task = require("../models/Task");
const User = require("../models/Admin");

module.exports = {
  getTasks: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      console.log(task);
      res.render("tasks.ejs", {
      });
    } catch (err) {
      console.log(err);
    }
  },

  getStaff: async (req, res) => {
    try {
      const tasks = await Task.find({ adminId: req.user.id }).sort({ createdAt: "desc" }).lean();
      const activeStaff = await User.find({ active: true, role: 'staff' }).lean()

      res.render("profileStaff.ejs", { tasks: tasks, user: req.user, staff: activeStaff })

    } catch (err) {
      console.log(err);
    }
  },

  markComplete: async (req, res) => {
    try {
      await Task.findOneAndUpdate(
        { _id: req.params.id },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.redirect(`/staff/`);
    } catch (err) {
      console.log(err);
    }
  },

  assignJob: async (req, res) => {
    try {
      await Task.findOneAndUpdate(
        { _id: req.params.id },
        {
          completedBy: req.body.assign,
          assignedDate: new Date()
        }
      );
      console.log(`Assigned to ${req.body.assign}`);
      res.redirect(`/admin/`);
    } catch (err) {
      console.log(err);
    }
  },
  // createTodo: async (req, res)=>{
  //     try{
  //         await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
  //         console.log('Todo has been added!')
  //         res.redirect('/todos')
  //     }catch(err){
  //         console.log(err)
  //     }
  // },
};
