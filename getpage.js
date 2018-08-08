autowatch = 1;

var wd = new Dict ('waterData');


function bang() {
	wd.set("salami", "7.99");
	testString = wd.stringify();

	outlet(0, testString)

	}

function build (key, dict, name){
post(key, dict, name);
wd.append(key, dict, name);

}
