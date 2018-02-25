var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
var weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var delayCallAddProjectPrompt;

var dailyTaskID = 0;

var dailyObj;

function onLoad(argument) {
	// body...
	// alert("A");
	GetData();
	FillProjectSelectBox();
	AddEventListeners();
	$("#projectSelection").focus();

	CreateDailyObject();

}


function CreateDailyObject()
{
	var temp = JSON.stringify(dailyObjTemplate);
	var temp2 = temp;
	dailyObj = JSON.parse(temp2);
}

function AddEventListeners()
{
	$("#projectSelection").on("change", ProjectSelectionChange)
	$("#addTaskButton").on("click", TaskAdded);
	// $('.taskDone').on("click", TaskDone)
	// $('.tasks').delegate("click", ".taskDone", TaskDone);
}


function TaskDone(event)
{

	var taskParent = $(this).parent();
	var taskDetails = taskParent.children('.taskDetails')[0].textContent;
	// console.log(taskDetails)
	var taskID = taskParent[0].getAttribute("taskid");
	// console.log(taskID) 
	dailyObj.tasks[taskID].status = "completed";
	taskParent.remove();


}

function AddDeleteTaskButton(taskId)
{
	var taskDeleteButtonHTML = '<input type="button" class="taskDelete"  value="Delete" name="">'
	$('.task-id-' + taskId).append(taskDeleteButtonHTML)

	$('.taskDelete').off("click")
	$('.taskDelete').on("click", TaskDelete)
}

function AddTaskDoneButton(taskId)
{
	var taskDoneButtonHTML = '<input type="button" class="taskDone"  value="Done" name="">'
	$('.task-id-' + taskId).append(taskDoneButtonHTML)

	$('.taskDone').off("click")
	$('.taskDone').on("click", TaskDone)
}

function AddTaskDetailsToTodo(taskId, projectName, taskDetails)
{
	var taskDetailStartHTML = '<span class=taskDetails>';
	var taskDetailEndHTML = '</span>';



	var taskDetailsHTML = taskDetailStartHTML + '<span class="project">' + projectName + '</span>' + taskDetails + taskDetailEndHTML;
	$('.task-id-' + taskId).append(taskDetailsHTML)	

}


function TaskDelete(event)
{

}

function TaskAdded(event)
{
	dailyTaskID++;
	var taskID = getTodaysDate().ID + String(dailyTaskID).trim();

	// console.log("TaskAdded ::", event)
	var newTask = $("#newTaskDetail").val();
	var projectName = $("#projectSelection").val();

	var taskHTMLStart = '<div class="task task-id-'+ String(taskID).trim() +'" taskID="'+ taskID + '">'
	var taskHTMLEnd = '</div>'

	// var taskHTML = taskHTMLStart + taskDetailStartHTML + "Project : " + projectName + ' - ' + newTask + taskDetailEndHTML + taskDoneButtonHTML + taskHTMLEnd;
	var taskHTML = taskHTMLStart + taskHTMLEnd;
	$('.tasks').append(taskHTML);
	
	
	AddTaskDetailsToTodo(taskID, projectName, ' - ' + newTask)
	AddTaskDoneButton(taskID);
	AddDeleteTaskButton(taskID);

	ResetNewTaskFields();
	$("#projectSelection").focus();

	dailyObj.tasks[taskID] = {"project": projectName, "task-details": newTask, "status": "to-do"};

}

function SaveToJSON()
{
	data.dailyRecord[getTodaysDate().label] = dailyObj;
}


function ResetNewTaskFields()
{
	$("#newTaskDetail").val("");
	$("#projectSelection").val(data.projects[0])
}

function ProjectSelectionChange(event)
{
	clearTimeout(delayCallAddProjectPrompt);
	// console.log("ProjectSelectionChange ::", event)
	var projectSelected = $("#projectSelection").val();
	
	if (projectSelected === 'Add')
	{
		delayCallAddProjectPrompt = setTimeout(function(){ GetProjectName();}, 100);
	}

}


function GetProjectName()
{
    
    var projectName = prompt("Please enter New Project Name:", "");
    if (projectName == null || projectName == "") {
        console.log("User cancelled the prompt.");
    } else {
        //txt = "Hello " + person + "! How are you today?";
    	AddProject(projectName);    
    }

    FillProjectSelectBox();
    //document.getElementById("demo").innerHTML = txt;

}

function AddProject(projectName)
{
	data.projects[data.projects.length - 1] = projectName; 
	data.projects.push("Add");
}


function FillProjectSelectBox()
{
	$("#projectSelection").html("");
	var projects = data.projects;
	var nProjects = projects.length;

	var optionStringStart = '<option value="'; 
	var optionStringEnd = '</option>'

	var optoinStringFull = '';

	for (var i=0; i<nProjects; i++)
	{
		optoinStringFull += optionStringStart +  projects[i] + '">' + projects[i] + optionStringEnd
	}	

	// console.log(optoinStringFull)
	$("#projectSelection").html(optoinStringFull)

}

function getTodaysDate()
{
	var a = new Date();
	var month = mL[a.getMonth()];
	var date = a.getDate();
	var day = weekday[a.getDay()];
	var year = a.getFullYear();

	//Monday, February 21
	var dateStringDisplay = day + ", " + month + " " + date;
	var dateLabel = date + "-" + mS[a.getMonth()] + "-" + year;
	var ID = PreceedingZeroes(date, 2) + PreceedingZeroes(a.getMonth()+1, 2) + String(year).trim(); 

	var retObj = {};
	retObj.display = dateStringDisplay;
	retObj.label = dateLabel;
	retObj.ID = ID

	return retObj;

	// return {"display" : dateStringDisplay; "label": dateLabel}
}


function PreceedingZeroes(number, totalLen)
{
	var sZero = "";
	for (var i=0; i<totalLen; i++)
	{
		sZero += "0";
	}

	return (sZero + String(number).trim()).slice(-1*totalLen);
}


function GetData()
{
	if (localStorage.todo)
	{


	}
}

function onbefore()
{
	// alert("A");
	console.log("a")
	return 0;
}

var data  = {
	"lastMod" : "",
	"projects": ["Select a project", "KeplerNG", "Zeus LMS", "Add"],
	"dailyRecord": {

	}	
}


var dailyObjTemplate = {
	"tasks": []
}