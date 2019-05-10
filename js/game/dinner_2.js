// PLOT POINTS:
// 1) Studying at Jack's
// 2) Suspecting Jack is gay
// 3) Trying to get you a private tutor (threatening your relationship)

function Start_Dinner_2(){

	m("Привет, сладкий.");
	Show("mom","mom_sit");

	switch($.waiting_action){
		case "eat":
			m("О, ты начал есть без меня. Ты очень нетерпеливый.");
			n("...действительно.");
			break;
		case "wait":
			m("Ты мог бы начать кушать без меня. Нет необходимости употреблять еду остывшей.");
			n("...конечно.");
			break;
		case "play":
			m("Играть с едой - это очень не по взрослому, насколько ты знаешь.");
			n("Ага-ага.");
			break;
	}

	m("Отец задерживается. Он присоединится к нам за обедом в течение часа.");

	Choose({
		"Здорово. Давай кушать.": function(message){
			n(message);
			n("*ням ням ням*");
			m(". . .");
			m("Какие у тебя планы на завтра?");
			Start_Dinner_2_1();
		},
		"Мне есть что сказать вам обоим.": function(message){
			n(message);
			m("Хорошо. Расскажешь позже, когда папа вернется.");
			n("О-кей.");
			m(". . .");
			n("*ням ням ням*");
			m("Какие у тебя планы на завтра?");
			Start_Dinner_2_1();
		},
		"Сперва мне нужно кое-что рассказать тебе.": function(message){
			n(message);
			m("Погоди Ник, я ещё не узнала как прошёл твой день!");
			n("Сегодняшний день был замечательным.");
			m("Ладно. И что ты планировал на завтра?");
			Start_Dinner_2_1();
		}
	});

}

function Start_Dinner_2_1(){

	n("Оу. ам... учёба.");
	n("Да. Завтра я учусь.");
	m("Какому предмету?");
	n("Эаа...");

	Choose({
		"Химия.": function(message){
			$.studying_subject = "химия";
			Start_Dinner_2_2(message);
		},
		"Математика.": function(message){
			$.studying_subject = "математика";
			Start_Dinner_2_2(message);
		},
		"Информатика.": function(message){
			$.studying_subject = "информатика";
			Start_Dinner_2_2(message);
		}
	});

}

function Start_Dinner_2_2(message){

	n(message);
	m("Хорошо.");
	m("Ты действительно можешь улучшить свои оценки по предмету "+$.studying_subject+".");
	n(". . .");
	m("Итак, завтра я пойду в библиотеку.");
	m("Я увижу, как ты там учишься?");
	n("На самом деле, я собираюсь учиться у Джека.");
	m("Снова?");
	m("Ты слишком много времени с ним проводишь.");

	Choose({
		"Мы просто учимся вместе, вот и все.": function(message){
			$.relationship = "study";
			Buddy_1(message);
		},
		"Мам, Джек для меня...  больше чем друг.": function(message){
			
			$.relationship = "best friend";
			n(message);
			
			$.lying_about_hanging_out = true;
			m("О, вы как лучшие друзья?");
			n("Ам. Ну--");
			m("Значит, ты просто тусуешься, а не учишься.");
			n("Мы УЧИМСЯ!");
			m(". . .");
			m("Ладно, просто не ври мне.");
			n("Я не вру.");
			Buddy_1_point_5();
		},
		"Ну да, так поступают хорошие приятели.": function(message){
			$.relationship = "friend";
			Buddy_1(message);
		}
	});

}


///////////////////////////////////////
////// 2) SUSPECTING Jack IS GAY ///////
///////////////////////////////////////


function Buddy_1(message){
	n(message);

	if($.relationship!="study"){
		$.lying_about_hanging_out = true;
		m("Оу. Значит ты просто тусуешься, а не учишься.");
		n("Мы УЧИМСЯ!");
		m(". . .");
		m("Ладно, просто не ври мне.");
		n("Я не вру.");
	}else{
		m("Окей. Я всего лишь хотела убедиться.");
		n("В... чём?");
	}

	Buddy_1_point_5();
}

function Buddy_Caught_Lying_1(message,callback){
	n(message);
	m("Подожди...");
	m("Я думала, ты скажешь мне, что вы 'просто учитесь вместе'.");
	m("Ты не рассказывал мне о вашей дружбе.");
	$.lying_about_relationship = true;
	Choose({
		"Ууупс, я имел ввиду, что он одноклассник.": callback,
		"Ну, он также может быть моим другом...": callback,
		"Нет, я всегда говорил, что мы друзья.": callback
	});
}

function Buddy_1_point_5(){

	m("Просто... не зависай с ним слишком часто.");
	m("Люди могут неправильно понять.");

	Choose({
		"О. Нет, да, мы всего лишь друзья.": function(message){
			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,Buddy_2);
			}else{
				Buddy_2(message);
			}
		},
		"Неправильная мысль может быть правильной мыслью.": Buddy_4,
		"Что ты имеешь ввиду под... неправильным пониманием?": Buddy_3
	});

}

function Buddy_2(message){
	n(message);
	m("Ладно.");
	if($.lying_about_relationship){
		m("Просто не ври мне.");
		n("Я не буду.");
		m(". . .");
		m("Но... насчёт твоего времяпровождения с Джеком.");
	}
	m("Некоторые люди могут что-то предполагать, поскольку...");
	m("Ты знаешь... он выглядит как...");
	m("Как гей?");
	Buddy_Choice();
}

