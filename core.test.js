const assert = require('assert');
const HTMLTableToCSV = require('./core');

const html = '<table><thead><tr><th>Name</th><th>Email</th></tr></thead><tbody><tr><td><b>Alice</b></td><td>alice@test.org</td></tr><tr><td>Bob</td><td>bob@test.org</td></tr></tbody></table>';
const csv = HTMLTableToCSV.toCSV(html);
assert.strictEqual(csv, 'Name,Email\nAlice,alice@test.org\nBob,bob@test.org');
console.log('ok, all HTMLTableToCSV assertions passed');
