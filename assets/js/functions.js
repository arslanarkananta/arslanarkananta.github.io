var imageDescriptions = new Map([
    ['Super Tic-Tac-Toe.gif', 'Super-TicTacToe is a fun version of Ultimate TicTacToe with a tricky twist. You can play against a smart computer opponent and test your skills. It was made using a library called raylib in C, and it’s super fun to play!'],
    ['Digit Detect ANN.gif', 'DigitDetectANN is a computer program that learns to read numbers. It uses an artificial neural networks and the MNIST dataset. Made with OpenCV in C++, it’s my first try at making something like this.'],
    ['Tetromania.gif', 'Tetromania is my version of Tetris, an arcade game from 1984. I made it using plain HTML, CSS, and JavaScript. It looks simple, but it’s super fun and tricky. Perfect for anyone who loves puzzles!'],
    ['Bad Apple CLI.gif', 'Bad Apple CLI plays a famous video right inside the Windows command prompt, using pictures made from letters and symbols. It also has music! I used OpenCV to load the video and SFML for sound.'],
    ['Invaders.gif', 'Invaders is a game like the old-school Space Invaders from 1978. You shoot at aliens and protect your base! I made it with plain HTML, CSS, and JavaScript. It’s a fun way to relive the action of the original game in your browser.'],
]);

var imageLinks = new Map([
    ['Super Tic-Tac-Toe.gif', 'https://github.com/arslanarkananta/Super-TicTacToe'],
    ['Digit Detect ANN.gif', 'https://github.com/arslanarkananta/DigitDetectANN'],
    ['Tetromania.gif', 'https://github.com/arslanarkananta/Tetromania'],
    ['Bad Apple CLI.gif', 'https://github.com/arslanarkananta/BadAppleCLI'],
    ['Invaders.gif', 'https://github.com/arslanarkananta/Invaders'],
]);

$(document).ready(function() {
    function updateImageName() {
        var currentImageSrc = $('#three-slide .slider .current img').attr('src');
        var currentImageName = currentImageSrc ? currentImageSrc.split('/').pop() : '';
        $('#current-image-name').text(currentImageName.replace('.gif', ''));
        $('#current-image-description').text(imageDescriptions.get(currentImageName) || 'No description available.');
		$('#current-image-link').attr('href', imageLinks.get(currentImageName) || '#');
    }

    function initNavToggle() {
        $(".nav-toggle").click(function() {
            $(".nav").toggleClass("open");
        });
    }

    function initSmoothScroll() {
        $('a[href^="#"]').click(function(e) {
            var target = $($(this).attr("href"));
            
            if (target.length) {
                e.preventDefault();
                $("html, body").animate({
                    scrollTop: target.offset().top - 15
                }, 300);
                $(".nav").toggleClass("open");
            }
        });
    }
    
    function initThreeSlideCarousel() {
        $("#three-slide .prev, #three-slide .next").click(function() {
            var $this = $(this);
            var $back = $(".slider").find(".back");
            var backIndex = $(".slider").children().index($back);
            var $current = $(".slider").find(".current");
            var currentIndex = $(".slider").children().index($current);
            var $front = $(".slider").find(".front");
            var frontIndex = $(".slider").children().index($front);
            var totalSlides = $(".slider").children().length;

            $(".slider").addClass("swap");

            setTimeout(function() {
                if ($this.hasClass("next")) {
                    if (frontIndex < totalSlides - 1 && 
                        currentIndex < totalSlides - 1 && 
                        backIndex < totalSlides - 1) {
                        $(".back").removeClass("back").next().addClass("back");
                        $(".current").removeClass("current").next().addClass("current");
                        $(".front").removeClass("front").next().addClass("front");
                    } else if (frontIndex === totalSlides - 1) {
                        $(".back").removeClass("back").next().addClass("back");
                        $(".current").removeClass("current").next().addClass("current");
                        $(".slider li").removeClass("front").first().addClass("front");
                    } else if (currentIndex === totalSlides - 1) {
                        $(".back").removeClass("back").next().addClass("back");
                        $(".slider li").removeClass("current").first().addClass("current");
                        $(".front").removeClass("front").next().addClass("front");
                    } else {
                        $(".slider li").removeClass("back").first().addClass("back");
                        $(".current").removeClass("current").next().addClass("current");
                        $(".front").removeClass("front").next().addClass("front");
                    }
                } else {
                    if (backIndex !== 0 && currentIndex !== 0 && frontIndex !== 0) {
                        $(".back").removeClass("back").prev().addClass("back");
                        $(".current").removeClass("current").prev().addClass("current");
                        $(".front").removeClass("front").prev().addClass("front");
                    } else if (backIndex === 0) {
                        $(".slider li").removeClass("back").last().addClass("back");
                        $(".current").removeClass("current").prev().addClass("current");
                        $(".front").removeClass("front").prev().addClass("front");
                    } else if (currentIndex === 0) {
                        $(".back").removeClass("back").prev().addClass("back");
                        $(".slider li").removeClass("current").last().addClass("current");
                        $(".front").removeClass("front").prev().addClass("front");
                    } else {
                        $(".back").removeClass("back").prev().addClass("back");
                        $(".current").removeClass("current").prev().addClass("current");
                        $(".slider li").removeClass("front").last().addClass("front");
                    }
                }

                updateImageName();

                $(".slider").removeClass("swap");
            }, 300);
        });

        updateImageName();
    }

    initNavToggle();
    initSmoothScroll();
    initThreeSlideCarousel();
});

function sendEmail() {
    Email.send({
        SecureToken : "4e120fb7-616f-4e80-b482-f60c1350a2c7",
        To : 'tankersttank@gmail.com',
        From : "arkananta.arslan@gmail.com",
        Subject: "Email from " + document.getElementById("email").value + " received on Portofolio",
        Body: "Name: " + document.getElementById("name").value +
            "<br> Email: " + document.getElementById("email").value +
            "<br> Message: " + document.getElementById("message").value
    }).then(
      alert("Thank you for reaching out!")
    );
}