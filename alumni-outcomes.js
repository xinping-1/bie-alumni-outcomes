/* ===========================================
   BIE Alumni Outcomes Display Script - v7
   Reads Pred Broad + Pred Tag1/Tag2/Tag3
   =========================================== */

const ROWS_PER_PAGE = 15;
let allData = {};
let currentData = [];
let currentPage = {};

document.addEventListener('DOMContentLoaded', function () {
  loadCSV('predictions.csv').then(() => {

    document.getElementById('searchInput')
      .addEventListener('keyup', filterAndDisplay);

    document.getElementById('yearFilter')
      .addEventListener('change', filterAndDisplay);

    window.showMore = showMore;

    filterAndDisplay();
  });
});

/* ====================== CSV LOADER ====================== */
async function loadCSV(url) {
  const response = await fetch(url);
  const text = await response.text();

  const lines = text.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  const dataLines = lines.slice(1);

  allData = {};

  dataLines.forEach(line => {
    const cells = parseCSVLine(line);
    if (!cells.length) return;

    function get(colName) {
      return cells[headers.indexOf(colName)]?.trim() || "";
    }

    // Extract fields from predictions.csv
    let year = get("Graduation Year");
    if (year.endsWith(".0")) year = year.slice(0, -2);

    const role = get("Role");
    const employer = get("Employer");
    const primary = get("Pred Broad");

    const tagsRaw = [
      get("Pred Tag 1"),
      get("Pred Tag 2"),
      get("Pred Tag 3")
    ];

    // Remove blanks & duplicates & tags identical to primary
    const tags = [...new Set(tagsRaw.filter(t => t && t !== primary))];
    const tagsString = tags.join(", ");

    if (!year || year === "Graduation Year") return;
    if (!allData[year]) allData[year] = [];

    allData[year].push({ primary, role, employer, tags: tagsString });
  });
}

/* CSV parsing helper */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/* ====================== FILTER & SORTING ====================== */
function filterAndDisplay() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const year = document.getElementById('yearFilter').value;

  currentData = [];

  const years = year === 'all'
    ? Object.keys(allData).sort().reverse()
    : [year];

  years.forEach(y => {
    if (allData[y]) {
      let rows = allData[y].filter(row =>
        !search ||
        row.primary.toLowerCase().includes(search) ||
        row.role.toLowerCase().includes(search) ||
        row.employer.toLowerCase().includes(search) ||
        row.tags.toLowerCase().includes(search)
      );

      // Sort alphabetically by Primary category
      rows.sort((a, b) => a.primary.localeCompare(b.primary));

      rows.forEach(data => currentData.push({ year: y, data }));
    }
  });

  currentPage = {};
  years.forEach(y => currentPage[y] = ROWS_PER_PAGE);

  displayResults();
}

/* ====================== DISPLAY ====================== */
function displayResults() {
  const container = document.getElementById('results');
  container.innerHTML = '';

  const grouped = {};
  currentData.forEach(item => {
    if (!grouped[item.year]) grouped[item.year] = [];
    grouped[item.year].push(item.data);
  });

  const years = Object.keys(grouped).sort().reverse();

  years.forEach(year => {
    const rows = grouped[year];
    const showing = Math.min(currentPage[year], rows.length);

    const section = document.createElement('div');
    section.innerHTML = `
      <h3 style="color:#2c5f8d; border-bottom:2px solid #2c5f8d; padding-bottom:5px;">
        Class of ${year}
      </h3>
      <p class="year-count">Showing ${showing} of ${rows.length} roles</p>
      <table>
        <thead>
          <tr style="background-color:#2c5f8d; color:white;">
            <th>Primary Category</th>
            <th>Job Title</th>
            <th>Organization</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody id="tbody-${year}"></tbody>
      </table>
      ${showing < rows.length
        ? `<button class="show-more" onclick="showMore('${year}')">Show More (${rows.length - showing} remaining)</button>`
        : ''}
    `;
    container.appendChild(section);

    const tbody = document.getElementById(`tbody-${year}`);
    rows.slice(0, showing).forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.primary}</td>
        <td>${row.role}</td>
        <td>${row.employer}</td>
        <td>${row.tags}</td>
      `;
      tbody.appendChild(tr);
    });
  });

  if (!currentData.length) {
    container.innerHTML = `<p style="text-align:center; color:#666; padding:20px;">
      No results found. Try a different search term or year.
    </p>`;
  }
}

/* ====================== SHOW MORE BUTTON ====================== */
function showMore(year) {
  currentPage[year] += ROWS_PER_PAGE;
  displayResults();
}
