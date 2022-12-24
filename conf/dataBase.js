const mongoose = require('mongoose');
const connectingDb = async ()=>{
	try {
		const con = await mongoose.connect(process.env.DB_STRING, {
			useNewUrlParser : true,
			useUnifiedTopology :true,
			//useFindAndModify:false,
			//useCreateIndex : true

		})
		//init gfs


		console.log(`Yupi !@_@~ dataBase  Connected on ->${con.connection.host}<-----`)
	}catch(err){
		console.error(err);
		process.exit(1);
	}
}

module.exports = connectingDb
