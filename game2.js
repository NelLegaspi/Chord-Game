var $btn = $('#btn');
var $game = $('.game');
    $game.hide();
var $cont = $('#cont');
    $cont.hide();
var choices = $('.btn-g');
var tried = 0;
var $com;  
var $score = $('.score');
var $correct = $('.corr');
var $wrong = $('.rong');
var ex = 0;
var check = 0;
var points;
var $input = $('<h1></h1>');
var key = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let ranNum = a => Math.round(Math.random() * a);
function set() {
    var imgs = ['images/A.png', 'images/B.png', 'images/C.png', 'images/D.png', 'images/E.png', 'images/F.png', 'images/G.png'];
    var $img = $('.img');
    var num = ranNum(6);
        $img.attr('data-key', key[num]).attr('src', imgs[num]);
        var choice = ranNum(3);
        choices[choice].setAttribute('data-let', key[num]);
        choices[choice].textContent = key[num];
}  
function random(a, b, c, d) {
    var num = [ranNum(6), ranNum(6), ranNum(6), ranNum(6)];
    for (var i = 0; i < 4; i++) {
        arguments[i].setAttribute('data-let', key[num[i]]);
        arguments[i].textContent = key[num[i]];
    }
}

function tog() {
    var $this = $(this);
    var key = $('.img').attr('data-key');
    var chord = $this.attr('data-let');
        if (key == chord) {
            $cont.fadeIn();
            $com = $('<h2 class="yey">Correct! Keep it up.</h2>');
            $cont.before($com);
            $com.css('color', '#006622');
            $this.toggleClass('correct');
            choices.off();
            check++;
        } else { 
            $this.toggleClass('wrong');
            $com = $('<h2 class="pfft">Oops! Correct answer is ' + key + '.</h2>');
            $cont.before($com);
            $com.css({
                color: '#cc2900',
                letterSpacing: '.1em'
                });
            $game.toggleClass('wrong');
                $cont.fadeIn();
                choices.off();
            ex++;
        }
    points = ' ' + check +' / 7';
}
$btn.on('click', function() {
    $('.start').css({
        opacity: 0,
        zIndex: 0
    });
    $game.css({
        zIndex: 5
    });
    $game.toggle();
    $game.toggleClass('show');   
    tried++;
    random(choices[0], choices[1], choices[2], choices[3]);
    set(); 
});
$cont.on('click', function() {   
    var $result = $('.result');
    if (tried <=7 && tried !=7) {
    $cont.fadeOut('fast');
    $com.fadeOut('fast'); 
    choices.removeClass('wrong');
    choices.removeClass('correct');
    $game.removeClass('wrong');
    choices.on('click', tog);
    random(choices[0], choices[1], choices[2], choices[3]);
    set();
    tried++;
    } else {
        var text = ['Yey! buy a guitar now.', 'Congrats! You\'re the next Cobain.', 'Join a band now!'];
        var num = ranNum(2);
        $input.append(text[num]);
        $game.css({
            display: 'none',
            zIndex: 0
        }); 
        $result.toggleClass('show').prepend($input);
        $correct.append(' '+check);
        $wrong.append(' '+ ex);
        $score.append(points);
    }
});
$('.reset').on('click', function() {
    document.location.reload();
});
choices.on('click', tog);
