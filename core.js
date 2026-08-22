;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.HTMLTableToCSV = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function parseHtmlTable(htmlString) {
    const rows = [];
    const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let trMatch;

    while ((trMatch = trRegex.exec(htmlString)) !== null) {
      const rowContent = trMatch[1];
      const cellRegex = /<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi;
      const row = [];
      let cellMatch;
      while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        let cellText = cellMatch[1].replace(/<[^>]+>/g, ''); // strip tags
        cellText = cellText.replace(/&nbsp;/g, ' ')
                           .replace(/&amp;/g, '&')
                           .replace(/&lt;/g, '<')
                           .replace(/&gt;/g, '>')
                           .replace(/&quot;/g, '"')
                           .replace(/&#39;/g, "'")
                           .trim();
        row.push(cellText);
      }
      if (row.length) rows.push(row);
    }
    return rows;
  }

  function toCSV(htmlString, delimiter) {
    delimiter = delimiter || ',';
    const rows = parseHtmlTable(htmlString);
    if (!rows.length) return '';
    return rows.map(function (row) {
      return row.map(function (cell) {
        if (cell.includes(delimiter) || cell.includes('"') || cell.includes('\n')) {
          return '"' + cell.replace(/"/g, '""') + '"';
        }
        return cell;
      }).join(delimiter);
    }).join('\n');
  }

  return { parseHtmlTable: parseHtmlTable, toCSV: toCSV };
});
