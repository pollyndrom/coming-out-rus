 // Then we broke up soon/X...
// Three stories (Lie / Truth / Half-truth) ... one interaction with each.
// Did you skip or not? Tie that into the sections.
// Your final choice, a whaaaaaat.

function Start_Outro(){

	// Just clear dialogue & stuff.
	queue(ClearScene,0);
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse_2");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	///////////////////////////////

	if($.breaking_up_soon){
		N("И спустя три дня мы расстались.");
	}else{
		N("И спустя три недели мы расстались.");
	}

	// Weave - intro
	if($.main_menu_convo_1==1){
		p(". . .");
		N("Я же говорил, она не заканчивается весёлыми единорогами.");
	}else if($.main_menu_convo_1==3){
		p(". . .");
		N("Как я и говорил. Нет крови, но есть слёзы.");
	}else if($.main_menu_convo_2==1){
		p(". . .");
		N("Ты был прав. Я немного зануда.");
	}

	Choose({
		"МОЁ СОЧУВСТВИЕ.":function(message){
			p(message);
			N("Пусть чувства текут, мой друг.");
			Closure();
		},
		"Да ладно тебе, он холодный чувак.":function(message){
			p(message);
			N("Не отрицаю этого.");
			Closure();
		},
		"Не могу сказать, что не предвидел этого...":function(message){
			p(message);
			N("Ага... мы с Джеком тоже это предвидели.");
			Closure();
		}
	});

}

function Closure(){

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Тьфу.");
	p("Я чувствую себя отвратительно, используя те же цветные диалоговые формы, что и персонаж отца.");

	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Ты кое-что мне напомнил: ");
    N("Я заменил многих персонажей.");
	N("Все имена были изменены, кроме моего.");
	N("Я полностью исключил своего младшего брата, потому что он невиновен.");
	N("И вернул своего отца, хотя он покинул семью задолго до 2010 года.");

	if($.main_menu_convo_2==3){
		N("Как ты сказал, эта 'правдивая' игра полна лжи.");
	}
	
	p("Ты мог бы, по крайней мере, дать мне другой цвет.");
	N("С той ночи прошло четыре года...");
	N("Как ты думаешь, что произошло потом?");

	if($.main_menu_convo_2==2){
		N("Не волнуйся. Как мы уже говорили в Главном меню, здесь нет правильных ответов.");
	}

	$.coming_out_stories_left = 3;
	$.order_of_stories = [];

	Choose({
		"Чувак, я не знаю, просто расскажи мне.": function(message){
			p(message);
			N("Хорошо, я расскажу тебе, что произошло.");
			N("...и что произошло, и что произошло.");
			p("Что.");
			Closure_Story();
		},
		"Дай угадать, всё станет лучше?": function(message){
			p(message);
			N("Да, действительно! Во всех трех версиях случившегося.");
			p("Что.");
			Closure_Story();
		},
		"Цветы и радуга и единороги?": function(message){
			p(message);
			N("Да, действительно! По крайней мере, в одной из трёх версий случившегося.");
			p("Конечно.");
			Closure_Story();
		}
	});

}

function Closure_Story(){

	if($.coming_out_stories_left==3){
		N("Какую версию последствия моего каминг-аута ты хотел бы услышать сперва?");
		N("Не переживай, ты услышишь все три.");
	}else if($.coming_out_stories_left==2){
		N("Какую версию ты хотел бы услышать дальше?");
	}else if($.coming_out_stories_left==1){
		N("И наконец, ты услышишь последнюю историю...");
	}else{
		Finale_1();
		return;
	}

	$.coming_out_stories_left -= 1;

	var options = [];
	if(!$.told_story_lie) options["Ложь."]=Tell_Me_A_Lie;
	if(!$.told_story_truth) options["Правда."]=Tell_Me_A_Truth;
	if(!$.told_story_half_truth) options["Полуправда."]=Tell_Me_A_Half_Truth; 
	Choose(options);

}

function Is_Last_Story(){
	if($.coming_out_stories_left==0){
		if($.asked_about && $.asked_credits){
			p("И снова ты делаешь одиночную кликабельную опцию...");
		}else{
			p("Почему ты даёшь выбрать единственную оставшуюся опцию?");
			N("Нет идей. Двигаемся дальше.");
		}
	}
}



