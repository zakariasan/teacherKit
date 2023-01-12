const update = document.querySelector("#update-button");
//const deleteBtn = document.querySelector(".delete-button");
const deleteBtn = document.querySelector('.delete-button');

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
	deleteBtn.addEventListener("click", async	(e) => {

const idItem = e.target.id;

	try{
		const res = await fetch("/lessons",{
			method : 'delete',
			headers: {'Content-type' : 'application/json'},
			body : JSON.stringify( {"deletItem" : idItem})
		})

		location.reload();
	}catch(err){console.error(err)}



});
}
