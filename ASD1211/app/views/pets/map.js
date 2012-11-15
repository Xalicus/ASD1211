function (doc) {
  if (doc._id.substr(0,5) === "pets:") {
    emit(doc._id.substr(5), {
    	"koolPet_Groups": doc.petGroups,
    	"koolPet_Name": doc.petName,
    	"gender": doc.genderVal,
    	"favorite_KoolPet": doc.favePet,
    	"koolness": doc.koolness,
    	"comments": doc.comments
    });
  }
};