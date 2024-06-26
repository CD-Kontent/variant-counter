const table = new Tabulator("#results", {
  index: "itemId",
  data: [], // initialise table with no data, pending scan results
  pagination: true,
  paginationSize: 10,
  layout: "fitColumns", //fit columns to width of table (optional)
  columns: [
    { title: "Language", field: "language" },
    { title: "Variant Count", field: "count" },
  ],
});

const download = document.getElementById("download");
download.style.display = "none";
download.addEventListener("click", function () {
  table.download("csv", "data.csv");
});

export { table };
