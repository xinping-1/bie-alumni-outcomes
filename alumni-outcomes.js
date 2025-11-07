const ROWS_PER_PAGE = 20;
let currentData = [];
let currentPage = {};

const data2025 = [
  ["Academia","Arts Peer Advisor","UBC","Academia"],
  ["Academia","BIE Peer Academic Advisor","The University of British Columbia","Academia"],
  ["Actuarial Science","Associate Broker","Aon","Actuarial Science"],
  ["Consulting","Assistant Consultant","Roland Berger","Consulting"],
  ["Consulting","Associate","The Stewart Group Inc.","Consulting"],
  ["Consulting","Consultant","Deloitte","Consulting"],
  ["Consulting","Consulting Intern, Business Transformation","EY","Consulting"],
  ["Data Science","Business Analysis and Data Management Coordinator","Vancouver School of Economics Career Centre","Data Science"],
  ["Data Science","Business Analyst","SAP","Data Science"],
  ["Data Science","Data Analyst","RBC Global Asset Management","Data Science"],
  ["Data Science","Data Scientist","BC Hydro","Data Science"],
  ["Data Science","Gameday Operator","Sportable","Data Science"],
  ["Entrepreneurship","Advisor","rekindle","Entrepreneurship"],
  ["Entrepreneurship","Area Manager 1","Amazon","Entrepreneurship"],
  ["Entrepreneurship","Business Development Representative","Fidelity Canada","Entrepreneurship"],
  ["Entrepreneurship","Co-Founder","Stealth Startup","Entrepreneurship"],
  ["Entrepreneurship","Founder and Project Director","rekindle","Entrepreneurship"],
  ["Finance - Asset Management","Mid-Market Portfolio Management Intern","Deloitte","Finance - Asset Management"],
  ["Finance - Corporate Finance","Accounting Assistant, Corporate Services Directorate","Indigenous Services Canada","Finance - Corporate Finance"],
  ["Finance - Corporate Finance","Corporate Finance Analyst","Deloitte","Finance - Corporate Finance"],
  ["Finance - Corporate Finance","Financial Analyst","BC Hydro","Finance - Corporate Finance"],
  ["Finance - Investment Banking","Account Management Associate","Gentai Capital","Finance - Investment Banking"],
  ["Finance - Investment Banking","Analyst","Scotiabank","Finance - Investment Banking"],
  ["Finance - Investment Banking","Analyst","Goldman Sachs","Finance - Investment Banking"],
  ["Finance - Investment Banking","Investment Analyst","Boann Social Impact","Finance - Investment Banking"],
  ["Finance - Investment Banking","Investment Banking Analyst","Goldman Sachs","Finance - Investment Banking"],
  ["Finance - Private Equity","Equity Analyst Intern","Enso Gestão de Patrimônio","Finance - Private Equity"],
  ["Finance - Private Equity","Venture Capital Investment Associate","Front Row Ventures","Finance - Private Equity"],
  ["Finance - Sales and Trading","Client Relations Specialist","Plenty Stores","Finance - Sales and Trading"],
  ["Finance - Sales and Trading","Sales Associate","Boathouse/Blackwell Supply Company","Finance - Sales and Trading"],
  ["Government and NGO's","Administrative Assistant","Canada Border Services Agency","Government and NGO's"],
  ["Government and NGO's","Founder","FoundHer Studio","Government and NGO's"],
  ["Government and NGO's","Transformation Analyst","Community Foundations of Canada","Government and NGO's"],
  ["Health/Policy/Research","Junior Analyst","Global Affairs Canada","Health/Policy/Research"],
  ["Health/Policy/Research","Junior Policy Analyst","RCAANC-CIRNAC","Health/Policy/Research"],
  ["Health/Policy/Research","Policy Analyst","Pacific Economic Development Canada","Health/Policy/Research"],
  ["Health/Policy/Research","Research Assistant","Bank of Canada","Health/Policy/Research"],
  ["Health/Policy/Research","Research Assistant","UBC VSE","Health/Policy/Research"],
  ["Insurance","Client Relationship Associate","Marsh Canada Limited","Insurance"],
  ["Law","Compliance Intern","BCI","Law"],
  ["Marketing","Digital Marketing Assistant","APASS Education Group","Marketing"],
  ["Marketing","Marketing Intern","deenSTRONG Foundation","Marketing"],
  ["Marketing","Marketing Manager","Tutti Mimo","Marketing"],
  ["Marketing","Social Media Manager","Perchance Tea & Coffee","Marketing"],
  ["Other","Barista","Storm City Coffee","Other"],
  ["Other","Business Analyst","Scotiabank","Other"],
  ["Other","Front Desk","Cactus Club Cafe","Other"],
  ["Other","Server","ZUBU Ramen","Other"],
  ["Sustainability/Environment","ESG Consultant","Zircon Industry Association","Sustainability/Environment"],
  ["Wealth Management","Analyst","American Express","Wealth Management"],
  ["Wealth Management","Customer Service Associate","TD","Wealth Management"],
  ["Wealth Management","Financial Advisor","Scotiabank","Wealth Management"]
];

