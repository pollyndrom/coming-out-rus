function Start_Dinner_1(){

	/////// SET UP SCENE ////////

	Show("background","dinner");
	Show("clock","clock_ticking",{x:155,y:294});
	Show("clock_time","clock_1855",{x:155+5,y:294+37});
	Show("nicky","dinner_nicky_sit",{x:0,y:300});
	Show("dad",null,{x:0,y:300});
	Show("mom",null,{x:0,y:300});
	Show("table","dinner_table",{x:0,y:420});

	PlaySound("clock","dinner_ticking",{loop:-1});

	////////////////////////////

	Wait(2500);
	n("Где все?...");
	n(". . .");

	Choose({
		"Маааам?": Waiting_1,
		"Пааааап?": Waiting_1,
		"Отзовитесь, кто-нибудь?": Waiting_1
	});

}

function Waiting_1(message){
	
	$.what_you_called_out = message;
	n(message);

	n(". . .");

	Choose({
		"[начать есть]": function(message){
			$.waiting_action = "eat";
			Waiting_2(message);
		},
		"[подождать ещё немного]": function(message){
			$.waiting_action = "wait";
			Waiting_2(message);
		},
		"[играть с едой]": function(message){
			$.waiting_action = "play";
			Waiting_2(message);
		}
	});

}

function Waiting_2(message){
	
	n(message);
	n(". . .");

	PlaySound("clock","dinner_meowing",{loop:-1});

	Show("clock","clock_meowing");
	Show("clock_time","clock_1900");
	Wait(1000);

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Прекратите, неблагозвучные часы!": function(message){
			n(message);

			Show("mom","mom_stand");
			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});

			if($.im_a_poet){
				m("Ты учил поэзию у друга?");
			}else{
				m("Поэтично.");
			}

			Show("nicky","dinner_nicky_sit");
			n("О, привет, мам.");
			
			Waiting_End();
		},
		"Угх, и откуда у нас эта вещь?": function(message){
			n(message);

			Show("mom","mom_stand");
			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});

			m("Твой дедушка отдал их нам.");

			Show("nicky","dinner_nicky_sit");
			n("О! Привет, мам.");
			
			Waiting_End();
		},
		"Мяу! Мяу! Мяу! Мяу!": function(message){
			
			n("Мяу.");
			n("Мяу!");

			Show("nicky","dinner_nicky_outrage");
			n("МЯУ!");

			Show("mom","mom_stand");

			m("Ник, что ты вытворяешь?!...");

			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});
			Show("nicky","dinner_nicky_sit");

			n("МЯУкххх, не увидел тебя. Кхм. Привет мама.");

			Waiting_End();
		}
	});

}

function Waiting_End(){
	Start_Dinner_2();
}
