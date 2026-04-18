# 🌱 Smart Greenhouse Dashboard

A real-time web dashboard for monitoring environmental conditions inside a greenhouse using IoT sensors and ThingSpeak cloud integration.

---

## 🚀 Features

* 📡 Live sensor monitoring (Temperature, Soil Moisture, Light)
* 📊 Real-time graph visualization using Chart.js
* ⚠️ Automated alerts for critical conditions
* ☁️ Cloud data fetching from ThingSpeak API
* 🔄 Auto-refresh every 15 seconds
* 💻 Simple and responsive UI

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Charts:** Chart.js
* **Cloud:** ThingSpeak API
* **Hardware (optional):** ESP32 / Arduino with sensors

---

## 📁 Project Structure

```
smart-greenhouse-dashboard/
│
├── index.html      # Main dashboard UI
├── style.css       # Styling
├── script.js       # Logic + API handling
└── README.md       # Project documentation
```

---

## ⚙️ Configuration

Update the following in `script.js`:

```javascript
const CONFIG = {
  CHANNEL_ID: "YOUR_CHANNEL_ID",
  READ_API_KEY: "YOUR_READ_API_KEY",

  TEMP_FIELD: "field1",
  SOIL_FIELD: "field2",
  LIGHT_FIELD: "field3"
};
```

---

## 📡 How It Works

1. Sensor data is uploaded to **ThingSpeak**.
2. The dashboard fetches data using REST API.
3. Data is parsed and displayed:

   * Latest values → Live Sensors panel
   * Historical data → Graph
4. Alerts are generated based on thresholds:

   * 🌡 High Temperature → Fan ON
   * 🌱 Dry Soil → Pump ON
   * 🌞 High Light → Shade ON

---

## ▶️ How to Run

1. Clone the repository or download files
2. Open `index.html` in your browser

> No backend required ✅

---

## 📊 Alerts Logic

| Condition          | Action   |
| ------------------ | -------- |
| Soil > 700         | Pump ON  |
| Temperature > 30°C | Fan ON   |
| Light > 700        | Shade ON |

---

## 🔮 Future Improvements

* 📷 Camera integration for plant disease detection
* 🎛️ Manual control buttons (Pump, Fan, Light)
* 🌐 Backend integration (Node.js / Firebase)
* 📱 Mobile-friendly UI
* 🌙 Dark mode

---

## 🧪 Example Use Case

* Smart farming
* Home greenhouse automation
* Agricultural monitoring system
* IoT-based environmental tracking

---

## 🙌 Credits

* ThingSpeak for IoT cloud platform
* Chart.js for data visualization

---

## 📜 License

This project is open-source and free to use for educational purposes.

---

## 💡 Author

Developed as part of a Smart Greenhouse IoT project.

---
