function (doc) {
  if (doc._id.substr(0,5) === "reptiles:") {
    emit(doc._id.substr(5), {
    	"koolPet_Groups": doc.petGroups,
    	"koolPet_Name": doc.petName,
    	"gender": doc.genderValue,
    	"favorite_KoolPet": doc.favePet,
    	"koolness": doc.koolness,
    	"comments": doc.comments
    });
  }
};