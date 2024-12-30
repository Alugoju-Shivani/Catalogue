
const fs = require('fs');
function decodeValue(base, value) {
    return parseInt(value, base);
}
function findConstantTerm(roots, k) {
    let constant = 0;

    const points = roots.slice(0, k); 
    const xs = points.map(root => root.x);
    const ys = points.map(root => root.y);

    for (let i = 0; i < k; i++) {
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                li *= (0 - xs[j]) / (xs[i] - xs[j]);
            }
        }

        constant += ys[i] * li;
    }

    return Math.round(constant);
}

function processJsonFile(filename) {
    
    const jsonData = fs.readFileSync(filename, 'utf8');
    const data = JSON.parse(jsonData);

    const n = data.keys.n;
    const k = data.keys.k;

    const roots = Object.keys(data)
        .filter(key => !isNaN(key)) 
        .map(key => {
            const root = data[key];
            return {
                x: parseInt(key), 
                y: decodeValue(parseInt(root.base), root.value) 
            };
        });

    return findConstantTerm(roots, k);
}

try {
    const result1 = processJsonFile('ts1.json'); 
    const result2 = processJsonFile('ts2.json'); 

    console.log("Secret for Test Case 1 (Constant 'c'):", result1);
    console.log("Secret for Test Case 2 (Constant 'c'):", result2);
} catch (error) {
    console.error("Error processing JSON files. Check JSON formatting and paths:", error.message);
}