function Tell_Me_A_Lie(message){

	$.told_story_lie = true;
	$.order_of_stories.push("lie");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Отлично.");
	Is_Last_Story();

	N("Я сбежал из дома, не имея ничего, кроме багажной сумки, полной съедобного нижнего белья.");
	if($.im_a_poet){
		N("Я бродил по Большому белому северу.");
        N("Поддерживая себя, сочиняя любительские стихи для незнакомцев.");
	}else{
		N("Я бродил по Большому белому северу.");
        N("Поддерживая себя, делая неинтересные веб-игры.");
	}
	N("Я ел цветы. Следил за радугой.");
    N("И подружился с гомосексуальным единорогом.");
	p(". . .");
	N("В конце концов я добрался до Аляски,");
    N("где встретил взрослую бисексуальную пару по имени Бонни и Клайд.");
	N("Бонни была пумой в середине 30-х, а Клайд был челопантерой начала 40-х.");

	// FAMILY WITH BENEFITS
	// Weave in -- top or bottom

	Choose({
		"Я думаю, съедобное белье — это и еда, и одежда.": function(message){
			$.outro_convo_lie = 1;
			p(message);
			N("А благодаря моей гибкости багажная сумка удваивается как корпус!");
			Tell_Me_A_Lie_2();
		},
		"Эта история — фракталы свихнутости.": function(message){
			$.outro_convo_lie = 2;
			p(message);
			N("МОЯ ИСТОРИЯ. МОИ ПРАВИЛА.");
			Tell_Me_A_Lie_2();
		},
		"...\"челопантера\".": function(message){
			$.outro_convo_lie = 3;
			p(message);
			N("Также известный как пидогуар.");
			Tell_Me_A_Lie_2();
		}
	});
}
function Tell_Me_A_Lie_2(){
	
	N("Они приняли меня как своего приёмного ребёнка,");
    N("а я был их мальчиком на полную ставку.");

	if($.outro_convo_lie==1){
		p("...Ещё раз спасибо за твою, эм, гибкость.");
	}

	switch($.top_or_bottom){
		case "top": N("Как мы знаем, мне нравится, когда мои партнеры становятся 'женщиной' в отношениях."); break;
		case "bottom": N("Как мы знаем, я обычно 'женщина' в отношениях."); break;
		case "versatile": N("Как мы знаем, я люблю по очереди с партнёром быть 'женщиной' в отношениях."); break;
	}

	N("Они воспитали меня, показали мне любовь,");
    N("и я вырос, чтобы стать продуктивным членом общества.");

	switch($.outro_convo_lie){
		case 2: p("И когда ты увеличиваешь масштаб этого фрактала, возникает БОЛЬШЕ свихнутости."); break;
		case 3: p("...\"ЧЕЛОПАНТЕРА\"."); break;
	}

	N("Они были моей новой семьёй.");
	N("Семьёй... выгодной.");

	p(". . .");

	Closure_Story();

}





function Tell_Me_A_Truth(message){

	$.told_story_truth = true;
	$.order_of_stories.push("truth");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Вот так.");
	Is_Last_Story();

	N("Я принял совет Джека и пародировал 'Начало' в своей 'странной веб-игре' под названием “Reimagine :The Game”.");
	switch($.inception_answer){
		case "awake": N("Я не сказал, что Кобб проснулся в конце."); break;
		case "dream": N("Я не сказал, что фильм был всего лишь сном, хотя..."); break;
		case "neither": N("По прежнему думаю, что это не имеет значения, если Кобб всё ещё был во сне."); break;
	}

	N("Моя игра получила интернет-известность! Хороший кусок моего портфолио.");
	N("Несколько месяцев спустя я получил стажировку в Electronic Arts в районе залива. Далеко от моей семьи в Канаде.");


	Choose({
		"Фуу, Electronic Arts...?": function(message){
			$.outro_convo_truth = 3;
			p(message);

			N("Да, я знаю, я знаю.");
			N("Теперь я раскаиваюсь в своих грехах, делая артистичные инди-игры, подобные этой.");
			p("Покайся сильнее, черт возьми.");
			Tell_Me_A_Truth_2();
		},
		"В заливе Сан-Франциско дружелюбны к ЛГБТ.": function(message){
			$.outro_convo_truth = 2;
			p(message);

			N("Вот почему они называют это гей-районом!");
			p("Эм.. его так никто не называет.");
			Tell_Me_A_Truth_2();
		},
		"О, я люблю EA! Они создали Симс, верно?": function(message){
			$.outro_convo_truth = 1;
			p(message);

			N("Ага! Но я над этим не работал. Наша команда делала веб-версию игры--");
			N("[НЕ МОГУ СКАЗАТЬ]");
			p("Эм.");
			Tell_Me_A_Truth_2();
		}
	});

}
function Tell_Me_A_Truth_2(){
	
	N("После EA я начал заниматься инди.");
	N("Но оставался на связи с друзьями в EA и остался в районе залива.");

	N("Мои технические навыки выросли.");
	N("Мои социальные навыки выросли.");
	N("И вот... я наконец начинаю выяснять свою личность.");

	switch($.outro_convo_truth){
		case 1: p("Ну, я жду 'Не могу сказать: The Game'."); break;
		case 2: p("А если серьезно, никто не называет это гей-районом."); break;
		case 3: p("Но серьезно, фу, Electronic Arts."); break;
	}

	Closure_Story();

}





