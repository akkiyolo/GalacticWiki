import os
import logging
import wikipediaapi
from flask import Flask, render_template, request, jsonify

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")

# Create Wikipedia API instance
wiki_wiki = wikipediaapi.Wikipedia(
    language='en',
    extract_format=wikipediaapi.ExtractFormat.WIKI,
    user_agent='WikiGalaxy/1.0 (contact@wikigalaxy.com)'
)

@app.route('/')
def index():
    """Render the main page of the application."""
    return render_template('index.html')

@app.route('/api/search', methods=['GET'])
def search_wikipedia():
    """
    Search Wikipedia for a given topic and return a summary.
    
    Query params:
        query: The search term to look up on Wikipedia
    
    Returns:
        JSON with title, summary, url, and status
    """
    query = request.args.get('query', '')
    
    if not query:
        return jsonify({
            'error': 'No search query provided',
            'status': 'error'
        }), 400
    
    try:
        # Search for the page
        page = wiki_wiki.page(query)
        
        if not page.exists():
            return jsonify({
                'error': f'No Wikipedia article found for "{query}"',
                'status': 'not_found'
            }), 404
        
        # Get summary (first 3 sentences or paragraphs)
        summary = page.summary[0:500]
        if len(page.summary) > 500:
            summary += "..."
        
        return jsonify({
            'title': page.title,
            'summary': summary,
            'full_summary': page.summary,
            'url': page.fullurl,
            'status': 'success'
        })
    
    except Exception as e:
        logger.error(f"Error fetching Wikipedia content: {str(e)}")
        return jsonify({
            'error': 'Error fetching Wikipedia content',
            'details': str(e),
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
