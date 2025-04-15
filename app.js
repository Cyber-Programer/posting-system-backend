const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");
const loginRouter = require("./routes/login.route");
const profileRouter = require('./routes/profile.route')


app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRouter);
app.use(postRouter);
app.use(loginRouter);
app.use(profileRouter)

app.get("/", (req, res) => {
  res.render("index");
});

app.get('/logout',(req,res)=>{
  res.cookie("token","")
  res.redirect('/login')
})





// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Error occurred:", err); // Log the error
  if (err.status) {
    // If the error object has a status code
    res.render("login", { err: err.message }); // Render the login page with the error message
  } else {
    // Handle unexpected errors
    res.status(500).send("Internal Server Error");
  }
});



app.listen(3000, () => console.log("server is running on port 3000"));
