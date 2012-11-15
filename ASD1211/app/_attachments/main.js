/*
Author: Kevin Ward
Class: ASD1211
*/

$("#home").on("pageinit", function() {
	console.log("Home page loaded! Yay!");
	// Home page code goes here.
	$("header nav")
		.slideDown()
	;
	
	var changePage = function(pageId) {
		$('#' + pageId).trigger('pageinit');
		$.mobile.changePage($('#' + pageId), {
			type:"post",
			data:$("petForm").serialize(),
			reloadPage:true,
			transition:"slide"
		});
	};

}); // End code for home page.


$("#addItem").on("pageinit", function() {
	console.log("Add Item page loaded!");

// My Variables
var showPet = $("#showData");
showPet.on('click', readPet);
var clearLink = $("#clearData");	
clearLink.on('click', deletePet);
var savePet = $("#submit");
savePet.on('click', createPet);
	
// This is supposed to create the variable doc to pass to the 
//different functions, but it's not reading correctly for some reason.
/*var doc = {
			
	};
	
	doc._id = "pets:" + variable;
	// to give it a custom id
	doc.petGroups = "petGroup";
	doc.petName = "petName";
	doc.genderVal = "genderVal";
	doc.favePet = "favePet";
	doc.koolness = "koolness";
	doc.comments = "comments";*/
	
	// Create portion of CRUD
	// Wrap in a save data function, like storeData from before.
var createPet = function(key){
	$.couch.db("asd1211").saveDoc(doc, {
	    success: function(data) {
	        console.log(data);
	        $.each(data.rows, function(index, pet) {
	        	var petValue = (pet.value || pet.doc);
	        	
	        });
	        $('#petForm').form('refresh');
	    },
	    error: function(status) {
	        console.log(status);
	        
	    }
	});
};
	
	// Read portion of CRUD
var readPet = function(){
	$.couch.db("asd1211").view(doc, {
		success: function(data) {
			console.log(data);
			$('#petList').empty();
			$.each(data.rows, function(index, pet) {
				var item = (pet.value || pet.doc);
				$('#petList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "pets.html?group=" + item.koolPet_Groups)
							.text(item.koolPet_Name + " in Group: " + item.koolPet_Groups)
					)
				);
			});
			$('#petList').listview('refresh');
		},
		error: function(status) {
			console.log(status);
		}
	});
};
	
	// Update portion of CRUD
var updatePet = function(key) {
	$.couch.db("asd1211").openDoc(doc, {
		success: function(data) {
			console.log(data);
			
			// Grab data from the item local storage.
			var value = couch.db("asd1211").getItem(this.key);
			var item = (pet.value || pet.doc);
				
			// Populate the form fields with current localStorage values.
			$("#petGroups").value = item.koolPet_Groups[1].val();
			$("#petName").value = item.koolPet_Name[1].val();
			var radios = document.forms[0].gender;
			for (var i=0; i<radios.length; i++) {
				if (radios[i].value == "Male" && item.gender[1] == "Male") {
					radios[i].attr("checked", "checked");
				} else if (radios[i].value == "Female" && item.gender[1] == "Female") {
					radios[i].attr("checked", "checked");
				};
			};
			if (item.favorite_KoolPet[1] == "Yes") {
				$("#favePet").attr("value", "On");
			};
			$("#koolness").value = item.koolness[1].val();
			$("#comments").value = item.comments[1].val();
				
			// Remove the initial listener from the input "save pet" button.
			createPet.off("click", submit);
			// Change SaveData button Value to Edit Button
			// $("submit").value = "Edit KoolPet";
			$("#submit").val("Edit KoolPet!");
			var editSubmit = $("#submit");
				
			// Save the key value established in this function as a prop of the editSubmit event
			// so we can use that value when we save the data we edited.
			editSubmit.on("click", submit);
			editSubmit.key = this.key;
			
		},
		error: function(status) {
			console.log(status);
		}
	});
};
	
// My Clear Data Function
// Delete portion of CRUD
var deletePet = function(key) {
	$.couch.db("asd1211").removeDoc(doc, {
		success: function(data) {
			if(couch.db("asd1211").length === 0) {
				alert("No KoolPets in the KoolPetsDex.");
			} else {
				couch.db("asd1211").empty();
				alert("All KoolPets have been Released!");
				window.location.reload();
				return false;
			};
			$('#petList').listview('refresh');
			console.log(data);
		},
		error: function(data) {
			console.log(status);
		}
	});
};
	
	// This line of code is supposed to console log every div I click on in the add item page.
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
			}
			
		});

	//any other code needed for addItem page goes here