const data2024 = [
  ["Finance - Asset Management","Investment Analyst","New Market Funds","Finance - Asset Management"],
  ["Finance - Investment Banking","Investment Banking Analyst","RBC","Finance - Investment Banking"],
  ["Finance - Corporate Finance","Junior Accountant","Elemental Energy","Finance - Corporate Finance"],
  ["Other","Server","Homer Street Cafe and Bar","Other"],
  ["Health/Policy/Research","Market Research Specialist","NewtonX","Health/Policy/Research"],
  ["Consulting","Associate Consultant","Global Public Affairs","Consulting"],
  ["Consulting","Consultant","Global Public Affairs","Consulting"],
  ["Finance - Investment Banking","Analyst","Citi","Finance - Investment Banking"],
  ["Finance - Corporate Finance","Accounting Intern","Push Operations","Finance - Corporate Finance"],
  ["Finance - Private Equity","Investments Intern","Balfour Pacific Capital, Inc.","Finance - Private Equity"],
  ["Finance - Corporate Finance","Administrative and Finance Coordinator","Northern Equity Partners Inc.","Finance - Corporate Finance"],
  ["Wealth Management","Client Advisor","RBC","Wealth Management"],
  ["Finance - Investment Banking","Investment Banking Analyst","ComCap","Finance - Investment Banking"],
  ["Finance - Corporate Finance","Analyst","Movement Holdings","Finance - Corporate Finance"],
  ["Wealth Management","Customer Experience Associate","Scotiabank","Wealth Management"],
  ["Finance - Asset Management","Equity Research Associate","AlphaSense","Finance - Asset Management"],
  ["Sustainability/Environment","Sustainability Scholar","City of Richmond","Sustainability/Environment"],
  ["Finance - Corporate Finance","Analyst","BMO","Finance - Corporate Finance"],
  ["Finance - Sales and Trading","Global Markets Associate","TD Securities","Finance - Sales and Trading"],
  ["Other","Assistant Manager","Pomona Coffee","Other"]
];

const data2023 = [
  ["Other","Sales Representative","Vector Marketing","Other"],
  ["Health/Policy/Research","Student Researcher","Ipsos","Health/Policy/Research"],
  ["Finance - Investment Banking","Investment Research Intern","Leith wheeler Investment Counsel Ltd.","Finance - Investment Banking"],
  ["Academia","Data Tracking and Reporting Analyst","Vancouver School of Economics Career Centre","Academia"],
  ["Academia","Research Assistant","Vancouver School of Economics at UBC","Academia"],
  ["Academia","Teaching Assistant","UBC","Academia"],
  ["Consulting","Assistant Instructor","Kumon North America, Inc.","Consulting"],
  ["Health/Policy/Research","Research Assistant","InterVISTAS Consulting","Health/Policy/Research"],
  ["Data Science","Data Analyst","SIGELEC S.A.C.","Data Science"],
  ["Finance - Private Equity","Investment Analyst","Artesian Investment Partners","Finance - Private Equity"],
  ["Finance - Corporate Finance","Finance Intern","WELL Health Technologies Corp.","Finance - Corporate Finance"],
  ["Consulting","Risk Advisory Analyst","EY","Consulting"],
  ["Health/Policy/Research","Research Assistant","Bank of Canada","Health/Policy/Research"],
  ["Finance - Investment Banking","Markets Summer Analyst","Citi","Finance - Investment Banking"],
  ["Finance - Investment Banking","Investment Banking Analyst","CIBC Capital Markets","Finance - Investment Banking"]
];

