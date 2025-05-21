/**
 * WikiGalaxy Search Functionality
 * Handles the search functionality and displays Wikipedia results
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const loadingAnimation = document.getElementById('loading-animation');
    const resultsSection = document.getElementById('results-section');
    const errorSection = document.getElementById('error-section');
    const resultTitle = document.getElementById('result-title');
    const resultSummary = document.getElementById('result-summary');
    const wikiLink = document.getElementById('wiki-link');
    const errorMessage = document.getElementById('error-message');
    const tryAgainBtn = document.getElementById('try-again-btn');
    const closeBtn = document.getElementById('close-btn');
    const expandBtn = document.getElementById('expand-btn');
    
    // Store the full summary for expand/collapse functionality
    let fullSummary = '';
    let shortSummary = '';
    let isExpanded = false;
    
    // Handle search form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const query = searchInput.value.trim();
        
        if (query === '') {
            showError('Please enter a search term to explore the cosmos of knowledge');
            return;
        }
        
        performSearch(query);
    });
    
    // Function to perform the search
    function performSearch(query) {
        // Hide previous results and errors, show loading
        hideResults();
        hideError();
        showLoading();
        
        // Fetch data from the Wikipedia API
        fetch(`/api/search?query=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Error fetching data from Wikipedia');
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    displayResults(data);
                } else if (data.status === 'not_found') {
                    showError(`We couldn't find any information about "${query}" in our cosmic database`);
                } else {
                    showError('An unknown anomaly occurred while exploring the knowledge universe');
                }
            })
            .catch(error => {
                console.error('Search error:', error);
                showError(error.message || 'Failed to communicate with the cosmic database');
            })
            .finally(() => {
                hideLoading();
            });
    }
    
    // Function to display search results
    function displayResults(data) {
        // Set the title and link
        resultTitle.textContent = data.title;
        wikiLink.href = data.url;
        
        // Store full and short summary
        fullSummary = data.full_summary;
        shortSummary = data.summary;
        
        // Reset to short summary view
        isExpanded = false;
        resultSummary.textContent = shortSummary;
        
        // Update expand button icon
        updateExpandButtonIcon();
        
        // Show the results section with animation
        showResults();
    }
    
    // Toggle between expanded and collapsed summary
    expandBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            resultSummary.textContent = fullSummary;
        } else {
            resultSummary.textContent = shortSummary;
        }
        
        updateExpandButtonIcon();
    });
    
    // Update the expand/collapse button icon
    function updateExpandButtonIcon() {
        if (isExpanded) {
            expandBtn.innerHTML = '<i class="fas fa-compress-alt"></i>';
            expandBtn.setAttribute('aria-label', 'Collapse');
        } else {
            expandBtn.innerHTML = '<i class="fas fa-expand-alt"></i>';
            expandBtn.setAttribute('aria-label', 'Expand');
        }
    }
    
    // Close button handler
    closeBtn.addEventListener('click', function() {
        hideResults();
    });
    
    // Try again button handler
    tryAgainBtn.addEventListener('click', function() {
        hideError();
        searchInput.focus();
    });
    
    // Utility functions for showing/hiding sections
    function showLoading() {
        loadingAnimation.classList.remove('hidden');
    }
    
    function hideLoading() {
        loadingAnimation.classList.add('hidden');
    }
    
    function showResults() {
        resultsSection.classList.remove('hidden');
        // Add animation class for entrance effect
        resultsSection.classList.add('fade-in-up');
        // Remove the animation class after it completes
        setTimeout(() => {
            resultsSection.classList.remove('fade-in-up');
        }, 500);
    }
    
    function hideResults() {
        resultsSection.classList.add('hidden');
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorSection.classList.remove('hidden');
    }
    
    function hideError() {
        errorSection.classList.add('hidden');
    }
    
    // Focus on search input on page load
    searchInput.focus();
});
