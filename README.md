# 🌌 WikiGalaxy: Explore Knowledge

WikiGalaxy is a web application designed for quick and easy knowledge discovery. It provides users with instant summaries of Wikipedia articles through a clean, modern, and intuitive user interface.

---

<img width="1899" height="969" alt="image" src="https://github.com/user-attachments/assets/c6894a8e-0693-4b85-9ec3-90e0d46e8d52" />

---

## 🚀 Project Description

This project uses a **Python backend** to interface with the official `wikipedia` library, fetching article summaries based on user searches. The **HTML, CSS, and JavaScript frontend** provides a seamless user experience, allowing anyone to type in a query and get a summary without ever leaving the site. It's the perfect tool for quick lookups, research, or satisfying your curiosity.

---

## ✨ Key Features

* **Instant Summaries**: Get concise and relevant summaries of any Wikipedia article on the fly.
* **Python Backend**: A robust backend that handles the logic of fetching data from the Wikipedia API.
* **Seamless Wikipedia Integration**: Utilizes the powerful `wikipedia` library in Python for accurate results.
* **Clean & Modern UI**: A beautiful, dark-themed interface designed for a comfortable and engaging reading experience.
* **Direct Link to Source**: Includes a "Read On Wikipedia" button that takes the user directly to the full article for a deeper dive.

---

## 💻 Technology Stack

* **Frontend**:
    * **HTML**: Structures the web application.
    * **CSS**: Provides the custom styling for the dark theme and modern look.
    * **JavaScript**: Handles user input, makes API calls to the backend, and dynamically updates the page.
* **Backend**:
    * **Python**: Powers the server-side logic. (Likely using a framework like **Flask** or **FastAPI**).
    * **Wikipedia Library**: The core Python library used to connect to and fetch data from Wikipedia.

---

## 🔧 How It Works

1.  A user enters a search term into the search bar on the frontend.
2.  JavaScript captures the input and sends an API request to the Python backend.
3.  The Python server receives the request and uses the `wikipedia.summary()` function to get the article summary.
4.  The backend then sends this summary back to the frontend as a response.
5.  Finally, JavaScript receives the summary and displays it dynamically on the page for the user to read.
