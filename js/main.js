/*
Author: Kevin Ward
Class: ASD1211
*/

$('#home').on("pageshow", function(){
	
	// Home page code goes here.
	$("header nav")
		.slideDown()
	;

}); // End code for home page.


$('#addItem').on("pageshow", function(){

	$('#petsForm div').on('click', function(e){
		console.log(e);
	});

	$('#koolness').slider("refresh");
	$('#petName').val("Enter KoolPet Name here!");
	$('#petName').on('click', function() {
		$('#petName').val("");
	});
	$('#comments').val("Place comments like birthday and others here.");
	$('#comments').on('click', function() {
		$('#comments').val("");
	});

	var myForm = $('#petForm'),
		aierrorsLink = $('#aierrorsLink')
		;
	
		myForm.validate({
			ignore: '.ignoreValidation',
			invalidHandler: function(form, validator) {
				aierrorsLink.click();
				var html = '';
				for(var key in validator.submitted) {
					var label = $('label[for^="' + key + '"]').not('generated');
					var legend = label.closest('fieldset').find('ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>' + fieldName + '</li>';
				};
				$("#addItemErrors ul").html(html);
				
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
					storeData(key);
			},
			
			$('#reset').on('click', function() {
				// this is to reset the form
				resetPF();
				location.reload('#addItem');
			});
			var resetPF = function() {
				$('#petName').val("");
				$('#petGroups').val("");
				$('#male').attr('checked', true);
				$('#female').attr('checked', false);
				$('#favePet').attr('checked', false);
				dateToday();
				$('#koolness').val(25);
				$('#comments').val("");
			};
		});

	//any other code needed for addItem page goes here

	// My Variables for the functions
	var	genderValue;
	var	faveValue = "No";
	var	errMsg = $("#errors");
	
	var toggleControls = function(n) {
		switch(n) {
			case "on":
				$("#petForm").style.display = "none";
				$("#clearData").style.display = "inline";
				$("#showData").style.display = "none";
				$("#addNew").style.display = "inline";
				$("#showJSON").style.display = "inline";
				$("#showXML").style.display = "inline";
				$("#showCSV").style.display = "inline";
				$("#items").style.display = "inline";
				break;
			case "off":
				$("#petForm").style.display = "block";
				$("#clearData").style.display = "inline";
				$("#showData").style.display = "inline";
				$("#addNew").style.display = "none";
				$("#showJSON").style.display = "inline";
				$("#showXML").style.display = "inline";
				$("#showCSV").style.display = "inline";
				$("#items").style.display = "none";
				break;
			default:
				return false;
		};
	};

//The functions below can go inside or outside the pageinit function for the page in which it is needed.


// My autoFillData function
/*var autoFillData = function (){
	// The actual JSON OBJECT data required for this to work is coming from the 
	// json.js file, which is loaded from the html page.
	// Store the JSON OBJECT into local storage.
	for(var n in json) {
		var id = Math.floor(Math.random()*10000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	};
};*/

// My storeData function
var storeData = function(key){
	// If there isn't a key, this means this is a brand new item and we need a new key.
	if (!key) {
		var id				= Math.floor(Math.random()*10000001);
	} else {
		// Set the id to the existing key I'm editing so that it will save over the data.
		// The key is the same key that's been passed along from the editSubmit event handler
		// to the validate function, and then passed here, into the storeData function.
		id					= key;
	};
	
	// Gather round ye olde form field values, and store in ye olde objects.
	// Object props contain array with the form label and input value.
	
	var pet					= {};
		pet.petGroups		= ["KoolPet Type: ", $('#petGroups').val()];
		pet.petName			= ["KoolPet\'s Name: ", $('#petName').val()];
		pet.genderValue		= ["Gender: ", $('input:radio[name=genderValue]:checked').val()];
		pet.favePet			= ["Favorite KoolPet: ", $('input:slider[name=favePet]:true').val()];
		pet.koolness		= ["Koolness Factor: ", $('#koolness').val()];
		pet.comments		= ["Comments: ", $('#comments').val()];
	// Save data into Local Storage: Use Stringify to convert the object to a string.
	localStorage.setItem(id, JSON.stringify(item));
	console.log(key.val());
	alert("Pet saved to the KoolPetsDex!");
}; 

// My getData function
/*var getData = function(){

	toggleControls("on");
	if(localStorage.length === 0) {
		alert("There were no Pets, so KoolPets were added!");
		autoFillData();
	};*/
	
// This is to get images for the correct category.
	var getImg = function(catName, makeSubList) {
		var imgLi = $('div');
		makeSubList.appendTo(imgLi);
		var newImg = $('img');
		var setSrc = newImg.attr("src", "images/" + catName + ".png");
		imgLi.appendTo(newImg);
	};

// My Make Item Links Function
	// Create the edit and delete links for each stored item when displayed.
	var makeItemLinks = function(key, linksLi) {
		// Add edit single item link
		var editLink = $('a');
		editLink.attr("href", "#addItem");
		editLink.key = key;
		var editText = "Edit KoolPet";
		editLink.addClass("editLink")
			.on('click', editItem);
			.html(editText);
		linksLi.appendTo(editLink);

		// Add my line break
		var breakTag = $('br');
		linksLi.appendChild(breakTag);


		// Add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#addItem";
		deleteLink.key = key;
		var deleteText = "Release KoolPet";
		deleteLink.on("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};
	
	// This is supposed to write data from Local Storage back to the browser.
	var makeDiv = document.createElement("div");
	// makeDiv.attr("id", "items"); // Found out I don't need this line anymore.
	var makeList = document.createElement("ul");
	// makeDiv.appendChild(makeList); // Modified this line to work with my current code.
	$("items").appendChild(makeList);
	// This code should add the data to my page when I press show data.
	document.body.appendChild(makeDiv);
	$("items").style.display = "block";
	for (var i=0, len=localStorage.length; i<len; i++) {
		var makeLi = document.createElement("li");
		var linksLi = document.createElement("div");
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		// Convert strings back to being an object from localStorage value.
		var object = JSON.parse(value);
		var makeSubList = document.createElement("div");
		makeLi.appendChild(makeSubList);
		// This next line is to grab the Img that fits the category it's in.
		getImg(object.petGroups[1], makeSubList);
		for (var n in object) {
			var makeSubLi = document.createElement("div");
			makeSubList.appendChild(makeSubLi);
			var optSubText = object[n][0] + " " + object[n][1];
			makeSubLi.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
		};
		// Create the edit and delete buttons/link for each item in local storage.
		makeItemLinks(localStorage.key(i), linksLi);
	};

// My Edit Single Item Function
	var editItem = function() {
		// Grab data from the item local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// To show the form again
		toggleControls("off");
		
		// Populate the form fields with current localStorage values.
		if (item.kool1[1] == "On") {
			$("kool1").attr("value", "on");
		} else {
			$("kool1").attr("value", "off");
		};
		$("petGroups").value = item.petGroups[1].val();
		$("petName").value = item.petName[1];
		$("petEmail").value = item.petEmail[1];
		var radios = document.forms[0].genderValue;
		for (var i=0; i<radios.length; i++) {
			if (radios[i].value == "Male" && item.genderValue[1] == "Male") {
				radios[i].attr("checked", "checked");
			} else if (radios[i].value == "Female" && item.genderValue[1] == "Female") {
				radios[i].attr("checked", "checked");
			};
		};
		if (item.favePet[1] == "Yes") {
			$("favePet").attr("value", "On");
		};
		$("birthDate").value = item.birthDate[1];
		$("koolness").value = item.koolness[1];
		$("comments").value = item.comments[1];
		
		// Remove the initial listener from the input "save pet" button.
		storeData.off("click", submit);
		// Change SaveData button Value to Edit Button
		// $("submit").value = "Edit KoolPet";
		$("submit").val("Edit KoolPet!");
		var editSubmit = $("submit");
		
		// Save the key value established in this function as a prop of the editSubmit event
		// so we can use that value when we save the data we edited.
		editSubmit.on("click", submit);
		editSubmit.key = this.key;
	};

};

// My Delete Item Function
var	deleteItem = function (){
	var ask = confirm("Are you sure you want to release this KoolPet?");
	if (ask) {
		localStorage.removeItem(this.key);
		alert("KoolPet WAS Released!!!");
		window.location.reload();
	} else {
		alert("KoolPet was NOT Released!");
	};
};


// My Clear Data Function
var clearDataStorage = function(){
	if(localStorage.length === 0) {
		alert("No KoolPets in the KoolPetsDex.");
	} else {
		localStorage.clear();
		alert("All KoolPets have been Released!");
		window.location.reload();
		return false;
	};
};

}); // End code for page.


$("#showItem").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideDown()
	;
	
	function searchInput() {
		if ($('#searchField').val() === "") {
			$('#searchResults').html("");
		}
	}

var search = function() {
	var getInput = $('#searchField').val();
	var getCat = $().val();
	var error = true;
	var match;
	
	if (getInput === "") {
		alert("Please input a search term.");
		return;
	}

// Live Search
$("#filter").keyup(function(){

	// Retrieve the input field text and reset the count to zero
	var filter = $(this).val(), count = 0;

	// Loop through the KoolPets list
	$(".itemlist li").each(function(){

		// If the list item does not contain the text phrase fade it out
		if ($(this).text().search(new RegExp(filter, "i")) < 0) {
			$(this).fadeOut();

		// Show the list item if the phrase matches and increase the count by 1
		} else {
			$(this).show();
			count++;
		}
	});

	// Update the count
	var numberItems = count;
	$("#filter-count").text("Number of KoolPets = "+count);
}); // end live search


}; // end search function

// Function to call the JSON data.
var showJSON = $.ajax({
		url			: 'data/data.json',
		type		: 'GET',
		dataType	: 'json',
		success		: function(data, status) {
			console.log(status, data);
		}
    });

// Function to call the XML data.
var showXML = $.ajax({
		url			: 'data/data.xml',
		type		: 'GET',
		dataType 	: 'xml',
		success		: function(data, status) {
			console.log(status, data);
		}
	});

// Function to call the CSV data.
var showCSV = $.ajax({
		url			: 'data/data.csv',
		type		: 'GET',
		dataType	: 'csv',
		success		: function(data, status) {
			console.log(status, data);
		}
	});
	
	
}); // End code for page.


$("#info").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideDown()
	;	
}); // End code for page.


$("#news").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideDown()
	;	
}); // End code for page.


$("#cs").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideDown()
	;	
}); // End code for page.


$("#addItemErrors").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideDown()
	;	
}); // End code for page.

// My Variables
	var showData = $("#showData");
	showData.on("click", getData);
	var clearLink = $("#clearData");	
	clearLink.on("click", clearDataStorage);
	var saveData = $("#submit");
	saveData.on("click", storeData);