const data2022 = [
  ["Consulting","Research Consultant","The World Bank","Consulting"],
  ["Academia","Pre-Doctoral Research Fellow","Duke University","Academia"],
  ["Health/Policy/Research","Literacy Researcher","Simbi Foundation","Health/Policy/Research"],
  ["Data Science","Junior Data Analyst","Statistics Canada","Data Science"],
  ["Academia","Research Assistant","UBC VSE","Academia"],
  ["Health/Policy/Research","Junior Policy Analyst","Infrastructure Canada","Health/Policy/Research"],
  ["Academia","Teaching Assistant","UBC","Academia"],
  ["Finance - Corporate Finance","Junior Accountant","BDO Canada","Finance - Corporate Finance"],
  ["Consulting","Consultant","Deloitte","Consulting"],
  ["Finance - Private Equity","Summer Business Associate","Orbis Investments","Finance - Private Equity"],
  ["Academia","Undergraduate Research Assistant","UBC VSE","Academia"],
  ["Consulting","Associate, Management Consulting","PwC Canada","Consulting"],
  ["Data Science","Quantitative Research Analyst","Kamorra Capital","Data Science"],
  ["Consulting","Business Technology Analyst","Deloitte","Consulting"],
  ["Academia","UBC Student Ambassador","UBC","Academia"],
  ["Finance - Investment Banking","Analyst","Cornerstone Research","Finance - Investment Banking"],
  ["Health/Policy/Research","Political/Economic Intern","U.S Department of State","Health/Policy/Research"],
  ["Consulting","Management Consultant","EY","Consulting"],
  ["Consulting","Research Professional","Analysis Group","Consulting"],
  ["Consulting","Business Analyst","McKinsey & Company","Consulting"]
];

const data2021 = [
  ["Academia","Program Development Assistant","VSE CC","Academia"],
  ["Academia","Orientation Leader","UBC","Academia"],
  ["Academia","Research Assistant","VSE at UBC","Academia"],
  ["Academia","Teaching Assistant","UBC","Academia"],
  ["Marketing","Product Marketing Intern","Canopy","Marketing"],
  ["Marketing","Brand Marketing Intern","Unilever","Marketing"],
  ["Finance - Investment Banking","Summer Analyst","Prosight Partners","Finance - Investment Banking"],
  ["Actuarial Science","Assistant Vice President","Aon","Actuarial Science"],
  ["Consulting","Senior Consultant","KPMG","Consulting"],
  ["Consulting","Senior Associate Consultant","PwC","Consulting"],
  ["Health/Policy/Research","Researcher","Institute for Health Metrics and Evaluation","Health/Policy/Research"],
  ["Data Science","Junior Database and Research Analyst","BPI Inc.","Data Science"],
  ["Finance - Corporate Finance","Project Control Officer","RBC","Finance - Corporate Finance"],
  ["Consulting","Consultant Intern","PwC","Consulting"],
  ["Consulting","Analyst","Deloitte","Consulting"],
  ["Data Science","Data Science for Social Good Fellow","UBC","Data Science"],
  ["Finance - Investment Banking","Investments","AC Ventures","Finance - Investment Banking"],
  ["Finance - Investment Banking","Associate","Boston Consulting Group","Finance - Investment Banking"],
  ["Wealth Management","Client Advisor Summer Intern","RBC","Wealth Management"],
  ["Consulting","Consultant","Deloitte","Consulting"]
];

const allData = {
  "2025": data2025,
  "2024": data2024,
  "2023": data2023,
  "2022": data2022,
  "2021": data2021
};

function filterAndDisplay() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const year = document.getElementById('yearFilter').value;
  
  currentData = [];
  const years = year === 'all' ? ['2025','2024','2023','2022','2021'] : [year];
  
  years.forEach(y => {
    if (allData[y]) {
      allData[y].forEach(row => {
        const matches = search === '' || row.some(cell => 
          cell.toLowerCase().includes(search)
        );
        if (matches) {
          currentData.push({year: y, data: row});
        }
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('searchInput').addEventListener('keyup', filterAndDisplay);
  document.getElementById('yearFilter').addEventListener('change', filterAndDisplay);
  window.showMore = showMore;
  filterAndDisplay();
});
