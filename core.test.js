const assert = require('assert');
const HTMLTableToCSV = require('./core');

const html = '<table><thead><tr><th>Name</th><th>Email</th></tr></thead><tbody><tr><td><b>Alice</b></td><td>alice@test.org</td></tr><tr><td>Bob</td><td>bob@test.org</td></tr></tbody></table>';
const csv = HTMLTableToCSV.toCSV(html);
assert.strictEqual(csv, 'Name,Email\nAlice,alice@test.org\nBob,bob@test.org');

const formulaHtml = `<table><tr><th>@id</th><th>name</th></tr><tr><td>=cmd|'/c calc'!A1</td><td>Alice</td></tr></table>`;
const formulaCsv = HTMLTableToCSV.toCSV(formulaHtml);
assert.strictEqual(formulaCsv, "'@id,name\n'=cmd|'/c calc'!A1,Alice");

console.log('ok, all HTMLTableToCSV assertions passed');