//The functions below can go inside or outside the pageinit function for the page in which it is needed.

// My storeData function
/*var storeData = function(key){
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
		pet.genderVal		= ["Gender: ", $('input:radio[name=genderVal]:checked').val()];
		pet.favePet			= ["Favorite KoolPet: ", $('input:slider[name=favePet]:on').val()];
		pet.koolness		= ["Koolness Factor: ", $('#koolness').val()];
		pet.comments		= ["Comments: ", $('#comments').val()];
	// Save data into Local Storage: Use Stringify to convert the object to a string.
	localStorage.setItem(id, JSON.stringify(item));
	console.log(key.val());
	alert("Pet saved to the KoolPetsDex!");
}; */
	
// This is to get images for the correct category.
/*	var getImg = function(catName, makeSubList) {
		var imgLi = $('<li>');
		makeSubList.append(imgLi);
		var newImg = $('<img>');
		var setSrc = newImg.attr("src", "images/" + catName + ".png");
		imgLi.append(newImg);
	}; */

// My Make Item Links Function
	// Create the edit and delete links for each stored item when displayed.
/*	var makeItemLinks = function(key, linksLi) {
		// Add edit single item link
		var editLink = $('<a>');
		editLink.attr("href", "#addItem");
		editLink.key = key;
		var editText = "Edit KoolPet";
		editLink.addClass("editLink")
			.on('click', editItem)
			.html(editText);
		linksLi.appendTo(editLink);

		// Add my line break
		var breakTag = $('<br>');
		linksLi.append(breakTag);


		// Add delete single item link
		var deleteLink = $('<a>');
		deleteLink.attr("href", "#addItem");
		deleteLink.key = key;
		var deleteText = "Release KoolPet";
		deleteLink.addClass("deleteLink")
			.on('click', deleteItem)
			.html(deleteText);
		linksLi.appendTo(deleteLink);
	};
	
	// This is supposed to write data from Local Storage back to the browser.
	var makeDiv = $('<div>');
	// makeDiv.attr("id", "items"); // Found out I don't need this line anymore.
	var makeList = $('<ul>');
	// makeDiv.appendChild(makeList); // Modified this line to work with my current code.
	$('#petList').appendTo(makeList);
	// This code should add the data to my page when I press show data.
	$('#petList').append(makeDiv);
	// $('petList').style.display = "block";
	for (var i=0, len=localStorage.length; i<len; i++) {
		var makeLi = $('<li>');
		var linksLi = $('<div>');
		makeList.append(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		// Convert strings back to being an object from localStorage value.
		var object = JSON.parse(value);
		var makeSubList = $('<div>');
		makeLi.append(makeSubList);
		// This next line is to grab the Img that fits the category it's in.
		getImg(object.petGroups[1], makeSubList);
		for (var n in object) {
			var makeSubLi = $('<div>');
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
		
		// Populate the form fields with current localStorage values.
		$("#petGroups").value = item.petGroups[1].val();
		$("#petName").value = item.petName[1].val();
		var radios = document.forms[0].genderVal;
		for (var i=0; i<radios.length; i++) {
			if (radios[i].value == "Male" && item.genderVal[1] == "Male") {
				radios[i].attr("checked", "checked");
			} else if (radios[i].value == "Female" && item.genderVal[1] == "Female") {
				radios[i].attr("checked", "checked");
			};
		};
		if (item.favePet[1] == "Yes") {
			$("#favePet").attr("value", "On");
		};
		$("#koolness").value = item.koolness[1].val();
		$("#comments").value = item.comments[1].val();
		
		// Remove the initial listener from the input "save pet" button.
		storeData.off("click", submit);
		// Change SaveData button Value to Edit Button
		// $("submit").value = "Edit KoolPet";
		$("#submit").val("Edit KoolPet!");
		var editSubmit = $("submit");
		
		// Save the key value established in this function as a prop of the editSubmit event
		// so we can use that value when we save the data we edited.
		editSubmit.on("click", submit);
		editSubmit.key = this.key;
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
};*/


