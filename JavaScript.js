//global variable referances

let inputbody = document.getElementById('inputBody');
let navBar = document.getElementById("navbar")
let colorsList = JSON.parse(localStorage.getItem("muttaqin-colors") || "[]")
let inputTitle = document.getElementById('inputTitle');
let notesview = document.getElementById('notesview');  //input

let addNoteBtn = document.getElementById("addNoteBtn");
let saveNoteBtn = document.getElementById('saveNoteBtn');
let monthArr = ["January", "February", "March", "April", "May", "June", "july", "Augast", "September", "October", "November", "december"];


let deleteBtn = document.getElementById('deleteBtn')
deleteBtn.style.display = "none"
let noteList = JSON.parse(localStorage.getItem('muttaqin-notes') || "[]");
let main = document.getElementById('mainDiv');
let btnDiv = document.getElementById('btnDiv');

//display & crossbutton variable
let displayTitle = document.getElementById("notes-read-title");
let displayBody = document.getElementById("notes-read-body");
let notesRead = document.getElementById('notes-read-tab')
let crossbtn = document.getElementById('crossbtn')
crossbtn.style.display = "none"
// addNoteBtn.style.display = "none"
//function call
showToDom()
window.onload = function(){
 

}
	

// module1 =  functions


function showToDom() {
; [...main.children].forEach((el)=> {
	if (el.className === "notesview mn") {
		el.remove();
	}



})
	let maxTitleLength = 30;
	let maxlength = 50;
	noteList.forEach((note, index)=> {

		let divS = `
		<div class="notesview mn" data-note-id = "${index}">
		<div class = "notes-title notes-control-title">
		${note.title === "" ? note.title : note.title.length> maxTitleLength ? note.title.substring(0, maxTitleLength)+"...": note.title} 
		</div> 
		<div class = "notes-body notes-control">
		${note.body.length > maxlength ? note.body.substring(0, maxlength) + "...": note.body}</div><div class="time"> <small><b> ${note.date} </b> </small> </div> </div>
		`
		notesview.insertAdjacentHTML("afterend", divS);
	})




	noteList.forEach((note, index)=> {

		if (note.body === "") {
			noteList.splice(index, 1)
			localStorage.setItem("muttaqin-notes", JSON.stringify(noteList));
		}
	});

showColorToDom()

}

//only for one time use
function exceptThatRemoveAll(except){
	[...main.children].forEach((note)=>{
	if(note.id !== except )
		note.classList.add("-hide-")
	})
}
function exceptThatShowAll(except){
	[...main.children].forEach((note)=>{
	if(note.id !== except )
		note.classList.remove("-hide-")
	})
}



//module2  = event handleers

addNoteBtn.addEventListener("click", function() {
	inputTitle.focus();
	notesview.classList.remove("-hide");
	inputTitle.value = "";
	inputBody.value = "";

	inputTitle.focus();
	window.location.reload()
})


//exit button event handle
crossbtn.addEventListener("click", function(){
	navBar.className = "navbar"
	notesRead.classList.add("-hide");
	exceptThatShowAll("note-show")
	crossbtn.style.display = "none"
	deleteBtn.style.display = "none"
notesRead.style.background = "white"

setTimeout(()=>{
	window.location.reload()
},1000)	
})



addNoteBtn.addEventListener("dblclick", function() {
	notesview.classList.add("-hide");
	inputTitle.value = "";
	inputBody.value = "";
});

inputBody.addEventListener('keypress', function(e) {
	if (e.key === "Enter") {
		saveNoteBtn.click();
		setTimeout(()=>{
	window.location.reload()
},1000)	
	}
})

saveNoteBtn.addEventListener("click", function(e) {
	// 	e.preventDefault()
	// 	;[...main.children].forEach((el)=>{
	// 	if(el.className === "notesview mn"){
	// 		el.remove()
	// 	}

	// 	showToDom()

	// })
	let title = inputTitle.value || "";
	let body = inputBody.value || "";
	if (body) {
		let dateobj = new Date();
		let mont = dateobj.getMonth();
		let month = monthArr[mont];
		let day = dateobj.getDate();
		let year = dateobj.getFullYear();
		let NoteInfo = {
			title,
			body,
			date: `${month.toUpperCase()} ${day} ${year}`
		}
		noteList.push(NoteInfo);
		localStorage.setItem('muttaqin-notes', JSON.stringify(noteList));
		notesview.classList.add("-hide");
		showToDom();
		setTimeout(()=>{
	window.location.reload()
},1000)	
	}
})
//handle note delete.
deleteBtn.addEventListener("click", function(){
	let noteId = notesRead.getAttribute("data-note-id")
colorsList.forEach((colorProfile)=>{
	if(colorProfile.noteId === noteId){
		let index = colorsList.indexOf(colorProfile)
		colorsList.splice(index, 1)
		localStorage.setItem("muttaqin-colors", JSON.stringify(colorsList))
		showColorToDom()
		
	}
	
})

	
noteList.splice(noteId, 1)
localStorage.setItem("muttaqin-notes", JSON.stringify(noteList))

crossbtn.click()
showToDom()

})

