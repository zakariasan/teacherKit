const express = require('express')
const router = express.Router()
const fs = require('path')
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer')
const Lesson = require('../models/Lesson')



//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
	  cb(null, './public/uploads');

  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
const lessons = multer({ storage : multerStorage, fileFilter:multerFilter });


router.get('/',async (req, res) => {
	try{
		const lessons_pc = await Lesson.find({status: 'physique'}).populate('user').lean()
		const lessons_ch = await Lesson.find({status: 'chimie'}).populate('user').lean()

  res.render('lessons/show', {layout : 'lessons',lessons_ch, lessons_pc })
	} catch(err){

		console.error(err);
		//res.render('error/500')
	}
})

router.get('/add', (req, res) => {
  res.render('lessons/add', {layout : 'lessons' })
})

router.post('/',lessons.single('body') ,async(req, res) => {
	//res.send("hello")
	try {
		let pwd = 'uploads/' + req.file.originalname;
		await Lesson.create({

			title : req.body.title,
			level: req.body.level,
			status :req.body.status,
			body :pwd,
			user : req.user
		})

		res.redirect('./lessons')
} catch (error) {
  res.json({
    error,
  });
}
})

router.get('/download/:id',async(req,res)=>{

	try{
    let down_cours = await Lesson.find({_id:req.params.id})
    let path= __dirname + down_cours.body;
            res.download(path);

	}catch(err){

		console.log(err)
	}
})



module.exports = router
