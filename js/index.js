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
	$(".loader").delay(5000).fadeOut("slow");
	$(".loader-wrapper").delay(5000).fadeOut("slow");
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
			name: "Leo Haritha Vimukthi",
			job: "President",
			image: "./public/images/exco/leo-haritha-vimukthi.jpg",
			testimonial:
				"In 2020, the writer joined the Leo movement as a prospect of the Leo Club of the University of Colombo. They took on leadership roles in various projects and gained valuable experience as a young leader. They are now the President of the Leo Club of the University of Colombo and believe Leoism is a great platform for undergraduates to develop leadership skills and make an impact on society.",
		},
		{
			name: "Leo Methma Athauda",
			job: "Secretary",
			image: "./public/images/exco/leo-methma-athauda.jpg",
			testimonial:
				"The author joined the Leo movement in 2020 and has since participated in various projects and activities of the Leo Club of University of Colombo. They were appointed Director of Fundraising and Management in Leo Regime in 2021-22 and appointed Club Secretary for the academic year 2022-23. The author believes the Leo movement is a great opportunity for undergraduates to develop leadership qualities and become young leaders for the environment and society.",
		},
		{
			name: "Leo Thilina Bandara",
			job: "Treasurer",
			image: "./public/images/exco/leo-thilina-bandara.jpg",
			testimonial:
				"The writer has been a part of the Leo community for over two years, starting as a prospect and becoming the Club Treasurer for the leostic years 2022-2023. They gained valuable experience in leadership, communication, problem-solving, teamwork, and dealing with different minds while working on projects. They invite others to join and gain similar opportunities and make good memories while serving the community.",
		},
		{
			name: "Leo Himesh Tharuka",
			job: "1st Vice President",
			image: "./public/images/exco/leo-himesh-tharuka.jpg",
			testimonial:
				"Experiences determine success or failure. As a UOC Leo, the author gained invaluable experiences and developed social and leadership skills through various projects. Recognized for their hard work, they became 1st vice president for the upcoming year and recommend UOC Leo for future leaders.",
		},
		{
			name: "Leo Vidura Kalu Arachchi",
			job: "2nd Vice President",
			image: "./public/images/exco/leo-vidura-kalu-arachchi.jpg",
			testimonial:
				"LEO is about leadership, experience, and opportunity. Engaging in community service helps improve our quality of life and develops us as individuals. Join the Leo Club to make valuable contributions to society while also making connections and friends.",
		},
		{
			name: "Leo Ayeshika Nawanjani",
			job: "Assistant Secretary",
			image: "./public/images/exco/leo-ayeshika-nawanjani.jpg",
			testimonial:
				"Joining the Leo Club in 2020, the author was inspired by Nimesh Tivanka Comrade's interest in Leo projects and worked as a senior editor on the editorial board. The author's desire to make college life memorable and gain experiences led to serving as a Leo member, contributing to communication abilities. Joining offers the opportunity to discover new opportunities, grow as a person, and participate in internationally recognized projects. Advantages include developing presentation and personality skills, positive attitudes, and group work abilities.",
		},
		{
			name: "Leo Udeshika Ganegoda",
			job: "Assistant Secretary",
			image: "./public/images/exco/leo-udeshika-ganegoda.jpg",
			testimonial:
				"The writer joined the Leo Club of University of Colombo to become their best self and serve the community through organized projects. They held various project positions and won awards for their hard work and commitment. They recommend the Leo Club as a great place to improve skills and create university memories.",
		},
		{
			name: "Leo Janith Kodithuwakku",
			job: "Assistant Treasurer",
			image: "./public/images/exco/leo-janith-kodithuwakku.jpeg",
			testimonial:
				"Joining the Leo family has given me valuable experiences and shaped me into the person I am now. Leoism is a great platform for youth to become exceptional leaders and gain skills. Being part of the Leo Club of University of Colombo has allowed me to develop interpersonal and leadership skills. Join us in serving society and becoming exceptional leaders.",
		},
		// {
		// 	name: "Leo Shehan De Mel",
		// 	job: "Assistant Treasurer",
		// 	image: "./public/images/exco/leo-shehan-de-mel.jpg",
		// 	testimonial:
		// 		"Joining the Leo club at University of Colombo motivated the speaker to improve leadership skills, build networks and engage in social activities. Being a part of the global Leo family helps develop as an individual and a leader, while also providing the opportunity to give back to the community and be recognized for efforts.",
		// },
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


// Newsletters


