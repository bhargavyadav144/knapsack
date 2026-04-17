const fs = require('fs');
const http = require('http');

const appJs = fs.readFileSync('static/app.js', 'utf8');
const levelsMatch = appJs.match(/const levelsData = (\[[\s\S]*?\]);/);
if (!levelsMatch) {
    console.error("Could not extract levelsData");
    process.exit(1);
}

// Evaluate to get the array
let levelsData;
try {
    levelsData = eval(levelsMatch[1]);
} catch (e) {
    console.error("Eval failed:", e);
    process.exit(1);
}

async function solveLevel(level) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({
            capacity: level.capacity,
            items: level.items
        });

        const req = http.request({
            hostname: '127.0.0.1',
            port: 5000,
            path: '/api/solve',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(`Status ${res.statusCode}: ${data}`);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });

        req.on('error', e => reject(e));
        req.write(body);
        req.end();
    });
}

async function runTests() {
    let failed = false;
    for (let level of levelsData) {
        try {
            const result = await solveLevel(level);
            console.log(`Level ${level.levelNumber} (${level.name}): API returned max value $${result.maxValue}`);
            
            // Re-calculate the value manually from the result to verify validity
            let totalWeight = 0;
            let totalValue = 0;
            for (let item of result.items) {
                if (item.fraction !== 1.0) {
                    console.error(`  ERROR: Non-1.0 fraction found! ID: ${item.id}, Fraction: ${item.fraction}`);
                    failed = true;
                }
                totalWeight += item.weight;
                totalValue += item.value;
            }
            if (totalWeight > level.capacity) {
                console.error(`  ERROR: Exceeded capacity! Weight: ${totalWeight}, Capacity: ${level.capacity}`);
                failed = true;
            }
            if (Math.abs(totalValue - result.maxValue) > 0.01) {
                console.error(`  ERROR: Value mismatch! Calculated: ${totalValue}, API reported: ${result.maxValue}`);
                failed = true;
            }

        } catch (e) {
            console.error(`Level ${level.levelNumber} API Error:`, e);
            failed = true;
        }
    }
    if (failed) process.exit(1);
    else console.log("All levels passed validation constraints.");
}

runTests();
