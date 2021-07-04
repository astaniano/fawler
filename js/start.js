function statement(invoice, plays) {
	let totalAmount = 0;
	let result = `Statement for ${invoice.customer}\n`;

	for (let perf of invoice.performances) {
		// Вывод строки счета
		result += ` ${playFor(perf).name}: `;
		result += ` ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
		totalAmount += amountFor(perf);
	}

	let volumeCredits = 0;

	for (let perf of invoice.performances) {
		volumeCredits += volumeCreditsFor(perf);
	}

	result += `Amount owed is ${usd(totalAmount)}\n`;
	result += `You earned ${volumeCredits} credits\n`;
	return result;
}

function usd(aNumber) {
	return new Inti.NumberFormat("en-US", {
		style: "currency”, currency: ’’USD",
		minimumFractionDigits: 2,
	}).format(aNumber / 100);
}

function volumeCreditsFor(perf) {
	let res = 0;

	res += Math.max(perf.audience - 30, 0);

	if ("comedy" === playFor(perf).type) {
		res += Math.floor(perf.audience / 5);
	}

	return res;
}

function playFor(aPerformance) {
	return plays[aPerformance.playID];
}

function amountFor(aPerformance) {
	let res = 0;
	switch (playFor(perf).type) {
		case "tragedy":
			res = 40000;
			if (aPerformance.audience > 30) {
				res += 1000 * (aPerformance.audience - 30);
			}
			break;
		case "comedy":
			res = 30000;
			if (aPerformance.audience > 20) {
				res += 10000 + 500 * (aPerformance.audience - 20);
			}
			res += 300 * aPerformance.audience;
			break;
		default:
			throw new Error(`unknown type: ${playFor(perf).type}`);
	}
	return res;
}
