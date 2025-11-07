const ROWS_PER_PAGE = 20;
let allData = {};
let currentData = [];
let currentPage = {};

document.addEventListener('DOMContentLoaded', function() {
  loadCSV('data.csv').then(() => {
    document.getElementById('searchInput').addEventListener('keyup', filterAndDisplay);
    document.getElementById('yearFilter').addEventListener('change', filterAndDisplay);
    window.showMore = showMore;
    filterAndDisplay();
  });
});

async function loadCSV(url) {
  const response = await fetch(url);
  const text = await response.text();
  
  const lines = text.trim().split('\n');
  // Skip first two rows (header + description)
  const dataLines = lines.slice(2);

  allData = {};
  
  dataLines.forEach(line => {
    const cells = parseCSVLine(line);
    if (!cells[0] || cells[0] === 'Graduation Year') return; // skip empty or header rows

    const year = cells[0].trim();
    const role = cells[1]?.trim() || '';
    const employer = cells[2]?.trim() || '';
    const industry = cells[3]?.trim() || '';
    const categories = [cells[4], cells[5], cells[6], cells[7]].map(c => c?.trim()).filter(Boolean);
    const category = categories.length > 0 ? categories[0] : industry;

    if (!allData[year]) allData[year] = [];
    allData[year].push([industry, role, employer, category]);
  });
}

// Properly handle quoted CSV lines with commas
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
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

function filterAndDisplay() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const year = document.getElementById('yearFilter').value;
  
  currentData = [];
  const years = year === 'all' ? Object.keys(allData).sort().reverse() : [year];
  
  years.forEach(y => {
    if (allData[y]) {
      allData[y].forEach(row => {
        const matches = search === '' || row.some(cell => cell.toLowerCase().includes(search));
        if (matches) currentData.push({year: y, data: row});
      });
    }
  });
  
  currentPage = {};
  years.forEach(y => currentPage[y] = ROWS_PER_PAGE);
  
  displayResults();
}

function displayResults() {
  const container = document.getElementById('results');
  container.innerHTML = '';
  
  const yearGroups = {};
  currentData.forEach(item => {
    if (!yearGroups[item.year]) yearGroups[item.year] = [];
    yearGroups[item.year].push(item.data);
  });
  
  const years = Object.keys(yearGroups).sort().reverse();
  
  years.forEach(year => {
    const rows = yearGroups[year];
    const showing = Math.min(currentPage[year] || ROWS_PER_PAGE, rows.length);
    
    const section = document.createElement('div');
    section.innerHTML = `
      <h3 style="color: #2c5f8d; border-bottom: 2px solid #2c5f8d; padding-bottom: 5px;">
        Class of ${year}
      </h3>
      <p class="year-count">Showing ${showing} of ${rows.length} positions</p>
      <table>
        <thead>
          <tr style="background-color: #2c5f8d; color: white;">
            <th>Primary Category</th>
            <th>Job Title</th>
            <th>Organization</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody id="tbody-${year}">
        </tbody>
      </table>
      ${showing < rows.length ? `<button class="show-more" onclick="showMore('${year}')">Show More (${rows.length - showing} remaining)</button>` : ''}
    `;
    
    container.appendChild(section);
    
    const tbody = document.getElementById(`tbody-${year}`);
    rows.slice(0, showing).forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = idx % 2 === 0 ? '#f9f9f9' : 'white';
      tr.innerHTML = `
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
      `;
      tbody.appendChild(tr);
    });
  });
  
  if (currentData.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#666; padding:20px;">No results found. Try a different search term or year.</p>';
  }
}

function showMore(year) {
  currentPage[year] = (currentPage[year] || ROWS_PER_PAGE) + ROWS_PER_PAGE;
  displayResults();
}
