# WistopVTU

WistopVTU is a mobile value-added service provider web application offering services such as airtime and data bundle top-ups, bill payments, TV subscriptions, insurance, and exam PIN purchases. This project emphasizes transparency, simplicity, and reliability in all transactions.

---

## Features

- Airtime and data bundle purchases
- Utility bill payments
- TV subscriptions
- Insurance payments
- Exam PIN distribution
- Transaction history and user account management
- Modern frontend (HTML, CSS, JS, SCSS, Less)

---

## Directory Structure

- `src/`: Backend scripts (Node.js/ES Modules)
  - `server.js`: Main server entry point
  - `connector.js`: Server-client logic (handles transactions, DB, routing)
  - `setup-assets.js`: Ensures required asset directories exist
  - `client-updates.js`: (Commented reference) Client-side logic for API interaction
- `wisTemplate-SSF/`: Frontend static assets and HTML templates
  - `Airtime.html`, `index.html`, `about.html`, `setting.html`, `faq.html`: UI pages
  - `public/`, `assets/`: Static assets (CSS, images, fonts, JS)

---

## Developer Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) for dependency management (if you add packages)
- [sqlite3](https://www.sqlite.org/) (bundled as a dependency)

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/vichie34/wistopVtu.git
    cd wistopVtu
    ```

2. **Install dependencies:**

    If you add or use npm packages (such as `minimist`, `sqlite3`), run:
    ```bash
    npm install
    ```

3. **Set up asset directories:**

    Run the setup script to ensure asset directories exist:

    ```bash
    node src/setup-assets.js
    ```
    This creates folders for public CSS and uploads if missing.

4. **Prepare the SQLite database:**

    The app auto-creates a `data/transactions.sqlite` database when first run.

5. **Start the development server:**

    ```bash
    node src/server.js
    ```

    - Default port: `8000`
    - You can override paths and port:
      ```bash
      node src/server.js --server-js=wisTemplate-SSF/tst.js --html-template=wisTemplate-SSF/Airtime.html --port=8080
      ```

6. **Access the app:**

    Open your browser at [http://localhost:8000](http://localhost:8000) (or your chosen port).

---

## Backend Usage & API

- **Main server logic:** `src/server.js` uses `ServerClientConnector` (`src/connector.js`)
- **Key endpoints:**
    - `/` (GET): Serves main HTML template
    - `/process-payment` (POST): Accepts JSON `{ serviceType, amount, phoneNumber }`, validates, processes, and records the transaction

- **Database:** SQLite, with automatic migration; stores all transactions

---

## Frontend Usage

- Main UI templates are in `wisTemplate-SSF/` (edit HTML/CSS/JS as needed)
- Static assets (images, CSS, fonts) live in `wisTemplate-SSF/public/` and `wisTemplate-SSF/assets/`
- JS logic for forms and validation can be adjusted in the HTML files or in `src/client-updates.js` (for reference/porting)

---

## Extending and Customizing

- **Add new services:** Extend transaction logic in `src/connector.js`
- **Change the UI:** Edit HTML/CSS in `wisTemplate-SSF/`
- **Static assets:** Add new images/logos to `wisTemplate-SSF/assets/uploads/logo/` and CSS to `wisTemplate-SSF/public/css/`
- **Database logic:** Modify/create new tables in `src/connector.js` or `wisTemplate-SSF/tst.js`

---

## Developer Notes

- Ensure all required static files and images are present in the right directories, or use the asset setup script.
- The server expects certain directories (e.g., `wisTemplate-SSF/public/css`, `wisTemplate-SSF/assets/uploads/logo`) to exist.
- For production deployment, consider server hardening, environment variables, and HTTPS.

---

## License

This project is provided as-is. See LICENSE file if present.

---

## Credits

Thanks to all contributors and original template authors.
