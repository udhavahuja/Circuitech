const CONFIG = {
  CHANNEL_ID: "3290934",
  READ_API_KEY: "UTN6BAFQQUILC8C9",

  FETCH_COUNT: 20,
  REFRESH_MS: 15000,

  TEMP_FIELD: "field1",
  SOIL_FIELD: "field2"
};

function buildUrl() {
  return `https://api.thingspeak.com/channels/${CONFIG.CHANNEL_ID}/feeds.json?api_key=${CONFIG.READ_API_KEY}&results=${CONFIG.FETCH_COUNT}`;
}

let sensorChart = null;

function initChart() {
  const ctx = document.getElementById("sensorChart").getContext("2d");

  sensorChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Temperature",
          data: [],
          borderColor: "#ef4444",
          tension: 0.4
        },
        {
          label: "Soil Moisture",
          data: [],
          borderColor: "#8b5e3c",
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "white" }
        }
      },
      scales: {
        x: {
          ticks: { color: "white" }
        },
        y: {
          ticks: { color: "white" },
          beginAtZero: true
        }
      }
    }
  });
}

function safeParse(value) {
  const v = parseFloat(value);
  return isNaN(v) ? null : v;
}

function renderAlerts(alerts) {
  const list = document.getElementById("alertsList");

  if (!alerts.length) {
    list.innerHTML = `<li class="alert-item">All systems normal</li>`;
    return;
  }

  list.innerHTML = alerts
    .map(a => `<li class="alert-item ${a.type}">${a.msg}</li>`)
    .join("");
}

function setCloudStatus(connected) {
  const label = document.getElementById("cloudStatus");

  label.textContent = connected ? "● Connected" : "● Error";

  label.classList.remove("connected", "error-status");
  label.classList.add(connected ? "connected" : "error-status");
}

async function fetchData() {
  try {
    const res = await fetch(buildUrl());
    if (!res.ok) throw new Error("HTTP error");

    const json = await res.json();
    const feeds = json.feeds;

    if (!feeds || feeds.length === 0) throw new Error("No data");

    const temps = [];
    const soils = [];
    const labels = [];

    feeds.forEach(f => {
      temps.push(safeParse(f[CONFIG.TEMP_FIELD]));
      soils.push(safeParse(f[CONFIG.SOIL_FIELD]));

      const t = new Date(f.created_at);
      labels.push(t.toLocaleTimeString());
    });

    const latestTemp = temps.at(-1);
    const latestSoil = soils.at(-1);

    // Update values
    document.getElementById("tempValue").textContent =
      latestTemp !== null ? `${latestTemp} °C` : "No Data";
    document.getElementById("soilValue").textContent = latestSoil !== null ? `${latestSoil}` : "No Data";

    // Update chart
    sensorChart.data.labels = labels;
    sensorChart.data.datasets[0].data = temps.map(v => v ?? 0);
    sensorChart.data.datasets[1].data = soils.map(v => v ?? 0);
    sensorChart.update();

    // Alerts + Device Status
    const alerts = [];

    // Pump logic
    if (latestSoil !== null && latestSoil > 700) {
      alerts.push({ msg: "Soil Dry → Pump ON", type: "error" });
    } else {
      alerts.push({ msg: "Soil OK → Pump OFF", type: "" });
    }

    // Fan logic
    if (latestTemp !== null && latestTemp > 30) {
      alerts.push({ msg: "High Temp → Fan ON", type: "error" });
    } else {
      alerts.push({ msg: "Temp Normal → Fan OFF", type: "" });
    }

    renderAlerts(alerts);
    setCloudStatus(true);

  } catch (err) {
    console.error(err);
    setCloudStatus(false);
    renderAlerts([{ msg: "Connection error", type: "error" }]);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initChart();
  fetchData();
  setInterval(fetchData, CONFIG.REFRESH_MS);
});