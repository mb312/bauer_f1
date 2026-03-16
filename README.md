# 🏎️ bauerF1
A custom Formula 1 web application built with **React** that keeps you up to date with everything happening in the current F1 season — from the next race countdown to live standings and the full calendar.
🔗 **Live Demo:** [bauerf1.netlify.app](https://bauerf1.netlify.app)
---

## ✨ Features
- ⏳ **Countdown** — Live countdown timer to the next Formula 1 race
- 🏁 **Driver Standings** — Current season driver rankings
- 🏆 **Constructor Standings** — Team standings for the current season
- 📅 **Race Calendar** — Full schedule overview for the season
- 🔄 **API-driven** — All data fetched live from external F1 APIs
- 📱 **Responsive UI** — Works across desktop and mobile
---

## 🛠️ Tech Stack
| Category | Technology |
|---|---|
| Frontend Framework | React |
| State & Effects | React Hooks (`useState`, `useEffect`) |
| Routing | React Router |
| Styling | CSS |
| HTTP | Fetch API |
| F1 Data | [Jolpica/Ergast API](https://api.jolpi.ca/ergast/) |
| Live Timing Data | [OpenF1 API](https://api.openf1.org/v1/) |
| Deployment | Netlify |
---

## 🚀 Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/mb312/bauer_f1.git

# Navigate into the project
cd bauer_f1

# Install dependencies
npm install

# Start the development server
npm start
```

The app will be available at `http://localhost:3000`.
### Build for Production
```bash
npm run build
```
---

## 📡 APIs Used
### [Jolpica / Ergast API](https://api.jolpi.ca/ergast/)
Provides historical and current season F1 data including:
- Driver standings
- Constructor standings
- Race schedule / calendar

### [OpenF1 API](https://api.openf1.org/v1/)
Provides real-time and session-level F1 data including:
- Session information
- Live timing data
---

## 📁 Project Structure
```
bauer_f1/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Data-fetching for differnt API-Endpoints
│   ├── locals/           # Translation-files (en/de)
│   ├── pages/            # Page-level views (Standings, Calendar, etc.)
│   ├── styles/           # CSS files
│   ├── utilities/        # Reusable functions
│   ├── App.js            # Root component & routing
│   └── index.js          # Entry point
├── package.json
└── README.md
```

---

## 🌐 Deployment
This project is deployed via **Netlify** with automatic builds from the `main` branch.
[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://bauerf1.netlify.app)
---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
---

## 👤 Author
**mb312**  
GitHub: [@mb312](https://github.com/mb312)