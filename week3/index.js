const express = require ('express')
const app = express ()
const port = 3000

app.set("view engine", "hbs")
app.set("views", "view")
app.use("/assets", express.static("assets"))
app.get('/', renderIndex )
app.get('/contact', renderContact)
app.get('/project', renderProject)
app.get('/testimonials', renderTestimonials)

function renderIndex ( req, res) {
    res.render("index")
}

function renderContact ( req, res) {
    res.render("contact")
}

function renderProject ( req, res) {
    res.render("project")
}

function renderTestimonials ( req, res) {
    res.render("testimonials")
}

app.listen(port, () =>{
    console.log(`server berjalan di port ${port}`)
})