const update = document.querySelector("#update-button");
//const deleteBtn = document.querySelector(".delete-button");
const deleteBtn = document.getElementById("para");

/*update.addEventListener("click", (_) => {*/
    /*//send PUT req -->*/
    /*fetch("/_", {*/
        /*method: "put",*/
        /*headers: { "Content-Type": "application/json" },*/
        /*body: JSON.stringify({*/
            /*name: "Darth Vader",*/
            /*quote: "I find your lack of faith disturbing.",*/
        /*}),*/
    /*})*/
        /*.then((res) => {*/
            /*if (res.ok) return res.json();*/
        /*})*/
        /*.then((response) => window.location.reload(true));*/
/*});*/
if(deleteBtn){ 

console.log("hello zak")
deleteBtn.addEventListener("click", (_) => {
	console.log("hello")
	fetch("/media", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Darth Vader",
        }),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => window.location.reload());
});
}