function Tell_Me_A_Half_Truth(message){
	$.told_story_half_truth = true;
	$.order_of_stories.push("half-truth");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Как пожелаешь.");
	Is_Last_Story();

	N("Клэр, по иронии судьбы, тоже была бисексуалкой.");
	N("Мы поговорили об этом во время учебной сессии по предмету "+$.studying_subject+" ");

	p("Какой поворот!");

	N("Клэр не была уверена в своей сексуальной ориентации, как и я.");
	N("Мы оба были несколько неопытны. Клэр была только с женщинами, а я только с Джеком.");

	// CLAIRE AND I HELPED EACH OTHER EXPLORE OURSELVES, LESS GUILT, MORE EXPERIENCE.
	// Weave in -- studying what

	Choose({
		"Зеркальная версия тебя, но обратная...": function(message){
			$.outro_convo_half_truth = 1;
			p(message);
			N("Ну, все зеркальные изображения перевернуты.");
			p("Ты знаешь, что я имею в виду.");
			N("Но да, мы с Клэр поделились друг с другом своим опытом.");
			Tell_Me_A_Half_Truth_2();
		},
		"Значит, вы учили друг друга другой стороне?": function(message){
			$.outro_convo_half_truth = 3;
			p(message);
			Tell_Me_A_Half_Truth_2();
		},
		"И в конечном итоге замутили вместе секс?": function(message){
			$.outro_convo_half_truth = 2;
			p(message);
			N("Нет. Она для меня как сестра. Сестра, с которой у меня не было секса.");
			p("Тебе... не нужно было это уточнять.");
			N("Но да, мы с Клэр поделились друг с другом своим опытом.");
			Tell_Me_A_Half_Truth_2();
		}
	});

}
function Tell_Me_A_Half_Truth_2(){
	
	N("И обменялись советами!");

	if($.changing_schools || !$.father_oblivious){
		N("В конце концов, я перешёл в её школу.");
	}

	N("Мы были лучшими друзьями и до сих пор дружим!");
    N("Мы оба переехали в США, подальше от наших ненавистных родителей.");
	N("Вместе мы помогли друг другу преодолеть нашу неуверенность и выяснить, кем мы были...");
	N("Гордые бисексуальные шлюшки.");

	p("Какая трогательная история. Наверное.");
	
	N("И конечно, мы ведомые друг для друга.");

	p(". . .");

	Closure_Story();

}