function Buddy_3(message){
	n(message);
	m("Только между нами, я предполагаю, он может быть... ты знаешь...");
	n("Нет, что же?");
	m("Гей!");
	m("Он выглядит и разговариет как гей.");
	Buddy_Choice();
}

function Buddy_4(message){
	n(message);
	m("О, это как Дзен, да?");
	n("Эм.");
	m("Дзен - понятие о природе, и ваш одноклассник Джек, он...");
	m("...ты знаешь, не кажется натуралом?");
	Choose({
		"Ты думаешь, он гей?": function(message){
			n(message);
			m("Именно!");
			m("Ты тоже его подозреваешь!");
			Buddy_Choice();
		},
		"Не говори такое про моего друга!": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){

					n(message);
					m("Ладно.");
					m("Просто не ври мне.");
					n("Я не буду.");
					m(". . .");

					m("Но даже если ты согласен с тем, что плохо казаться 'не натуралом'...");
					n("Я никогда не говорил--");
					m("...я просто присматриваю за тобой! Потому что он ведёт себя так, знаешь ли...");
					m("Как гей!");
					Buddy_Choice();

				});
			}else{

				n(message);
				m("Я честна с тобой.");
                m("Но даже если ты согласен с тем, что плохо казаться 'не натуралом'...");
                n("Я никогда не говорил--");
                m("...я просто присматриваю за тобой! Потому что он ведёт себя так, знаешь ли...");
                m("Как гей!");
				Buddy_Choice();

			}

		},
		"Что значит, 'он не натурал'?": Buddy_3
	});
}

function Buddy_Choice(){
	if($.relationship=="friend"){
		m("И поскольку ты говоришь, что он 'хороший друг'...");
		m("Люди могут подумать, что ты такой же гей, как и он .");
	}
	if($.relationship=="best friend"){
		m("И поскольку ты говоришь, что он твой ЛУЧШИЙ друг ...");
		m("Люди могут подумать, что ты такой же гей, как и он.");
	}
	Choose({
		"Он ведёт себя как гей. К счастью, это не так.": function(message){
			n(message);
			m("Видишь? Ты тоже думал, что в этом что-то не так.");
			n("...конечно.");
			Buddy_Aftermath();
		},
		"Что плохого в гействе?!": function(message){
			n(message);
			m("Ничего! Ничего.");
			Buddy_Aftermath();
		},
		"Возможно... мой друг - гей.": function(message){

			if($.relationship=="study" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){
					n(message);
					m("Окей.");
					m("Просто не ври мне.");
					n("Я не буду.");
					m(". . .");
					Buddy_Aftermath();
				});
			}else{
				n(message);
				Buddy_Aftermath();
			}
			
		}
	});
}


function Buddy_Aftermath(){

	m("Не пойми меня неправильно.");
	m("Я не говорю, что такие люди плохие!");
	m("Я просто думаю... ты должен быть осторожен с одним из них.");
	m("Джек может, знаешь ли, попытаться завербовать тебя.");

	Show("clock_time","clock_1910");
	Show("nicky","dinner_nicky_defiant");

	Choose({
		"что.": Buddy_Aftermath_2,
		"чтооо.": Buddy_Aftermath_2,
		"чтооооооооооооооо.": Buddy_Aftermath_2
	});
}

function Buddy_Aftermath_2(message){
	
	n(message);

	n("Как ты...");
	n("Уф, проехали.");
	m("Ник, прости, что я тебя раздражаю.");
	n("Нет, мама, прекрати делать это--");
	m("Вернёмся к разговору про твои отметки.");
	m("А теперь, что ты говорил мне о предмете, который будешь учить завтра?");

	Show("nicky","dinner_nicky_sit");
	n(". . .");
	n("Эфффммммм...");

	Choose({
		"Информатика?": function(message){
			$.studying_subject_2 = "информатика";
			Grades_Start(message);
		},
		"Химия?": function(message){
			$.studying_subject_2 = "химия";
			Grades_Start(message);
		},
		"Математика?": function(message){
			$.studying_subject_2 = "математика";
			Grades_Start(message);
		}
	});

}


//////////////////////////////////////////
////// 3) A POSSIBLE PRIVATE TUTOR ///////
//////////////////////////////////////////

function Grades_Start(message){
	n(message);
	m(". . .");
	if($.studying_subject!=$.studying_subject_2){
		Grades_Start_1();
	}else{
		Grades_Start_2();
	}
}

function Grades_Start_1(){
	m("Сначала ты сказал мне, что это "+$.studying_subject+".");
	m("Теперь ты говоришь мне, что это "+$.studying_subject_2+"?");
	$.lying_about_studying = true;
	n("Мам, я просто запутал--");
	if($.lying_about_hanging_out || $.lying_about_relationship){
		m("Ты ДВАЖДЫ лгал мне во время этого обеда.");
		n("Я не лгал про--");
	}
	m("Как бы ни было, твои оценки по обоим предметам ужасны.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Start_2(){
	m("Ты заколебался на мгновение.");
	n("Я ел.");
	m("Хорошо.");
	if($.lying_about_hanging_out){
		m("Интересно, учишься ли ты с Джеком вообще или просто всегда тусуешься.");
		n("Мы учимся.");
	}
	m(". . .");
	m("Всё ещё, твои оценки по  предмету  "+$.studying_subject_2+"  ужасны.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Explaining(){
	Start_Dinner_3();
}
