logElems(
	() => document.getElementById("log"),
	() => document.getElementById("log-container"), true);

function logElems(eleLocator, eleOverflowLocator, autoScroll) {
	fixLogFunc('log');
	fixLogFunc('debug');
	fixLogFunc('warn');
	fixLogFunc('error');
	fixLogFunc('info');

	function fixLogFunc(name) {
		console['old' + name] = console[name];
		console[name] = function (...arguments) {
			const output = produceOutput(name, arguments);
			const eleLog = eleLocator();

			//eleLog.innerHTML += output + "<br>";
			if (autoScroll) {
				const eleContainerLog = eleOverflowLocator();
				const isScrolledToBottom = eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1;
				eleLog.innerHTML += output + "<br>";
				if (isScrolledToBottom) {
					eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight;
				}
			} else {
				eleLog.innerHTML += output + "<br>";
			}

			console['old' + name].apply(undefined, arguments);
		};
	}

	function produceOutput(name, args) {
		return args.reduce((output, arg) => {
			return output +
				"<span class=\"log-" + (typeof arg) + " log-" + name + "\">" +
				(typeof arg === "object" ? JSON.stringify(arg) : arg) +
				"</span>&nbsp;";
		}, '');
	}
}