//display notes functionality
;[...main.children].forEach((note)=>{
	if(note.dataset.noteId !== undefined){
		note.addEventListener("click", function(){
navbar.className = "-hide"
			crossbtn.style.display= "inline";
			deleteBtn.style.display = "inline";
		
			let targetTitle = noteList[note.dataset.noteId].title;
			let targetBody = noteList[note.dataset.noteId].body;
			displayTitle.innerHTML = targetTitle;
			displayBody.innerHTML = targetBody;
			exceptThatRemoveAll("note-show");
			
			notesRead.setAttribute("data-note-id", note.dataset.noteId)
			// console.log(notesRead.getAttribute("data-note-id"))
			colorsList.forEach((colorObj)=>{
				if(colorObj.noteId === note.dataset.noteId){
					notesRead.style.background = colorObj.color
			
				}
			})
			notesRead.classList.remove("-hide");
			
			crossbtn.classList.remove("-hide");
			
		})
	
		
		
		
		
		
	}
	
})



//editing note functionality
function editNoteInfo(){
  let div = document.createElement('div')
  div.id = "append-div"
	let textarea1 = document.createElement('textarea')
	textarea1.id = "note-edit-fun-title"
	let textarea2 = document.createElement('textarea')
	textarea2.id = "note-edit-fun-body"

		div.appendChild(textarea1);
	div.appendChild(textarea2);
	return div
}


notesRead.addEventListener('dblclick', function(){
	notesRead.innerHTML = ''
	let noteId = notesRead.getAttribute("data-note-id")
	let titleVal = noteList[noteId].title
	let bodyVal = noteList[noteId].body
let inpmodel = editNoteInfo()
inpmodel.children[0].value = titleVal.trim()
inpmodel.children[1].value = bodyVal.trim()
notesRead.appendChild(inpmodel)
crossbtn.innerHTML = "Save Note"
crossbtn.addEventListener("click", function(){
	
		noteList[noteId].title = notesRead.children[0].children[0].value
			noteList[noteId].body = notesRead.children[0].children[1].value
			localStorage.setItem("muttaqin-notes", JSON.stringify(noteList))
			setTimeout(function() {
				showToDom()
			}, 300);
			
setTimeout(()=>{
	window.location.reload()
},1000)	
	
	
})

})
 


let colorCustomizeBtn = document.getElementById('Default-theme-btn')
let notetitle = document.getElementById('notes-read-title')
let notebody = document.getElementById('notes-read-body')
let noteread = document.getElementById("notes-read")

let inputField = document.getElementById("input-color")
colorCustomizeBtn.addEventListener("click", function(e){
	inputField.classList.remove("-hide-")
	colorCustomizeBtn.style.display = "none"
	
	inputField.addEventListener("keyup", function(event){
		notesRead.style.background = event.target.value
		if(event.key === "Enter"){
		let confirmation = confirm("vai tui ki sure?")
		let hex = inputField.value.substring(1)
		
		if(confirmation && validateHex(hex)){
		let noteId = notesRead.getAttribute("data-note-id")
		// start 
		colorsList.forEach((color, index)=>{
			if(color.noteId === noteId){
				colorsList.splice(index, 1)
			}
		})
		
			let colorObj = {
				noteId,
				color: inputField.value,
				
			}
			colorsList.push(colorObj)
			
			localStorage.setItem("muttaqin-colors", JSON.stringify(colorsList))
			
			
			
			
		}else{
			alert("invalid Hex code")
		}
		}
		
	})
	
})

function validateHex(color){
	if(color.length !== 6) return false
return /^[0-9a-fA-F]{6}$/i.test(color);
	
}

function showColorToDom(){
	let notesv = document.querySelectorAll('.notesview')
	colorsList.forEach((colorObj)=>{
		
	for (let i = 0; i < notesv.length; i++) {
	if(colorObj.noteId === notesv[i].dataset.noteId){
		 notesv[i].style.background = colorObj.color
		
	}
	}	
		
	})
	
}
showColorToDom()
function showToNotesRead(){
	
	
}
showToNotesRead()