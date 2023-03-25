const questions = [
	{
		question: "Яка мова програмування використовується в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Що означає CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Що означає HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В якому році був створений JavaScript?",
		answers: ["1996", "1995", "1994", "всі відповіді не правильні"],
		correct: 2,
	},
];

const headerContainer=document.querySelector('#header');
const listContainer=document.querySelector('#list');
const submitBtn=document.querySelector('#submit');

let questionIndex=0;
let score=0;



clearPage();
showQuestion();
submitBtn.onclick=checkAnswer;

function clearPage(){
	headerContainer.innerHTML='';
	listContainer.innerHTML='';
}

function showQuestion(){

const headerTemplate=`<h2 class="title">%title%</h2>`;
const title=headerTemplate.replace('%title%', questions[questionIndex]['question']);
headerContainer.innerHTML=title;


let answerNumber=1;
for(answerText of questions[questionIndex]['answers']){

	const questionTemplate=
	`<li>
		<label>
			<input value="%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
		</label>
	</li>`;

	/*let answerHTML=questionTemplate.replace('%answer%',answerText);
    console.log (answerHTML);
	answerHTML=answerHTML.replace('%number%',answerNumber);
	console.log (answerHTML);*/

	const answerHTML=questionTemplate
	                    .replace('%answer%',answerText)
						.replace('%number%',answerNumber);

	listContainer.innerHTML+=answerHTML;
	answerNumber++;
}
}

function checkAnswer(){
	const checkedRadio=listContainer.querySelector('input[type="radio"]:checked');
	

	if (!checkedRadio){
		submitBtn.blur();
		return
	}

	const userAnswer=parseInt(checkedRadio.value);

	console.log(userAnswer, questions[questionIndex]['correct']);
if (userAnswer===questions[questionIndex]['correct']){
	score++;
	console.log('score=', score);
}
	if(questionIndex !== questions.length-1){
    	console.log('Це НЕ останнє запитання');
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	}else{
		console.log('Це останнє запитання');
		clearPage();
		showResults();
	}
}


function showResults(){
	console.log('show result started');
	console.log(score);

	const resultsTemplate=`
	<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>
	`;

	let title, message;

	if(score===questions.length){
		title='Вітаємо';
		message='Ви відповіли правильно на всі запитання';
	}else if((score*100)/questions.length>=50){
		title='Не поганий результат';
		message='Ви відповіли правильно на більшість запитань';
	}else{
		title='Потрібно. постаратись';
		message='Наразі, у Вас  менше половини правильних відповідей';
	}

	let result=`${score} із ${questions.length}`;

	const finalMessage=resultsTemplate
						.replace('%title%',title)
						.replace('%message%',message)
						.replace('%result%',result)

	headerContainer.innerHTML=finalMessage;

	submitBtn.blur();
	submitBtn.innerHTML='Розпочати знову';
	submitBtn.onclick=function(){
		history.go();
	}
};
