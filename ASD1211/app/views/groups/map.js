function (doc) {
  if (doc._id.substr(0,7) === "groups:") {
    emit(doc._id.substr(7), {
    	"koolPet_Groups": doc.petGroups,
    	"koolPet_Name": doc.petName,
    	"gender": doc.genderVal,
    	"favorite_KoolPet": doc.favePet,
    	"koolness": doc.koolness,
    	"comments": doc.comments
    });
  }
};