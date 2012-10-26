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
				
			};
			submitHandler: function() {
				var data = myForm.serializeArray();
					storeData(key);
			};
			
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
				$('#koolness').val(25);
				$('#comments').val("");
			};
		});

	//any other code needed for addItem page goes here

	// My Variables for the functions
	var	genderValue;
	var	faveValue = "No";
	
	/*var toggleControls = function(n) {
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
	};*/

//The functions below can go inside or outside the pageinit function for the page in which it is needed.


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
			.on('click', editItem)
			.html(editText);
		linksLi.appendTo(editLink);

		// Add my line break
		var breakTag = $('br');
		linksLi.append(breakTag);


		// Add delete single item link
		var deleteLink = $('a');
		deleteLink.attr("href", "#addItem");
		deleteLink.key = key;
		var deleteText = "Release KoolPet";
		deleteLink.addClass("deleteLink")
			.on('click', deleteItem)
			.html(deleteText);
		linksLi.appendTo(deleteLink);
	};
	
	// This is supposed to write data from Local Storage back to the browser.
	var makeDiv = $('div');
	// makeDiv.attr("id", "items"); // Found out I don't need this line anymore.
	var makeList = $('ul');
	// makeDiv.appendChild(makeList); // Modified this line to work with my current code.
	$('#petList').appendTo(makeList);
	// This code should add the data to my page when I press show data.
	$('#petList').append(makeDiv);
	// $('petList').style.display = "block";
	for (var i=0, len=localStorage.length; i<len; i++) {
		var makeLi = $('li');
		var linksLi = $('div');
		makeList.append(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		// Convert strings back to being an object from localStorage value.
		var object = JSON.parse(value);
		var makeSubList = $('div');
		makeLi.append(makeSubList);
		// This next line is to grab the Img that fits the category it's in.
		getImg(object.petGroups[1], makeSubList);
		for (var n in object) {
			var makeSubLi = $('div');
			makeSubList.append(makeSubLi);
			var optSubText = object[n][0] + " " + object[n][1];
			makeSubLi.html(optSubText);
			makeSubList.append(linksLi);
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
		$("petGroups").value = item.petGroups[1].val();
		$("petName").value = item.petName[1].val();
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
		$("koolness").value = item.koolness[1].val();
		$("comments").value = item.comments[1].val();
		
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
		localStorage.empty();
		alert("All KoolPets have been Released!");
		window.location.reload();
		return false;
	};
};

var changePage = function(pageId) {
	$('#' + pageId).trigger('pageshow');
	$.mobile.changePage($('#' + pageId), {transition:"slide"});
};

}); // End code for page.


$("#showItem").on("pageshow", function(){
	// Page code goes here.
	$("header nav")
		.slideDown()
	;
	
	function searchInput() {
		if ($('#searchField').val() === "") {
			$('#searchResults').html("");
		}
	};

var changePage = function(pageId) {
	$('#' + pageId).trigger('pageshow');
	$.mobile.changePage($('#' + pageId), {transition:"slide"});
};

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
	$("#filter-count").text("Number of KoolPets = " + count);
}); // end live search

}; // end search function

// Function to call the JSON data.
var showJSON = $.ajax({
	"url"			: 'data/data.json',
	"type"			: 'GET',
	"dataType"		: 'json',
	"success"		: function(data) {
		$('#items').empty();
		for(var i=0, j=data.pets.length; i<j; i++){
			var pet = data.pets[i];
			$('' +
				'<div class="jpets">' +
					getImg(object.petGroups[1]) +
					'<h2>'+ pet.petName +'</h2>' +
					'<p>'+ pet.petGroups +'</p>' +
					'<p>'+ pet.genderValue +'</p>' +
					'<p>'+ pet.favePet +'</p>' +
					'<p>'+ pet.koolness +'</p>' +
					'<p>'+ pet.comments +'</p>' +
				'</div>'
			).appendTo('#items');
		};
		console.log(data);
		changePage();
		$('#items').listview('refresh');
	},
	error: function(data) {
		console.log(data);
	}
});
// end showjson function

// Function to call the XML data.
$.ajax({
	"url"			: 'data/data.xml',
	"type"			: 'GET',
	"dataType"	 	: 'xml',
	"success"		: function(pets) {
		$('#items').empty();
		for(var i=0, j=pets.pet.length; i<j; i++){
			var pet = pets.pet[i];
			$(''+
				'<div class="xpets">'+
					getImg(object.petGroups[1], makeSubList) +
					'<h2>'+ pet.petName +'</h2>'+
					'<p>'+ pet.petGroups +'</p>'+
					'<p>'+ pet.genderValue +'</p>'+
					'<p>'+ pet.favePet +'</p>'+
					'<p>'+ pet.koolness +'</p>'+
					'<p>'+ pet.comments +'</p>'+
				'</div>'
			).appendTo('#items');
		};
		console.log(pets.pet);
		changePage();
		$('#items').listview('refresh');
	},
	error: function(pets) {
		console.log(pets.pet);
	}
	
});
// end showxml function

// Function to call the CSV data.
$.ajax({
	"url"			: 'data/data.csv',
	"type"			: 'GET',
	"dataType"		: 'csv',
	"success"		: function(data) {
		$('#items').empty();
		for(var i=0, j=data.pets.length; i<j; i++){
			var pet = data.pets[i];
			$(''+
				'<div class="cpets">'+
					getImg(object.petGroups[1], makeSubList) +
					'<h2>'+ pet.petName +'</h2>'+
					'<p>'+ pet.petGroups +'</p>'+
					'<p>'+ pet.genderValue +'</p>'+
					'<p>'+ pet.favePet +'</p>'+
					'<p>'+ pet.koolness +'</p>'+
					'<p>'+ pet.comments +'</p>'+
				'</div>'
			).appendTo('#items');
		};
		console.log(data);
		changePage();
		$('#items').listview('refresh');
	},
	error: function(data) {
		console.log(data);
	}
	
});
// end showcsv function

// This is to get images for the correct category.
var getImg = function(catName, makeSubList) {
	var imgLi = $('div');
	makeSubList.appendTo(imgLi);
	var newImg = $('img');
	var setSrc = newImg.attr("src", "images/" + catName + ".png");
	imgLi.appendTo(newImg);
};


// My Variables
	//var showData = $("#showData");
	//showData.on('click', getData);
	var clearLink = $("#clearData");	
	clearLink.on('click', clearDataStorage);
	var saveData = $("#submit");
	saveData.on('click', storeData);


}); // End code for page.