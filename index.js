const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const nodemailer = require('nodemailer');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://AnikaSterilis:Anika123@cluster0.foyqb0v.mongodb.net/Salesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

const leadSchema = {
    firstname: String,
    lastname: String,
    priemail: String,
    secemail: String,
    phone: String,
    mobile: String,
    website: String,
    company: String,
    annualrev: String,
    empno: String,
    industry: String,
    leadsource: String,
    leadstatus: String,
    rating: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    description: String,
    tasks: [{
        date: String,
        time: String,
        taskowner: String,
        tasksubject: String,
        duedate: String,
        tasktype: String,
        assignedName: String,
        status: String,
        priority: String,
        description: String,
    }],
    meetings: [{
        meetingsubject: String,
        fromdate: String,
        todate: String,
        assignedName: String,
        description: String,
    }],
    calls: [{
        callsubject: String,
        calltime: String,
        callpurpose: String,
        assignedName: String,
        callagenda: String,
    }],
    activities: [{
        date: String,
        time: String,
        taskowner: String,
        tasksubject: String,
        duedate: String,
        tasktype: String,
        assignedName: String,
        status: String,
        priority: String,
        description: String,
    }],
}
const lead = mongoose.model('lead', leadSchema);
app.post('/create', function (req, res) {
    let newLead = new lead({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        priemail: req.body.priemail,
        secemail: req.body.secemail,
        phone: req.body.phone,
        mobile: req.body.mobile,
        website: req.body.website,
        company: req.body.company,
        annualrev: req.body.annualrev,
        empno: req.body.empno,
        industry: req.body.industry,
        leadsource: req.body.leadsource,
        leadstatus: req.body.leadstatus,
        rating: req.body.rating,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        country: req.body.country,
        description: req.body.description,
    });
    newLead.save();
    res.send('<script>alert("Lead Saved Successfully"); window.location.href = "/sales";</script>');
});
app.get('/sales', (req, res) => {
    lead.find({}).then(leads => {
        res.render('sales', {
            LeadsList: leads
        });
    });
});
app.get('/userslead/:id', async function (req, res) {

    try {
        const id = req.params.id;
        // Use Mongoose to find the document by ID and await the result
        const data = await lead.findById(id);

        if (!data) {
            // Handle the case where the document is not found
            return res.status(404).send('Document not found');
        }
        // Render the template with the retrieved data
        res.render('userslead', {
            leads: data,
        });
    } catch (err) {
        // Handle any errors that occur during the operation
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/userlead', (req, res) => {
    task.find({}).then(tasks => {
        res.render('userlead', {
            
        });
    });
});
app.get('/editleads/:id', async function (req, res) {
    try {
        const id = req.params.id;
        // Use Mongoose to find the document by ID and await the result
        const data = await lead.findById(id);
        if (!data) {
            // Handle the case where the document is not found
            return res.status(404).send('Document not found');
        }
        // Render the template with the retrieved data
        res.render('editleads', {
            leads: data
        });
    } catch (err) {
        // Handle any errors that occur during the operation
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    var del = lead.findByIdAndDelete(id);
    del.exec({}).then(leads => {
        res.send('<script>alert("Lead Deleted successfully!"); window.location.href = "/sales";</script>');
    });
});

app.get('/usertask/:id', async function (req, res) {
    try {
        const id = req.params.id;
        // Use Mongoose to find the document by ID and await the result
        const data = await task.findById(id);
        if (!data) {
            // Handle the case where the document is not found
            return res.status(404).send('Document not found');
        }
        // Render the template with the retrieved data
        res.render('usertask', {
            tasks: data,
        });
    } catch (err) {
        // Handle any errors that occur during the operation
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/editleads', function (req, res, next) {
    var id = req.body.check;
    var update = lead.findByIdAndUpdate(id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        priemail: req.body.priemail,
        secemail: req.body.secemail,
        phone: req.body.phone,
        mobile: req.body.mobile,
        website: req.body.website,
        company: req.body.company,
        annualrev: req.body.annualrev,
        empno: req.body.empno,
        industry: req.body.industry,
        leadsource: req.body.leadsource,
        leadstatus: req.body.leadstatus,
        rating: req.body.rating,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        country: req.body.country,
        description: req.body.description,
    });
    update.exec().then(dataset => {
        res.send('<script>alert("Data Updated successfully!"); window.location.href = "/sales";</script>');
    });
});
app.post('/email', function (req, res) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sales.anika123@gmail.com',
            pass: 'vxujltezclillzjj'
        }
    });
    let mailOptions = {
        from: req.body.fromemail,
        to: req.body.toemail,
        subject: req.body.subject,
        text: req.body.editor1,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send('<script>alert("Mail Sent Successfully!"); window.location.href = "/sales";</script>');
});
app.get('/createtask/:id', async function (req, res) {
    try {
        const id = req.params.id;
        // Use Mongoose to find the document by ID and await the result
        const data = await lead.findById(id);
        if (!data) {
            // Handle the case where the document is not found
            return res.status(404).send('Document not found');
        }
        // Render the template with the retrieved data
        res.render('createtask', {
            leads: data
        });
    } catch (err) {
        // Handle any errors that occur during the operation
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
const taskSchema = new mongoose.Schema({
    date: String,
    time: String,
    taskowner: String,
    tasksubject: String,
    duedate: String,
    tasktype: String,
    assignedName: String,
    leadname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead',
    },
    status: String,
    priority: String,
    description: String,
});
const task = mongoose.model('task', taskSchema);
app.post('/taskdetails', async (req, res) => {
    const {
        taskowner,
        tasksubject,
        duedate,
        leadname,
        tasktype,
        status,
        priority,
        description
    } = req.body;
    const Lead = await lead.findById(leadname);
    const assignedName = `${Lead.firstname}`;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    const newTask = new task({
        date: formattedDate,
        time: formattedTime,
        taskowner,
        tasksubject,
        duedate,
        tasktype,
        assignedName: assignedName,
        status,
        priority,
        description
    });
    try {
        // Save the task
        await newTask.save();

        // Update the assigned employee with the task
        const Lead = await lead.findById(leadname);
        if (Lead) {
            Lead.tasks.push(newTask);
            await Lead.save();
        }

        res.send('<script>alert("Task Assigned Successfully!"); window.location.href = "/sales";</script>');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/tasks', (req, res) => {
    task.find({}).then(tasks => {
        res.render('tasks', {
            TasksList: tasks,
        });
    });
});
app.get('/createmeeting', (req, res) => {
    lead.find({}).then(leads => {
        res.render('createmeeting', {
            leads
        });
    });
});
const meetingSchema = new mongoose.Schema({
    meetingsubject: String,
    fromdate: String,
    todate: String,
    assignedName: String,
    leadname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead',
    },
    description: String,
});
const meeting = mongoose.model('meeting', meetingSchema);
app.post('/createmeeting', async (req, res) => {
    const {
        meetingsubject,
        fromdate,
        todate,
        leadname,
        description
    } = req.body;
    const Lead = await lead.findById(leadname);
    const assignedName = `${Lead.firstname}`;
    const newMeeting = new meeting({
        meetingsubject,
        fromdate,
        todate,
        assignedName: assignedName,
        description
    });
    try {
        // Save the task
        await newMeeting.save();

        // Update the assigned employee with the task
        const Lead = await lead.findById(leadname);
        if (Lead) {
            Lead.meetings.push(newMeeting);
            await Lead.save();
        }

        res.send('<script>alert("Meeting Assigned Successfully!"); window.location.href = "/meetings";</script>');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/meetings', (req, res) => {
    meeting.find({}).then(meetings => {
        res.render('meetings', {
            MeetingsList: meetings
        });
    });
});
app.get('/createcall', (req, res) => {
    lead.find({}).then(leads => {
        res.render('createcall', {
            leads
        });
    });
});
const callSchema = new mongoose.Schema({
    callsubject: String,
    calltime: String,
    assignedName: String,
    leadname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead',
    },
    callpurpose: String,
    callagenda: String,
});
const call = mongoose.model('call', callSchema);
app.post('/createcall', async (req, res) => {
    const {
        callsubject,
        calltime,
        leadname,
        callpurpose,
        callagenda
    } = req.body;
    const Lead = await lead.findById(leadname);
    const assignedName = `${Lead.firstname}`;
    const newCall = new call({
        callsubject,
        calltime,
        assignedName: assignedName,
        callpurpose,
        callagenda
    });
    try {
        // Save the task
        await newCall.save();

        // Update the assigned employee with the task
        const Lead = await lead.findById(leadname);
        if (Lead) {
            Lead.calls.push(newCall);
            await Lead.save();
        }

        res.send('<script>alert("Call Assigned Successfully!"); window.location.href = "/calls";</script>');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/calls', (req, res) => {
    call.find({}).then(calls => {
        res.render('calls', {
            CallsList: calls
        });
    });
});
app.get('/', (req, res) => {
    task.find({}).then(tasks => {
        meeting.find({}).then(meetings => {
            call.find({}).then(calls => {
                lead.find({}).then(leads => {
        res.render('index', {
            TasksList: tasks,
            MeetingsList: meetings,
            CallsList: calls,
            LeadsList: leads
        });
    });
    });
});
    });
});
app.get('/createactivity/:id', async function (req, res) {
    try {
        const id = req.params.id;
        // Use Mongoose to find the document by ID and await the result
        const data = await lead.findById(id);
        if (!data) {
            // Handle the case where the document is not found
            return res.status(404).send('Document not found');
        }
        // Render the template with the retrieved data
        res.render('createactivity', {
            leads: data
        });
    } catch (err) {
        // Handle any errors that occur during the operation
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
const activitySchema = new mongoose.Schema({
    date: String,
    time: String,
    taskowner: String,
    tasksubject: String,
    duedate: String,
    tasktype: String,
    assignedName: String,
    leadname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead',
    },
    status: String,
    priority: String,
    description: String,
});
const activity = mongoose.model('activity', activitySchema);
app.post('/activitydata', async (req, res) => {
    const {
        taskowner,
        tasksubject,
        duedate,
        leadname,
        tasktype,
        status,
        priority,
        description
    } = req.body;
    const Lead = await lead.findById(leadname);
    const assignedName = `${Lead.firstname}`;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    const newActivity = new activity({
        date: formattedDate,
        time: formattedTime,
        taskowner,
        tasksubject,
        duedate,
        tasktype,
        assignedName: assignedName,
        status,
        priority,
        description
    });
    try {
        // Save the task
        await newActivity.save();

        // Update the assigned employee with the task
        const Lead = await lead.findById(leadname);
        if (Lead) {
            Lead.activities.push(newActivity);
            await Lead.save();
        }

        res.send('<script>alert("Activity Assigned Successfully!"); window.location.href = "/sales";</script>');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/create", function (req, res) {
    res.render("create");
});
app.get("/editleads", function (req, res) {
    res.render("editleads");
});
app.get("/sales", function (req, res) {
    res.render("sales");
});
app.get("/sendmail", function (req, res) {
    res.render("sendmail");
});
app.get("/tasks", function (req, res) {
    res.render("tasks");
});
app.get("/userslead", function (req, res) {
    res.render("userslead");
});
app.get("/calls", function (req, res) {
    res.render("calls");
});
app.get("/createcall", function (req, res) {
    res.render("createcall");
});
app.get("/createmeeting", function (req, res) {
    res.render("createmeeting");
});
app.get("/edittask", function (req, res) {
    res.render("edittask");
});
app.get("/meetings", function (req, res) {
    res.render("meetings");
});
app.get("/usertask", function (req, res) {
    res.render("usertask");
});
app.get("/createtask", function (req, res) {
    res.render("createtask");
});
app.get("/demos", function (req, res) {
    res.render("demos");
});
app.get("/createactivity", function (req, res) {
    res.render("createactivity");
});
app.listen(5000, function () {
    console.log("Server is running on port 5000");
});