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
		}, 1000);

	}

});

// if scrolled more than 100vh from the top then add class "bg-dark" to the header remove "bg-dark" when not
$(window).scroll(function () {
	if ($(this).scrollTop() > 500) {
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


$(document).ready(function () {
	$(".loader").delay(10).fadeOut("slow");
	$(".loader-wrapper").delay(10).fadeOut("slow");
});


setInterval(function () {
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


$(document).ready(function () {
	const testimonials = [
		{
			name: "Eva Sawyer",
			job: "CEO, Fashworks",
			image: "https://i.postimg.cc/mgp4pfz5/profile-image-1.png",
			testimonial:
				"Neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur",
		},
		{
			name: "Katey Topaz",
			job: "Developer, TechCrew",
			image: "https://i.postimg.cc/PfSSwtB9/profile-image-2.png",
			testimonial:
				"Elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet nulla",
		},
		{
			name: "Jae Robin",
			job: "UI Designer, Affinity Agency",
			image: "https://i.postimg.cc/W4mnbjG9/profile-image-3.png",
			testimonial:
				"Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis",
		},
		{
			name: "Nicola Blakely",
			job: "CEO,Zeal Wheels",
			image: "https://i.postimg.cc/xdLsJL23/profile-image-4.png",
			testimonial:
				"Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
		},
	];

//Current Slide
	let i = 0;
//Total Slides
	let j = testimonials.length;

	let testimonialContainer = document.getElementById("testimonial-container");
	let nextBtn = document.getElementById("next");
	let prevBtn = document.getElementById("prev");

	nextBtn.addEventListener("click", () => {
		i = (j + i + 1) % j;
		displayTestimonial();
	});
	prevBtn.addEventListener("click", () => {
		i = (j + i - 1) % j;
		displayTestimonial();
	});

	let displayTestimonial = () => {
		testimonialContainer.innerHTML = `
    <p>${testimonials[i].testimonial}</p>
    <img src=${testimonials[i].image}>
    <h3>${testimonials[i].name}</h3>
    <h6>${testimonials[i].job}</h6>
  `;
	};

	// add set interval here to change the testimonial every 5 seconds
	setInterval(function () {
		i = (j + i + 1) % j;
		displayTestimonial();
	}, 5000);

	window.onload = displayTestimonial;
});
