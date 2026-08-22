const sample = "<table>\n  <thead>\n    <tr>\n      <th>Tool Name</th>\n      <th>Category</th>\n      <th>License</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><b>Defrost</b></td>\n      <td>Privacy & Web</td>\n      <td>MIT</td>\n    </tr>\n    <tr>\n      <td><b>JSON Fixer</b></td>\n      <td>Data & JSON</td>\n      <td>MIT</td>\n    </tr>\n  </tbody>\n</table>";

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');

function process() {
  const txt = inputEl.value;
  if (!txt.trim()) { outputEl.value = ''; if (statsEl) statsEl.textContent = 'Empty input'; return; }
  try {
    const csv = HTMLTableToCSV.toCSV(txt);
    outputEl.value = csv;
    const lines = csv.split('\n').filter(l => l.length > 0);
    if (statsEl) statsEl.textContent = `Extracted ${lines.length} table rows to CSV`;
  } catch (err) {
    outputEl.value = 'Error: ' + err.message;
  }
}

document.getElementById('btn-run').addEventListener('click', process);
inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', () => { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', () => { navigator.clipboard.writeText(outputEl.value); alert('Copied CSV!'); });
if (document.getElementById('btn-clear')) document.getElementById('btn-clear').addEventListener('click', () => { inputEl.value = ''; outputEl.value = ''; });
