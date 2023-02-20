// run below code if scroll to the element counter-stats

$(window).scroll(function () {
	var hT = $('#counter-stats').offset().top,
		hH = $('#counter-stats').outerHeight(),
		wH = $(window).height(),
		wS = $(this).scrollTop();
	if (wS > (hT + hH - wH)) {
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
	}

});

// if scrolled more than 100px from the top then add class "bg-dark" to the header remove "bg-dark" when not
$(window).scroll(function () {



	if ($(this).scrollTop() > 100) {
		$('header').addClass('bg-dark');
		$('header').removeClass('bg-light');
		document.getElementById("logo").src = "./public/logo-colour.png";
	} else {
		$('header').removeClass('bg-dark');
		$('header').addClass('bg-light');
		document.getElementById("logo").src = "./public/logo-colour-new.png";
	}
});
