let mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
let weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let delayCallAddProjectPrompt;


/* 
	task object with project name and task details parameters. 
	can extend this to 
*/
function task(projectName, taskDetails)
{
	this.project = projectName;
	this.taskDetails = taskDetails; 
	
	this.status = "backlog";
	this.history = [];

	this.ChangeStatus = function (newStatus)
	{
		function changeLogEntry()
		{
			this.timestamp = new Date();
			this.changeFrom = "";	
		}


		let changeLogEntryItem = new changeLogEntry();
		changeLogEntryItem.changeFrom = this.status;
		this.history.push(changeLogEntryItem);
		this.status = newStatus;
	}

}


/* 
	projects will contain an array of projects for which tasks are already added. This is used for autocomplete
	tasks will contain data about the tasks
*/
let tododata = {
	"projects": [],
	"tasks":[]
};


function onLoad(argument) {
	// body...
	//alert("A");
	AddEventListeners();
	GetData();
	InitAutoComplete();

	ResetNewTaskFields();
}


/* 
	add eventlisteners here 
*/
function AddEventListeners()
{
	document.getElementById("add-task").addEventListener("click", AddTask)
}


/* 
	function creates a new task and adds it to the backlog. 
	internally, it will also check if the project is new, if it is, the new project is added to the project list
*/
function AddTask()
{
	//add project to project list, if it is not already added
	AddProject();
	
	let newTask = createTask(); 
	tododata.tasks.push(newTask)


	SaveData();

	//reset new task fields
	ResetNewTaskFields();
}

/* 
	add project to todo-data
*/
function AddProject()
{
	
	let projectName = document.getElementById("project-name").value;
	if (tododata.projects.indexOf(projectName) === -1)
	{
		tododata.projects.push(projectName);
		//console.log("Project Added ", projectName);
		SaveData();
	}
}


/* 
	Reset new task fields
*/
function ResetNewTaskFields()
{
	//reset project name text field
	document.getElementById("project-name").value = "";

	//reset task details field
	document.getElementById("task-name").value = "";

	//set focus to project name field
	document.getElementById("project-name").focus();
}

/* 
	initialize autocomplete if project list is not empty

*/
function InitAutoComplete()
{
	if (tododata.projects.length > 0)
	{
		autocomplete(document.getElementById("project-name"), tododata.projects);
	}
	
	
}


/*
	function checks if data exists in local storage, if it does, it retrieves it and stores it in todo-data, 
	if no data exists, a localstorage variable is initialized 
*/ 
function GetData()
{
	if (localStorage.tododata)
	{
		tododata = JSON.parse(localStorage.tododata);
	}
	else
	{
		localStorage.tododata = "";
	}
}


/* 
	function saves data in local storage
*/
function SaveData()
{
	localStorage.tododata = JSON.stringify(tododata);
}


/* 
	function to return object in the format of tasks. 
	while creating a task the status will be set as not-started 
*/
function createTask()
{
	//store project name value
	let projectName = document.getElementById("project-name").value;

	//store task details value
	let taskDetails = document.getElementById("task-name").value;

	//create a new task object with project name and task details values. 
	let taskObject = new task(projectName, taskDetails);

	//return the task object
	return taskObject
}


/*
	date functions start here 
*/
function getTodaysDate()
{
	let a = new Date();
	let month = mL[a.getMonth()];
	let date = a.getDate();
	let day = weekday[a.getDay()];
	let year = a.getFullYear();

	//Monday, February 21
	let dateStringDisplay = day + ", " + month + " " + date;
	let dateLabel = date + "-" + mS[a.getMonth()] + "-" + year;
	let ID = PreceedingZeroes(date, 2) + PreceedingZeroes(a.getMonth()+1, 2) + String(year).trim(); 

	let retObj = {};
	retObj.display = dateStringDisplay;
	retObj.label = dateLabel;
	retObj.ID = ID

	return retObj;

	// return {"display" : dateStringDisplay; "label": dateLabel}
}


function PreceedingZeroes(number, totalLen)
{
	let sZero = "";
	for (let i=0; i<totalLen; i++)
	{
		sZero += "0";
	}

	return (sZero + String(number).trim()).slice(-1*totalLen);
}

function onbefore()
{
	// alert("A");
	console.log("a")
	return 0;
}
