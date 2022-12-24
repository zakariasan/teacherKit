const express = require("express");
const router = express.Router();
const User = require("../models/User");

//GET landing Page route
router.get("/", (req, res) => {
    res.render("landing", {
        layout: "landing",
    });
});

router.get("/dashboard", async (req, res) => {
    //console.log(req.user);
    try {
        let user = await User.find({ googleId: req.user.googleId }).lean();

        console.log(user)
        let name = user.displayName
        res.render("dashboard", {
            layout:  "main",
            name  :  req.user.displayName,
			img   :  req.user.image,
        });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
