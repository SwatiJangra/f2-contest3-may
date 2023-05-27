const apiURL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

// Fetch data using .then method
fetch(apiURL)
  .then((response) => response.json())
  .then((data) => renderTable(data))
  .catch((error) => console.error("Error:", error));

// Fetch data using async/await method
async function fetchDataAsync() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchDataAsync();

// Render table with data
function renderTable(data) {
  const tableBody = document.getElementById("crypto-table-body");
  tableBody.innerHTML = ""; // Clear previous data

  data.forEach((crypto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src="${crypto.image}" alt="${crypto.name}"></td>
        <td>${crypto.name}</td>
        <td>${crypto.id}</td>
        <td>${crypto.symbol}</td>
        <td>${crypto.current_price}</td>
        <td>${crypto.total_volume}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Search functionality
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const filteredData = data.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchInput) ||
      crypto.id.toLowerCase().includes(searchInput) ||
      crypto.symbol.toLowerCase().includes(searchInput)
  );
  renderTable(filteredData);
});

// Sorting functionality
const sortMarketCapButton = document.getElementById("sort-market-cap-button");
sortMarketCapButton.addEventListener("click", () => {
  data.sort((a, b) => a.market_cap - b.market_cap);
  renderTable(data);
});

const sortPercentageChangeButton = document.getElementById(
  "sort-percentage-change-button"
);
sortPercentageChangeButton.addEventListener("click", () => {
  data.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
  renderTable(data);
});
