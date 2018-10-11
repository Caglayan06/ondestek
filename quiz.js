var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD;
var questions = [];
var answers = [];
var options = [];

var quiz = [
	[ "What is Caglayan's job?", "Student", "Doctor", "Inspector", "Chef"],
    [ "Who was the first scientist to propose the concept of evolution?", "Einstein", "Darwin", "Caglayan", "Tesla"],
	[ "World War I began in which year?", "1923", "1938", "2000", "1914"],
	[ "Adolf Hitler was born in which country?", "Austria", "Germany", "Hungary", "Italy"],
	[ "John F. Kennedy was assassinated in", "Miami", "Ankara", "New York", "Dallas"],
	[ "What is 7 x 3?", "21", "24", "25", "32"],
	[ "What is color?", "orange", "five", "apple", "banana"],
	[ "What is 14 - 5?", "6", "9", "12", "4"],
	[ "The Hundred Years War was fought between what two countries?", "France and England", "England and Turkey",
	  "Italy and Carthage", "Turkey and America"],
	[ "What is 8 / 2?", "10", "2", "4", "12"]
];

function _(x){
	return document.getElementById(x);
}

function renderQuestion(){
	test = _("test");
	if(pos >= quiz.length){
		test.innerHTML = "<h2>Test is over, please send your answers to server for check operation</h2>";
		_("test_status").innerHTML = "Test Completed";

		for(var i=1;i<=10;i++) {
		    control.innerHTML += "Question of "+ i + ": " + questions[i-1] + "<br>";
		    control.innerHTML += "Your answer is: " + answers[i-1] + "<br><br>";
		}
       	result.innerHTML += "<button onclick='checkAnswer()'>Confirm</button>";
		pos = 0;
		return false;
	}
	_("test_status").innerHTML = "Question "+(pos+1)+" of "+quiz.length;
	question = quiz[pos][0];
	chA = quiz[pos][1];
	chB = quiz[pos][2];
	chC = quiz[pos][3];
	chD = quiz[pos][4];
	test.innerHTML = "<h3>"+question+"</h3>";
	test.innerHTML += "<input type='radio' name='choices' value='A'> "+chA+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='B'> "+chB+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='C'> "+chC+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='D'> "+chD+"<br><br>";
	test.innerHTML += "<button onclick='saveAnswer()'>Next Question</button>";
	questions.push(question);
}

function saveAnswer(){
    var choice  = "?";
	choices = document.getElementsByName("choices");
	for(var i=0; i<choices.length; i++){
		if(choices[i].checked){
			choice = choices[i].value;
			options.push(choice);
			
			if(choice == "A") {
			    answers.push(chA);
			}
			if(choice == "B") {
			    answers.push(chB);
			}
			if(choice == "C") {
			    answers.push(chC);
			}
			if(choice == "D") {
			    answers.push(chD);
			}
		}
	}

	if (choice == "?") {
	    alert("Please make a selection.");
	    return false;
	}
	pos++;
	renderQuestion();
} 

// kontrol işlemine gönderirken seçilen şıkları göndererek kontrol ettim(A,B,C,D), cevapları (answers) veya soruları da gönderebiliriz
function checkAnswer() {
		var answers_php = answers; // cevapları göndererek de kontrol edebiliriz ama kullanmadım
		var chosen_options = options;
		$.ajax({
			url: "contact.php",
			type: "POST",
			data: {"chosen_options": chosen_options},
			success: function(result) {
				$(".result").html(result); 			
			}
		})
}		
		
window.addEventListener("load", renderQuestion, false);