$(document).ready(function () {

	// console log the function caller
	console.log(this);

	const newslettersArray = [
		{
			"class": "bg-warning-soft",
			"tag": "Volume 05 Special Issue",
			"name": "Our Essence Volume 05 Special Issue",
			"description": "Check out the Special Issue of Volume 05 of the Official Newsletter of Leo Club of University of Colombo for the Leoistic year 2022/23.✨",
			"url": "https://anyflip.com/mrfst/vdcu/",
			"image": "./public/images/newsletters/Our_Essence_Vol05_SP_Issue.jpg",
			"pdf": "https://anyflip.com/mrfst/vdcu/"
		},
		{
			"class": "bg-warning-soft",
			"tag": "Volume 05 Issue 06",
			"name": "Our Essence Volume 05 Issue 06",
			"description": "We are Leos. We are not only serving ourselves; we all are for others. We all have lives but Leos have bright lives because they have to light up others’ lives too We are experiencing different kinds of experiences in this Leoism journey. We are learning lessons from past experiences and making our future successful.",
			"url": "https://anyflip.com/mrfst/kbpn/",
			"image": "./public/images/newsletters/Our_Essence_Vol05_Issue06.jpg",
			"pdf": "https://anyflip.com/mrfst/kbpn/"
		},
		{

			// TODO: Add volume 5 issue 5
			"class": "bg-warning-soft",
			"tag": "Volume 05 Issue 05",
			"name": "Our Essence Volume 05 Issue 05",
			"description": "Our Essence’ can be shown as a monthly newsletter that brings the essence of the rich and strong thoughts of our social activists of Leo Club of UOC, which consists of a group of young leaders and undergraduates with various talents. This reflects our strength; our wealth as a social organisation. ",
			"url": "https://anyflip.com/mrfst/zodm/",
			"image": "./public/images/newsletters/Our_Essence_Vol05_Issue05.jpg",
			"pdf": "https://anyflip.com/mrfst/zodm/"
		},
		{
			"class": "bg-warning-soft",
			"tag": "Volume 05 Issue 04",
			"name": "Our Essence Volume 05 Issue 04",
			"description": "Our Essence’ can be shown as a monthly newsletter that brings the essence of the rich and strong thoughts of our social activists of Leo Club of UOC, which consists of a group of young leaders and undergraduates with various talents. This reflects our strength; our wealth as a social organisation. ",
			"url": "https://anyflip.com/mrfst/zodm/",
			"image": "./public/images/newsletters/Our_Essence_Vol05_Issue04.jpg",
			"pdf": "https://anyflip.com/mrfst/zodm/"
		},
		{
			"class": "bg-warning-soft",
			"tag": "Volume 05 Issue 03",
			"name": "Our Essence Volume 05 Issue 03",
			"description": "Far more significant is the fact that we are always ready to extend our helping hand in order to fulfil our mission throughout your future endeavours.",
			"url": "https://anyflip.com/mrfst/zodm/",
			"image": "./public/images/newsletters/Our_Essence_Vol05_Issue03.jpg",
			"pdf": "https://anyflip.com/mrfst/zodm/"
		},
		{
			"class": "bg-warning-soft",
			"tag": "Volume 05 Issue 02",
			"name": "Our Essence Volume 05 Issue 02",
			"description": "A surprising audience showed up for the meeting as a consequence of the effective PR campaign that was run, which stoked excitement in the great event.",
			"url": "https://anyflip.com/mrfst/ycup/",
			"image": "./public/images/newsletters/Our_Essence_Vol05_Issue02.jpg",
			"pdf": "https://anyflip.com/mrfst/ycup/"
		},
		{
			"class": "bg-warning-soft",
			"tag": "Volume 05 Issue 01",
			"name": "Our Essence Volume 05 Issue 01",
			"description": "With excitement, we are declaring the beginning of OUR ESSENCE - VOLUME 5 for the Leoistic year 2022/23.",
			"url": "https://anyflip.com/mrfst/zodm/",
			"image": "./public/images/newsletters/Our_Essence_Vol05_Issue01.jpg",
			"pdf": "https://anyflip.com/mrfst/zodm/"
		},
	]

	console.log(newslettersArray);


	// Get the first four newsletters
	const newsletters = newslettersArray.slice(0, 4);
	console.log(newsletters);

	const newsletterContainer = document.getElementById('newsletter-container');

	let i = 0;

// Loop through the newsletters array
	newsletters.forEach(newsletter => {

		if (i <= 3) {

			// Create card elements
			const card = document.createElement('a');
			const cardBackground = document.createElement('div');
			const cardContent = document.createElement('div');
			const cardCategory = document.createElement('p');
			const cardHeading = document.createElement('h3');

			// Add classes and attributes to elements
			card.classList.add('card');
			card.href = newsletter.url;
			cardBackground.classList.add('card__background');
			cardBackground.style.backgroundImage = `url(${newsletter.image})`;
			cardContent.classList.add('card__content');
			cardCategory.classList.add('card__category');
			cardCategory.textContent = newsletter.tag;
			cardHeading.classList.add('card__heading');
			cardHeading.textContent = newsletter.name;

			// Append elements to card
			cardContent.appendChild(cardCategory);
			cardContent.appendChild(cardHeading);
			card.appendChild(cardBackground);
			card.appendChild(cardContent);

			// Append card to container
			newsletterContainer.appendChild(card);

			i++;
		}
	});

});
