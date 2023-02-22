// when launch-now__content__button <a> is clicked redirect to wwww.uocleos.org
const launchNowBtn = document.getElementById("launch-now__content__button");

launchNowBtn.addEventListener("click", function() {
	console.log("clicked");
	window.location.href = "https://www.uocleos.org";
});
