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
var $result = $('.result');
var text = ['Yey! buy a guitar now.', 'Congrats! You\'re the next Cobain.', 'Join a band now!'];
var $input = $('<h1></h1>');

function set() {
    var imgs = ['images/A.png', 'images/B.png', 'images/C.png', 'images/D.png', 'images/E.png', 'images/F.png', 'images/G.png'];
    var keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    var $img = $('.img');
    var num = Math.round(Math.random() * 6);
    var key = keys[num];
    var src = imgs[num];
        $img.attr('data-key', key);
        $img.attr('src', src);
        var choice = Math.ceil(Math.random()) * Math.floor(Math.random() * 4);
    choices[choice].setAttribute('data-let', key);
    choices[choice].textContent = key;
}  
function random() {
    var num = {
        one: Math.round(Math.random() * 6),
        two: Math.round(Math.random() * 6),
        tri: Math.round(Math.random() * 6),
        for: Math.round(Math.random() * 6),
        key: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    };
    choices[0].setAttribute('data-let', num.key[num.one]);
    choices[1].setAttribute('data-let', num.key[num.two]);
    choices[2].setAttribute('data-let', num.key[num.tri]);
    choices[3].setAttribute('data-let', num.key[num.for]);

    choices[0].textContent = num.key[num.one];
    choices[1].textContent = num.key[num.two];
    choices[2].textContent = num.key[num.tri];
    choices[3].textContent = num.key[num.for];
    }
$btn.on('click', function() {
    $('.start').css({
        opacity: 0
    });
    $game.toggle();
    $game.toggleClass('show');   
    tried++;
    random();
    set(); 
});
choices.on('click', tog);

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
            $com = $('<h2 class="pfft">Oops! Try again</h2>');
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
$cont.on('click', function() {   
    if (tried <=7 && tried !=7) {
    $cont.fadeOut('fast');
    $com.fadeOut('fast'); 
    choices.removeClass('wrong');
    choices.removeClass('correct');
    $game.removeClass('wrong');
    choices.on('click', tog);
    random();
    set();
    tried++;
    } else {
        var num = Math.round(Math.random() * 2);
        $input.append(text[num]);
        $game.css({
            opacity: 0,
            transitionDuration: '80ms',
            zIndex: 0
        }); 
        $result.toggleClass('show').prepend($input);
        $correct.append(' '+check);
        $wrong.append(' '+ ex);
        $score.append(points);
        console.log(num)
    }
});
$('.reset').on('click', function() {
    document.location.reload();
});

