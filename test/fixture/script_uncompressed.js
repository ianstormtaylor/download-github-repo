var page = 1,
	shot = ["NICE SHOT!", "TWO POINTS!", "SWOOSH!", "NOTHING BUT NET!", "HE SHOOTS... HE SCORES!" ],
	great = ["THREE POINTER!", "YOU MAKE IT LOOK EASY.", "BOOYAH!", "KOBE!"],
	miss = ["AIR BALL!", "BRICK!", "BASKET'S THAT WAY!", "WHAT WERE YOU THINKING?", "NOT EVEN CLOSE!"],
	bad = ["MY GRANDMA COULDA DONE BETTER.", "WHAT  GAME WERE YOU PLAYING?", "IS THAT THE BEST YOU GOT?"],
	good = ["YOU KILLED IT OUT THERE!", "WE GOT AN ALL-STAR HERE!", "THAT WAS SOME PRO SHIT!"];

$(function(){
	
	if (navigator.userAgent.indexOf("Firefox")!=-1) { $('body').addClass('no ch'); }
	if (navigator.userAgent.indexOf("MSIE")!=-1) { $('body').addClass('no ie ch'); }
	if (navigator.userAgent.indexOf("Chrome")!=-1) { $('body').addClass('ch'); }

	$('.y').live('click',function(){
		flip($(this))
	});
	$('#a .d').click(function(){
		$('#a').fadeOut();
		t("$('#b').fadeIn(); $('#x').fadeIn()", 1000);
		
		t("s('READY?')", 2000);
		t("s('SET...')", 3000);
		t(function(){	
			s('JUMP BALL!')
			i = setInterval(tikTok, 1000);
			create();
		}, 4000);
	})
});

function t(a,b){setTimeout(a,b)}
function p(a,b){return parseInt(a,b)}

function s(l) {

	$('#t .t').addClass('out').removeClass('in');
	
	t(function(){
	
		if (typeof l == "string") {
			$('#t .t').text(l);
		} else { 
			$('#t .t').text(l[Math.floor(Math.random()*l.length)]);
		}
		$('#t .t').addClass('in').removeClass('out');
	}, 250);
}

function create() {
		
	$.ajax({
	data: { page: page, per_page: 6 },
	dataType: 'jsonp',
	success: function(shotList) {
					
		$('.x').addClass('h');
    	
    	// Put the return data in an array.
    	var shots = [];
    	$.each(shotList.shots, function (i, shot) {
    		shots[i*2] = shot;
    		shots[i*2+1] = shot;
    	});
    	
    	// Randomize the array.
    	shots.sort(function() { 
    		return 0.5 - Math.random() 
    	});
    	
    	// Generate the HTML.	    	
        $.each(shots, function (i) {
        	$shot = $('#o').clone();
        	$shot.attr('id', '');
        	$shot.find('img').attr('src', shots[i].image_teaser_url);
        	$('.x').append($shot);
        });
		
		t("$('.x').removeClass('h')", 1);
		page++;
					
	},
	type: 'GET',
	url: 'http://api.dribbble.com/shots/popular'
	});
}

function flip($c) { 
		
	// Figure out what to do.
	switch($('.y.f').length) {
	case 1:
		t("match()", 600);
	case 0:
		$c.addClass('f'); $c.removeClass('b');
		break;
	default:
		t("reset()", 600);
		break;
	}
}

function match() {
	
	// Matching cards?
	if($('.y.f .f img').get(0).src == $('.y.f .f img').get(1).src){
				
		// Great shot!
		if ($('.y.f.v').size() == 0) {
			score(3);
			s(great);
			
		// Normal shot.
		} else {
			score(2);
			s(shot);
		}
		
		// Set 'em seen.
		$('.y.f').addClass('v');
		// Set 'em matched.
		$('.y.f').addClass('m');
		// Hide 'em.
		$('.y.m').removeClass('f').removeClass('b');
		// Reset the last stat.
		
		// Out of cards? Gimme more.
		if ($('.y.b').not('#o').size() == 0){
			
			t("erase();", 500);
			t("create();", 600);
		}
	} else { 
		
		// Clear and reset the last count.
		$('.y.f').addClass('v');
		
		// Better luck next time... flip 'em!
		s(miss);
		reset();
	}
}

function score(a) {
	
	// Grab the score, then update it.
	var s = p($('#s .t').text(),10) + a;
	(s < 10) ? s = '0' + s.toString() : null;
	(p(s, 10) < 100) ? s = '0' + s.toString() : null;
	$('#s .s .t').text(s);
}

function tikTok() {
	
	// Grab clock text.
	var $c = $('#c .s .t');
	var sec = p($c.text().slice(3),10),
		min = p($c.text().slice(1,3),10);
	
	// Clock done? What to do...
	if (sec == 0 && min == 0) { 
		over();
	} else if (sec == 0) { sec = 59; min--; }
	else { sec--; }
	
	(sec < 10) ? sec = '0' + sec : null;
	$c.text('0' + min + ':' + sec);
	
}

function reset() { 
	
	// Flip 'em all over again.
	$('.y').removeClass('f');
	$('.y').not('.m').addClass('b');
}

function erase() { 
	
	// Get rid of the cards.
	$('.y').not('#o').remove();
}

function clear() {
	
	// Let the cards fall then erase 'em after that's done.
	$('.y').not('#o').each(function(){
		$(this).get(0).style.webkitTransitionDelay = Math.random()*.5 + 's';
		$(this).get(0).style.webkitTransform = 'translateY('+window.innerHeight+'px) rotateZ('+Math.round((Math.random()-.5)*45)+'deg)';
		t("erase();", 1000);
	});
}

function over() {
	
	clearInterval(i);
	clear(); 
	
	// What to say... what to say...
	var sc = p($('#s .t').text(),10);
	if (sc > 80) { t("s(good)", 1000); }
	else { t("s(bad)", 1000); }

		
	$('#z a:last-child').attr('href',"http://twitter.com/home?status=Just scored "+sc+"pts on Matchuppps, @stormink's 10K Apart entry. Dare you to beat me! " + window.location.href);
	
	// Stop everything and get rid of those damn cards.
	
	$('#x').fadeOut();
	t("$('#z').fadeIn()", 1000);
}
