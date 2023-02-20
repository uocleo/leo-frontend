// run below code if scroll to the element counter-stats

$(window).scroll(function () {
	var hT = $('#counter-stats').offset().top,
		hH = $('#counter-stats').outerHeight(),
		wH = $(window).height(),
		wS = $(this).scrollTop();
	if (wS > (hT + hH - wH)) {
		// wait for 5 seconds
		// then run the code
		setTimeout(function () {
			// do something after 5 seconds
			$('.counting').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');

				$({countNum: $this.text()}).animate({
						countNum: countTo
					},

					{

						duration: 3000,
						easing: 'linear',
						step: function () {
							$this.text(Math.floor(this.countNum));
						},
						complete: function () {
							$this.text(this.countNum);
							//alert('finished');
						}

					});


			});
		} , 1000);

	}

});

// if scrolled more than 100px from the top then add class "bg-dark" to the header remove "bg-dark" when not
$(window).scroll(function () {
	if ($(this).scrollTop() > 920) {
		$('header').addClass('bg-dark');
		$('header').removeClass('bg-light');
		document.getElementById("logo").src = "./public/logo-colour.png";
	} else {
		$('header').removeClass('bg-dark');
		$('header').addClass('bg-light');
		document.getElementById("logo").src = "./public/logo-colour-new.png";
	}
});


$(".hover").mouseleave(
	function () {
		$(this).removeClass("hover");
	}
);





$(document).ready(function() {
	$(".loader").delay(5000).fadeOut("slow");
	$(".loader-wrapper").delay(5000).fadeOut("slow");
});



setInterval(function() {
	var currentSlide = document.querySelector('.slider__nav:checked');
	var nextSlide = currentSlide.nextElementSibling || document.querySelector('.slider__nav');
	nextSlide.checked = true;
}, 5000);


document.addEventListener('DOMContentLoaded', () => {
	const goTopBtn = document.querySelector('.go_top');
	goTopBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
});
