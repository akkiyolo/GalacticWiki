# WikiGalaxy Project Architecture Guide

## Overview

WikiGalaxy is a web application that allows users to search for information from Wikipedia and displays it in a visually appealing cosmic-themed interface. The application has a Flask backend that integrates with the Wikipedia API and serves a frontend with a space-themed design featuring 3D animations created with Three.js.

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## System Architecture

WikiGalaxy follows a simple client-server architecture:

1. **Backend**: Python Flask application that serves as the API layer between the frontend and Wikipedia's API
2. **Frontend**: HTML, CSS, and JavaScript that creates an interactive cosmic-themed UI
3. **External API**: Wikipedia API for content retrieval

The application is designed to be lightweight and deployable with minimal configuration. It uses Gunicorn as the WSGI HTTP server to handle production deployments.

## Key Components

### Backend (Python/Flask)

- **app.py**: Core Flask application defining routes and Wikipedia API integration
- **main.py**: Entry point that runs the Flask application
- **Dependencies**: Flask, wikipediaapi (for Wikipedia integration), and gunicorn (for deployment)

The backend is responsible for:
- Serving the static frontend files
- Providing an API endpoint (`/api/search`) to search Wikipedia
- Processing and returning Wikipedia content in a consistent format

### Frontend

- **HTML Templates**: Primarily `index.html` that structures the app's UI
- **CSS**: 
  - `style.css`: Main styling for the cosmic UI elements
  - `fonts.css`: Typography definitions using Google Fonts like Orbitron and Exo 2
- **JavaScript**:
  - `main.js`: Core initialization and app management
  - `search.js`: Handles search functionality and results display
  - `three_background.js`: Creates the animated space background using Three.js
  - `ui_effects.js`: Manages UI animations and effects like glassmorphism

The frontend creates an immersive space-themed experience with:
- Animated star field background
- Glassmorphism UI effects
- Responsive design elements
- Interactive search and result display

## Data Flow

1. **User Input**: User enters a search query in the frontend form
2. **API Request**: Frontend JavaScript sends a request to the Flask backend endpoint (`/api/search`)
3. **External API Call**: Backend queries the Wikipedia API with the search term
4. **Response Processing**: Backend extracts and formats relevant information from Wikipedia's response
5. **Display Results**: Frontend receives the processed data and displays it in the cosmic-themed UI

## External Dependencies

### Backend Dependencies
- Flask: Web framework
- Wikipedia-API: For accessing Wikipedia content
- Gunicorn: WSGI HTTP Server for production deployment
- SQLAlchemy (included in requirements but not yet utilized)
- Psycopg2: PostgreSQL adapter (included but not yet utilized)

### Frontend Dependencies (CDN-loaded)
- Three.js: For 3D space background
- Bootstrap: For responsive layouts
- Font Awesome: For icons
- Google Fonts: For typography (Orbitron, Exo 2, Rajdhani)

## Deployment Strategy

The application is configured to run on Replit with:

1. **Gunicorn WSGI server**: Handles HTTP requests in a production environment
2. **Python 3.11**: Base runtime environment
3. **Dependencies**: Managed through the `pyproject.toml` file
4. **Environment**: Configured with Nix to include OpenSSL and PostgreSQL
5. **Port Configuration**: Runs on port 5000

The deployment is set up for autoscaling with:
```
deploymentTarget = "autoscale"
run = ["gunicorn", "--bind", "0.0.0.0:5000", "main:app"]
```

## Development Notes

1. **Database Integration**: The project includes SQLAlchemy and PostgreSQL dependencies but doesn't yet implement database functionality. This suggests plans for future data persistence.

2. **Authentication**: No authentication system is currently implemented, but the app includes a secret key configuration that could be used for session management in the future.

3. **Expansion Opportunities**:
   - Implement user accounts and saved searches
   - Add more interactive elements to the space background
   - Expand the API to include more Wikipedia functionality
   - Implement the database for saving user preferences or search history

4. **Known Limitations**:
   - The Wikipedia search is basic and could be enhanced with more advanced search options
   - The Three.js background might need optimization for mobile devices
   - Some UI components appear to be partially implemented (search results expansion)