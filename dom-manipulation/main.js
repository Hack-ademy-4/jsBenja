/// https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API


const $ = selector => document.querySelector(selector),
			$$ = selector => document.querySelectorAll(selector),
			addClass = (e, c) => {
				const classList = $(e).classList;
				if (!classList.contains(c))
					classList.add(c);
				return classList;
			};


window.addEventListener("load", main);

function main()
{
	const about = $("#about"),
				services = $("#services"),
				portfolio = $("#portfolio"),
				contact = $("#contact");
	
	let calcOffsetHandle = null;

	about.suLink = $("a[href='#about']");
	services.suLink = $("a[href='#services']");
	portfolio.suLink = $("a[href='#portfolio']");
	contact.suLink = $("a[href='#contact']");


	function calcOffset(el) {
		if (!calcOffsetHandle)
			setTimeout(() => {		// Esperamos 100 milisegundos hasta que el usuario acabe de hacer scroll para ejecutar
				const clientH = Math.floor(window.innerHeight / 2);

				if ((window.pageYOffset + clientH) > el.offsetTop && (window.pageYOffset + clientH) < el.offsetTop + el.clientHeight)
				{
					//console.log("->", el.id);
					//console.log(window.pageYOffset + clientH, el.offsetTop, el.offsetTop + el.clientHeight);
					el.suLink.classList.add("active");
				}
				else
					el.suLink.classList.remove("active");

				calcOffsetHandle = null;
			}, 100);

		
		/* if (window.pageYOffset > el.offsetTop - clientH && window.pageYOffset < el.offsetTop +clientH)
		{
			el.suLink.classList.add("active");
		}
		else
			el.suLink.classList.remove("active"); */
	}

	window.addEventListener("scroll", () => {
		if (window.pageYOffset > 100 && $("nav").classList.contains("bg-transparent"))
			addClass("nav", "ele").remove("bg-transparent");

		if (window.pageYOffset < 100 && !$("nav").classList.contains("bg-transparent"))
			addClass("nav", "bg-transparent").remove("ele");
	
		calcOffset(about);
		calcOffset(services);
		calcOffset(portfolio);
		calcOffset(contact);
	});

	$$(".btn").forEach(btn => {
		btn.addEventListener("click", allBtns);
	});
}

function allBtns(ev) {
	ev.preventDefault();
	console.log("Evento disparado por addEventListener. El evento es", ev, "Y el boton", this);
}

function btnClick(btn) {
	console.log("Boton 1 clickado", btn);
}