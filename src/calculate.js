export function formatTime(totalTime) {
    //if (isNaN(totalTime)) return 'Never - try higher repayments'
    if (isNaN(totalTime)) return 'Never - try higher repayments'
    let yrs = Math.floor(totalTime)
    return `${Math.floor(yrs)} years, ${Math.ceil((totalTime-yrs)*12.0)} months`
}

export function solveTime(
    outstanding,
    repayment,
    interestRate,
    compoundsYearly,
    paymentsYearly
) {
    if (interestPerPayment(interestRate, compoundsYearly, paymentsYearly) > repayment) return NaN;

    let payments = nPayments(
        outstanding,
        repayment,
        interestPerPayment(interestRate, compoundsYearly, paymentsYearly)
    )
    return payments / paymentsYearly;
}

function nPayments(outstanding, repayment, regularInterest) {
    let q= outstanding / repayment
	let Lq=(Math.log(q)/Math.log(regularInterest))
	return -1*Math.log((q+1)-regularInterest**(Lq+1))/Math.log(regularInterest)
}

function interestPerPayment(interestRate, compoundsYearly, paymentsYearly) {
    return ((1 + (interestRate / compoundsYearly)) ** (compoundsYearly/paymentsYearly))
}