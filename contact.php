    <?php
$chosen_options = $_POST["chosen_options"];
$key = ["A","B","D","A","D","A","A","B","A","C"];
$correct_answers = 0;
$false_answers = 0;
for($i = 0; $i < 10; $i++){
	if($chosen_options[$i] == $key[$i]) {
		$correct_answers+=1;
	}
	else {
		$false_answers+=1;
	}
}
echo "Correct answers: $correct_answers\n";
echo "False answers: $false_answers\n";
?>