function Finale_1(){
	
	N("И это последняя из пост-камингаутовых историй!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);
	
	Show("cup",null);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");

	Wait(1000);
	Show("nicky","coffee_nicky_still_2");

	//////////////////////////

	N("Уважаемый игрок, я не мог не заметить...");
	if($.order_of_stories[0]=="truth"){
		N("Сначала ты пошёл прямо к Истине.");
	}else if($.order_of_stories[2]=="truth"){
		N("Ты оставил Правду напоследок.");
	}else if($.order_of_stories[0]=="lie"){
		N("Сначала ты хотел услышать Ложь.");
	}else{
		N("Ты оставил Ложь напоследок.");
	}
	N("Что это говорит о тебе?...");
	p(". . .");

	p("Ты знаешь... обычно, когда игра даёт тебе несколько концовок, она не выдаёт их ВСЕ СРАЗУ.");
	N("Ха! Ты думал, что это были КОНЦОВКИ?");

	Choose({
		"Дай угадаю... Это только начало?": function(message){
			p(message);
			N("Это только нач---. Окей, да.");
			Finale_2();
		},
		"Ну да. Эта игра окончена, верно?": function(message){
			p(message);
			N("Правда... но история, то есть моя история, моя жизнь, продолжается.");
			Finale_2();
		},
		"О Боже, как ДОЛГО длится эта чёртова игра.": function(message){
			p(message);
			N("Не беспокойся. Твой следующий выбор — самый последний, клянусь.");
			Finale_2();
		}
	});

}

function Finale_2(){

	Show("nicky","coffee_nicky_packup_1");

	N(". . .");
	N("Знаешь, если бы я мог вернуться и пережить все другие возможные варианты...");
	N("...что в некотором смысле я и сделал, написав эту игру...");
	N("...я бы ничего не изменил.");

	Show("nicky","coffee_nicky_packup_2");

	// SERIOUSNESS.
	PlaySound("sfx","laptop_shut");
	PlaySound("bg","bedroom_1",{loop:-1, volume:0.4});

	p("? ? ?");

	if($.punched){
		N("Вмешательство в мои сообщения. Вынужденная смена школы. Удар в лицо.");
	}else if($.father_oblivious==false){
		N("Вмешательство в мои сообщения. Вынужденная смена школы. Все эти словесные оскорбления.");
	}else if($.changing_schools){
		N("Вмешательство в мои сообщения. Вынужденная смена школы. Попытка 'гей-реабилитации' с Клэр.");
	}else{
		N("Вмешательство в мои сообщения. Лишение свободного времени. Попытка 'гей-реабилитации' с Клэр.");
	}

	N("В каком-то смысле стокгольмский синдром... Я благодарен за всё это.");

	Choose({
		"что.": Finale_3,
		"чтооо.": Finale_3,
		"чтоооооооооооооооо.": Finale_3
	});

}

function Finale_3(message){

	p(message);

	PlaySound("sfx","laptop_pack");
	Show("nicky","coffee_nicky_packup_3");

	N("Да, действительно!");
	N("Я не был бы так мотивирован, чтобы подделать свою собственную жизнь... если бы моя предыдущая жизнь не была полным дерьмом.");

	PlaySound("sfx","laptop_pack_2");
	Show("nicky","coffee_nicky_packup_4");

	N("Позже в 2010 году Дэн Сэвидж запустил кампанию It Gets Better.");
	N("Мои три истории... Ложь, Истина, Полуправда... они все, по крайней мере, верны в одном.");
	N("Всё становится лучше.");

	p(". . .");

	N("И...");
	N("В конце...");
	N("Этой длинной, глупой, болезненной игры...");
	N("Где я играл против людей, которые должны были быть на моей стороне...");

	p(". . .");

	N("Я победил.");
	N(". . .");
	N("Я победил.");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	// CUTSCENE -- MY NEW BOYFRIEND
	Wait(1000);
	
	PlaySound("sfx2","laptop_pack");
	Show("nicky","coffee_nicky_date_1");
	Wait(1000);
	
	PlaySound("sfx","step_2");
	Show("nicky","coffee_nicky_date_2");
	Wait(1000);
	
	PlaySound("sfx","step_1");
	Show("nicky","coffee_nicky_date_3");
	Wait(1000);
	
	PlaySound("sfx","step_2",{volume:0.75});
	Show("nicky","coffee_nicky_date_4");
	Wait(1000);

	PlaySound("sfx","step_1",{volume:0.5});
	Show("nicky",null);
	Wait(1000);

	PlaySound("sfx","step_2",{volume:0.25});
	Choose({
		"ПЕРЕИГРАТЬ?": Finale_4
	});

}
function Finale_4(message){
	
	p(message);
	N("Настоящую жизнь нельзя переиграть.");

	Wait(800);
	queue(function(){
		document.getElementById("game").setAttribute("screen","blank");
	},1000);
	//queue(ClearScene,0); // coz the sound's cool!
	queue(function(){
        window.END_THE_GAME();
	},0);


}


