var delayCallAddProjectPrompt;

function onLoad(argument) {
	// body...
	// alert("A");
	GetData();
	FillProjectSelectBox();
	AddEventListeners();
}

function AddEventListeners()
{
	$("#projectSelection").on("change", ProjectSelectionChange)
	$("#addTaskButton").on("click", TaskAdded)
}


function TaskAdded(event)
{
	console.log("TaskAdded ::", event)	
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

var data  = {
	"lastMod" : "",
	"projects": ["Select a project", "KeplerNG", "Zeus LMS", "Add"]	
}

/*
<select id="projectSelection">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
*/



function GetData()
{
	if (localStorage.todo)
	{
		
		
	}
}