// is short
// What ARE you. Fake crying, and don't tell your dad
// Weave it

function Start_Dinner_4(){

	n(". . .");
	m("Это наверное потому, что твой папа почти никогда не бывает дома?");
	m("Без хорошего мужского образца для подражания ты пребываешь в замешательстве...");

	Choose({
		"Ага, потому что папа ТАКОЙ большой образец для подражания.": function(message){
			n(message);
			m("Ник, несмотря ни на что, он твой отец. Ты должен любить его.");
			My_Fault();
		},
		"Это не так работает. Я всегда был би.": function(message){
			n(message);
			m("С чего ты взял?! Ты эксперт в психологии или что?!");
			My_Fault();
		},
		"Знаешь что? Наверное ты права.": function(message){
			n(message);
			m("Я знаю...");
			My_Fault();
		}
	});

}

function My_Fault(){
	
	Show("clock_time","clock_1930");

	n(". . .");
	m("Это всё моя вина...");
	m("Я сказала тебе быть осторожным рядом с такими типами людей, но сказала это слишком поздно...");

	Show("mom","mom_cry");

	m("[рыдает]");
	m("О, Ник! Мой бедный ребёнок.");

	Show("nicky","dinner_nicky_sit");

	Choose({
		"Мам... пожалуйста, не плачь...": Cry_1,
		"Прекращай этот цирк.": Cry_2,
		"[плачет]": Cry_3
	});
}

function Cry_1(message){

	$.crying = "sympathy";

	n(message);
	m("хныы... хныы... хныы...");
	n("Мне очень жаль. О Джеке, о лжи, обо всем.");
	m("оуввв... оуввв...");
	n("Беру свои слова обратно.");
	m("сопит...");
	n("...пожалуйста...");
	What_Are_You();
}

function Cry_2(message){

	$.crying = "anger";
	Show("nicky","dinner_nicky_defiant");

	n(message);
	m("хныы... хныы... хныы...");
	n("Серьёзно, твой плач ТАК фальшиво звучит.");
	m("оуввв... оуввв");
	n("Ты заткнёшься?!");
	m("сопит...");
	n("ЗАТ-КНИСЬ.");
	What_Are_You();

}

function Cry_3(message){

	$.crying = "mocking";
	Show("nicky","dinner_nicky_outrage");

	n("БОУУУУУУУ");
	m("хныы... хныы... хныы...");
	n("УА УА УА УА УАААААА");
	m("oувв... oувв...");
	n("ВААааАА-ВАА-ВАЙ Bвв УА УАВВв вввВВВ-ХНЫЫЫК УО УО УО Ваааа");
	m("сопит...");

	Show("nicky","dinner_nicky_defiant");
	n("Ладно, мы закончили?");
	What_Are_You();

}

function What_Are_You(){

	m(". . .");
	m("Ник... кем ты являешься?");
	n("Извини, что?");

	Show("nicky","dinner_nicky_sit");

	Show("mom","mom_sit");
	m("Кем ты <i>являешься</i>?");

	Choose({
		"Я бисексуал.": function(message){

			$.what_are_you = "bisexual";

			n(message);
			if($.admit_bisexuality){
				m("...и ты сказал, что это означает...");
			}
			n("Сексуальное влечение к мужчинам и к женщинам.");
			m("Но это неправильно.");
			m("Ты должен выбрать что то одно.");
			n("Оно... не так работает. Вообще.");
			Have_You_Had_Sex();

		},
		"Я просто в замешательстве.": function(message){

			$.what_are_you = "confused";

			n(message);
			m("...Я знаю.");
			m("Мне жаль, что Джек ввёл тебя в заблуждение.");
			m("Ты проходишь фазу, всё в порядке.");
			n(". . .");
			m("Это нормально. Это нормально...");
			Have_You_Had_Sex();

		},
		"Я твой сын, чёрт возьми": function(message){

			$.what_are_you = "son";

			n(message);
			n(". . .");
			n("Разве этого недостаточно?");
			Have_You_Had_Sex();

		}
	});
}

