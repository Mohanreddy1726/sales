const scrollToTop = () => {
	window.scroll({
		top: 0,
		behavior: "smooth"
	});
};

document.querySelector(".scroll-to-top-btn").onclick = scrollToTop;
