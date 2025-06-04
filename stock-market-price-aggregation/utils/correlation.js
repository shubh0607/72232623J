
exports.calculateCorrelation = (data1, data2) => {
    // Simple time alignment (nearest within 5s)
    const aligned1 = [],
        aligned2 = [];
    let i = 0,
        j = 0;
    while (i < data1.length && j < data2.length) {
        const diff = Math.abs(data1[i].time - data2[j].time);
        if (diff <= 5000) {
            aligned1.push(data1[i]);
            aligned2.push(data2[j]);
            i++;
            j++;
        } else if (data1[i].time < data2[j].time) {
            i++;
        } else {
            j++;
        }
    }
    const prices1 = aligned1.map((d) => d.price);
    const prices2 = aligned2.map((d) => d.price);
    const mean1 = prices1.reduce((s, v) => s + v, 0) / prices1.length;
    const mean2 = prices2.reduce((s, v) => s + v, 0) / prices2.length;
    let numerator = 0,
        denom1 = 0,
        denom2 = 0;
    for (let k = 0; k < prices1.length; k++) {
        numerator += (prices1[k] - mean1) * (prices2[k] - mean2);
        denom1 += Math.pow(prices1[k] - mean1, 2);
        denom2 += Math.pow(prices2[k] - mean2, 2);
    }
    const correlation = numerator / Math.sqrt(denom1 * denom2);
    return { correlation, aligned1, aligned2, mean1, mean2 };
};