function Have_You_Had_Sex(){
	m(". . .");
	m("У тебя был секс с Джеком.");
	Choose({
		"Да.": function(message){
			n(message);
			m("[ПРИСТУПЫ ТОШНОТЫ]");
			Have_You_Had_Sex_2();
		},
		"Нет.": function(message){
			n(message);
			m("Пожалуйста, прекрати лгать... Я видела твои смски...");
			n("Мы просто обменивались пошлыми сообщениями, но на самом деле не--");
			m("...и твои фотографии...");
			Have_You_Had_Sex_2();
		},
		"Я не говорил.": function(message){
			n(message);
			m("Боже мой... у тебя был.");
			Have_You_Had_Sex_2();
		}
	});
}

function Have_You_Had_Sex_2(){

	n(". . .");
	m("Который... из вас  — 'женщина'?");

	Show("nicky","dinner_nicky_outrage");

	n("ОЙ, ДА ЛАДНО!");
	n("Это равносильно вопросу: какая палочка для еды является вилкой...");
	m("Кто из вас?...");

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Обычно я пассив.":function(message){
			$.top_or_bottom = "bottom";

			n(message);
			Throw_Up();
		},
		"В основном, Джек.":function(message){
			$.top_or_bottom = "top";

			n(message);
			m("З-значит... ты ещё можешь быть натуралом! В-верно?...");
			m("Если... ты знаешь... ты тот, кто вставляет ему свой...");
			m("свой...");
			Throw_Up();
		},
		"Мы по очереди менялись ролями.":function(message){
			$.top_or_bottom = "versatile";

			n(message);
			Throw_Up();
		}
	});
}

function Throw_Up(){

	PlaySound("sfx","dinner_vomit");

	Show("clock_time","clock_1940");
	Show("mom","mom_vomit");
	Show("table","dinner_table_2");
	Wait(1000);

	Choose({
		"что.": Father_Soon,
		"чтооо.": Father_Soon,
		"чтоооооооооооооооо.": Father_Soon
	});

}

function Father_Soon(message){

	n(message);

	Show("mom","mom_sit");

	m(". . .");
	m("Твой отец скоро вернётся.");
	n("Ну вот... а еда уже успела остыть.");
	m("Твой папа сегодня долго работал. Наверное, у него был напряжённый день.");
	m("И... пожалуйста... когда он вернётся...");
	m("Обещай мне, что будешь держать всё это в секрете?");
	n(". . .");

	m("Не рассказывай ему про Джека");

	switch($.what_are_you){
		case "bisexual":
			m("Не рассказывай ему про свою бисексуальность.");
			break;
		case "confused":
			m("Не рассказывай ему, что ты в замешательстве насчёт своей ориентации.");
			break;
		case "son":
			m("Не рассказывай ему, что ты мог... делать кое-что с Джеком, и скрывал это от нас.");
			break;
	}

	switch($.top_or_bottom){
		case "top":
			m("Не рассказывай ему, что ты делал из Джека женщину.");
			break;
		case "bottom":
			m("Не рассказывай ему, что ты поступил с Джеком как женщина.");
			break;
		case "versatile":
			m("Не рассказывай ему, что вы с Джеком оба поступали как женщины.");
			break;
	}

	m("Ладно?...");

	Choose({
		"Ладно.": function(message){
			$.promise_silence = "yes";
			
			n(message);
			m("Ладно.");
			m(". . .");
			m("Твой отец уже здесь.");
			Father_Soon_2();
		},
		"Нет. Никакого 'ладно'": function(message){
			$.promise_silence = "no";
			
			n(message);
			m("Ник, нет нет нет, прошу--");
			m("О нет. Твой отец уже здесь.");
			Father_Soon_2();
		},
		"До тех пор, пока ты ему не расскажешь.": function(message){
			$.promise_silence = "tit for tat";
			
			n(message);
			m("Я не расскажу.");
			n("Пообещай мне.");
			m("Я обе--");
			m("Тсссс. Твой отец уже здесь.");
			Father_Soon_2();
		}
	});

}

function Father_Soon_2(){
	Show("nicky","dinner_nicky_sit");
	Start_Dinner_5();
}
