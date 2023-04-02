var express = require('express');
var app = express();
var hbs = require('express-handlebars');
var bodyParser = require("body-parser");
var session = require('express-session')
const mongoose =require('mongoose');
const uri = "mongodb+srv://duongndtph25724:au5IzvJGFJ92KAVJ@cluster0.pmr47x5.mongodb.net/test";
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(uri).then(console.log('kết nối thành công'));

app.engine('.hbs', hbs.engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/"
}));

app.set('view engine', '.hbs');
app.set('views', './views');

const nhanvienModel=require('./NhanVienModel')

app.get('/', async (req, res) => {
    const data = await nhanvienModel.find().lean()
  
    res.render('home', { data })
  })
  app.get('/add', function(req, res){
    res.render('add')
})
  // Route to handle "Add" form submission
  app.post('/add', async (req, res) => {
    const {  maNV, tenNV,luong } = req.body
    const newDoc = new nhanvienModel({  maNV, tenNV,luong })
    await newDoc.save()
    res.redirect('/')
  })
  
  // Route to handle "Edit" form submission
  app.post('/edit/:id', async (req, res) => {
    const {maNV, tenNV,luong } = req.body
    const id = req.params.id
    let obj= await nhanvienModel.findById(id);
    if(req.method="POST"){
      let obj=new nhanvienModel();
      obj.maNV=req.body.maNV;
      obj.tenNV=req.body.tenNV;
      obj.luong=req.body.luong;
      obj._id=id;
      await nhanvienModel.findByIdAndUpdate(id,obj);
    }
    res.render('edit',{obj:obj});
    res.redirect('/');
  })
  app.get('/edit/:id', async(req, res)=>{
    const {maNV, tenNV,luong } = req.body
    const id = req.params.id
    let obj= await nhanvienModel.findById(id);
    if(req.method="POST"){
      let obj=new nhanvienModel();
      obj.maNV=req.body.maNV;
      obj.tenNV=req.body.tenNV;
      obj.luong=req.body.luong;
      obj._id=id;
      await nhanvienModel.findByIdAndUpdate(id,obj);
    }
    res.render('edit',{obj:obj});
})
  // Route to handle "Delete" request
  app.post('/delete/:id', async (req, res) => {
    const id = req.params.id
    await nhanvienModel.findByIdAndDelete(id)
    res.redirect('/')
  })
  
  app.listen(8080, () => console.log('Server is running on port 8080...'))

  