// My Clear Data Function
/*var clearDataStorage = function(){
	if(localStorage.length === 0) {
		alert("No KoolPets in the KoolPetsDex.");
	} else {
		localStorage.empty();
		alert("All KoolPets have been Released!");
		window.location.reload();
		return false;
	};
};*/

// Save this code!
var changePage = function(pageId) {
	$('#' + pageId).trigger('pageinit');
	$.mobile.changePage($('#' + pageId), {
		type:"post",
		data:$("petForm").serialize(),
		reloadPage:true,
		transition:"slide"
	});
};

}); // End code for page.




$("#showItem").on("pageinit", function() {
	console.log("Show Item page loaded!");
	
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
		$('#' + pageId).trigger('pageinit');
		$.mobile.changePage($('#' + pageId), {
			type:"post",
			data:$("petForm").serialize(),
			reloadPage:true,
			transition:"slide"
		});
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

//My Variables
var showPet = $("#showData");
showPet.on('click', readPet);
var clearLink = $("#clearData");	
clearLink.on('click', deletePet);

//var showJSON = $("#sJ");
//showJSON.on('click', showJ);
//var showXML = $("#sX");
//showXML.on('click', showX);
//var showCSV = $("#sC");
//showCSV.on('click', showC);


// AJAX function to call the JSON data.
//function showJ() {

	$.couch.db("asd1211").view("koolpetsdex/pets", {
		success: function(data) {
			console.log(data);
			$('#petList').empty();
			$.each(data.rows, function(index, pet) {
				var item = (pet.value || pet.doc);
				$('#petList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "pets.html?group=" + item.koolPet_Groups)
							.text("Name: " + item.koolPet_Name + " in Group: " + item.koolPet_Groups + " Gender: " + item.gender + " Favorite KoolPet: " + item.favorite_KoolPet + " Koolness Factor: " + item.koolness + " and Comments: " + item.comments)
					)
					//console.log(item.koolPet_Name + item.koolPet_Groups + item.gender + item.favorite_KoolPet + item.koolness + item.comments);
				);
			});
			$('#petList').listview('refresh');
		},
		error: function(status) {
			console.log(status);
		}
	});

// This is to get images for the correct category.
// This is just not working anyways.
/*var getImg = function(catName, makeSubList) {
	var imgLi = $('<li>');
	makeSubList.append(imgLi);
	var newImg = $('<img>');
	var setSrc = newImg.attr("src", "" + catName + ".png");
	imgLi.append(newImg);
};*/

	// My Clear Data Function
	// Delete portion of CRUD
	var deletePet = function(key) {
		$.couch.db("asd1211").removeDoc(doc, {
			success: function(data) {
				if(localStorage.length === 0) {
					alert("No KoolPets in the KoolPetsDex.");
				} else {
					couch.db("asd1211").empty();
					alert("All KoolPets have been Released!");
					window.location.reload();
					return false;
				};
				$('#petList').listview('refresh');
				console.log(data);
			},
			error: function(data) {
				console.log(status);
			}
		});
	};
	
}); // End code for page.




var urlVars = function(urlData) {
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	console.log(urlValues);
	return urlValues;
};

$("#showPets").on("pageinit", function() {
	console.log("Show Pets page loaded!");
	
	var pets = urlVars()["group"];
	/*console.log(pets);
	$.couch.db("asd1211").view("koolpetsdex/groups", {
		key: "groups: " + "petGroups"
	});*/
	
	$.couch.db("asd1211").view("koolpetsdex/groups", {
		success: function(data) {
			key: "groups: " + "petGroups"
			console.log(data);
			$('#petList').empty();
			$.each(data.rows, function(index, pet) {
				var item = (pet.value || pet.doc);
				$('#petList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "pets.html?group=" + item.koolPet_Groups)
							.text("Name: " + item.koolPet_Name + " in Group: " + item.koolPet_Groups + " " + item.genderVal)
					)
					//console.log(koolPet_Name + koolPet_Groups + gender + favorite_KoolPet + koolness + comments);
					//console.log(petName + petGroups + genderVal + favePet + koolness + comments);
				);
			});
			$('#petList').listview('refresh');
		},
		error: function(status) {
			console.log(status);
		}
	});
	
	var changePage = function(pageId) {
		$('#' + pageId).trigger('pageinit');
		$.mobile.changePage($('#' + pageId), {
			type:"post",
			data:$("petForm").serialize(),
			reloadPage:true,
			transition:"slide"
		});
	};
});	// End code for show pets page.

