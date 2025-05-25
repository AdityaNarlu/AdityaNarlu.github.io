document.addEventListener('DOMContentLoaded', () => {
    // Geolocation functionality
    const geolocationContent = document.getElementById('geolocation-content');
    const refreshLocationBtn = document.getElementById('refreshLocation');
    
    // Function to get and display user's location
    function getUserLocation() {
        if (geolocationContent) {
            // Show loading state
            geolocationContent.innerHTML = `
                <div class="loading-message">
                    <div class="spinner"></div>
                    <span>Getting your location...</span>
                </div>
            `;
            
            // Check if geolocation is supported
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    // Success callback
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        
                        // Get location details using reverse geocoding
                        getLocationDetails(latitude, longitude);
                    },
                    // Error callback
                    (error) => {
                        let errorMessage = '';
                        
                        switch(error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage = 'Location access was denied. Please enable location services to use this feature.';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage = 'Location information is unavailable. Please try again later.';
                                break;
                            case error.TIMEOUT:
                                errorMessage = 'Location request timed out. Please try again.';
                                break;
                            default:
                                errorMessage = 'An unknown error occurred while getting your location.';
                        }
                        
                        geolocationContent.innerHTML = `
                            <div class="error-message">
                                ${errorMessage}
                            </div>
                        `;
                    },
                    // Options
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            } else {
                geolocationContent.innerHTML = `
                    <div class="error-message">
                        Geolocation is not supported by your browser. Please try a different browser.
                    </div>
                `;
            }
        }
    }
    
    // State abbreviation mapping
    const stateAbbreviations = {
        'alabama': 'AL',
        'alaska': 'AK',
        'arizona': 'AZ',
        'arkansas': 'AR',
        'california': 'CA',
        'colorado': 'CO',
        'connecticut': 'CT',
        'delaware': 'DE',
        'florida': 'FL',
        'georgia': 'GA',
        'hawaii': 'HI',
        'idaho': 'ID',
        'illinois': 'IL',
        'indiana': 'IN',
        'iowa': 'IA',
        'kansas': 'KS',
        'kentucky': 'KY',
        'louisiana': 'LA',
        'maine': 'ME',
        'maryland': 'MD',
        'massachusetts': 'MA',
        'michigan': 'MI',
        'minnesota': 'MN',
        'mississippi': 'MS',
        'missouri': 'MO',
        'montana': 'MT',
        'nebraska': 'NE',
        'nevada': 'NV',
        'new hampshire': 'NH',
        'new jersey': 'NJ',
        'new mexico': 'NM',
        'new york': 'NY',
        'north carolina': 'NC',
        'north dakota': 'ND',
        'ohio': 'OH',
        'oklahoma': 'OK',
        'oregon': 'OR',
        'pennsylvania': 'PA',
        'rhode island': 'RI',
        'south carolina': 'SC',
        'south dakota': 'SD',
        'tennessee': 'TN',
        'texas': 'TX',
        'utah': 'UT',
        'vermont': 'VT',
        'virginia': 'VA',
        'washington': 'WA',
        'west virginia': 'WV',
        'wisconsin': 'WI',
        'wyoming': 'WY',
        'district of columbia': 'DC',
        'american samoa': 'AS',
        'guam': 'GU',
        'northern mariana islands': 'MP',
        'puerto rico': 'PR',
        'united states minor outlying islands': 'UM',
        'u.s. virgin islands': 'VI',
    };
    
    // Function to get state abbreviation
    function getStateAbbreviation(stateName) {
        if (!stateName) return '';
        
        // Convert to lowercase for case-insensitive comparison
        const stateNameLower = stateName.toLowerCase();
        
        // Return the abbreviation if found, otherwise return the original state name
        return stateAbbreviations[stateNameLower] || stateName;
    }
    
    // Function to get location details using reverse geocoding
    function getLocationDetails(latitude, longitude) {
        // Use reverse geocoding API to get city and state
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`)
            .then(response => response.json())
            .then(data => {
                let state = data.address.state || 'Unknown';
                let stateAbbr = getStateAbbreviation(state);
                let city = data.address.city || data.address.town || data.address.village || 'Unknown';
                
                // Format coordinates to 6 decimal places
                const formattedLat = latitude.toFixed(6);
                const formattedLng = longitude.toFixed(6);
                
                // Display the information
                geolocationContent.innerHTML = `
                    <div class="geolocation-info">
                        <div class="info-item">
                            <span class="info-label">State:</span>
                            <span class="info-value">${state} (${stateAbbr})</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">City:</span>
                            <span class="info-value">${city}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Coordinates:</span>
                            <span class="info-value">${formattedLat}, ${formattedLng}</span>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                geolocationContent.innerHTML = `
                    <div class="error-message">
                        Unable to retrieve location details. Please try again later.
                    </div>
                `;
                console.error('Error getting location details:', error);
            });
    }
    
    // Get location when page loads
    if (geolocationContent) {
        getUserLocation();
    }
    
    // Refresh location when button is clicked
    if (refreshLocationBtn) {
        refreshLocationBtn.addEventListener('click', getUserLocation);
    }
    
    // State and UI Elements
    let currentState = '';
    let currentCategory = '';
    
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const signupLink = document.querySelector('.signup-link a');
    const stateSubmit = document.getElementById('submitState');
    const stateSelect = document.getElementById('stateSelect');
    const initialState = document.getElementById('initialState');
    const rightsCategories = document.getElementById('rightsCategories');
    const selectedStateName = document.getElementById('selectedStateName');
    const rightsContent = document.getElementById('rightsContent');
    const backToCategories = document.getElementById('backToCategories');
    const categoryCards = document.querySelectorAll('.category-card');
    const aiSearchResults = document.getElementById('aiSearchResults');
    const aiSearchInput = document.getElementById('aiSearchInput');
    const aiSearchButton = document.getElementById('aiSearchButton');
    const getAiInsightButton = document.getElementById('getAiInsightButton');
    const categoryButtons = document.querySelectorAll('.category-btn');
    // Chat functionality elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const minimizeChat = document.getElementById('minimize-chat');
    const closeChat = document.getElementById('close-chat');
    
    // OpenAI API configuration
    const OPENAI_API_KEY = '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';
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
    
    // Chat state
    const chatHistory = [{
        role: 'system',
        content: 'You are a helpful legal assistant. Provide clear, concise, and accurate legal information. If you don\'t know something, say so rather than making up information.'
    }];
    
    // Toggle chat visibility
    function toggleChat(show = true) {
        if (show) {
            chatWidget.classList.remove('hidden');
            chatToggle.style.display = 'none';
            chatInput.focus();
        } else {
            chatWidget.classList.add('hidden');
            chatToggle.style.display = 'flex';
        }
    }
    
    // Initialize chat widget state
    if (chatToggle && chatWidget) {
        // Start with chat hidden
        chatWidget.classList.add('hidden');
        chatToggle.style.display = 'flex';
        
        // Toggle chat on button click
        chatToggle.addEventListener('click', () => toggleChat(true));
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInside = chatWidget.contains(e.target) || chatToggle.contains(e.target);
            if (!isClickInside && !chatWidget.classList.contains('hidden')) {
                toggleChat(false);
            }
        });
    }
    
    // Minimize chat
    if (minimizeChat) {
        minimizeChat.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleChat(false);
        });
    }
    
    // Close chat and clear history
    if (closeChat) {
        closeChat.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Are you sure you want to close the chat? This will clear the conversation history.')) {
                chatMessages.innerHTML = '<div class="message bot-message"><div class="message-content">Hello! I\'m your legal assistant. How can I help you today?</div></div>';
                chatHistory.length = 1; // Reset to just system message
                toggleChat(false);
            }
        });
    }
    
    // Add typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<div class="message-content"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Send message to OpenAI API
    async function sendToOpenAI(message) {
        // Add user message to history
        chatHistory.push({ role: 'user', content: message });
        
        // Show typing indicator
        showTypingIndicator();
        
        // Use a local response instead of OpenAI API
        const USE_LOCAL = true;
        
        if (USE_LOCAL) {
            // Simulate network delay for a natural feel
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Generate response based on message content
            let aiResponse = '';
            
            // Extract state codes and legal categories from message
            const messageLC = message.toLowerCase();
            const stateMatches = [];
            const categoryMatches = [];
            
            // Check for state mentions - only use full state names
            const stateNames = {
                'alaska': 'AK', 'alabama': 'AL', 'arkansas': 'AR', 'arizona': 'AZ', 'california': 'CA',
                'colorado': 'CO', 'connecticut': 'CT', 'district of columbia': 'DC', 'delaware': 'DE', 'florida': 'FL',
                'georgia': 'GA', 'hawaii': 'HI', 'iowa': 'IA', 'idaho': 'ID', 'illinois': 'IL',
                'indiana': 'IN', 'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'massachusetts': 'MA',
                'maryland': 'MD', 'maine': 'ME', 'michigan': 'MI', 'minnesota': 'MN', 'missouri': 'MO',
                'mississippi': 'MS', 'montana': 'MT', 'north carolina': 'NC', 'north dakota': 'ND', 'nebraska': 'NE',
                'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'nevada': 'NV', 'new york': 'NY',
                'ohio': 'OH', 'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI',
                'south carolina': 'SC', 'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
                'virginia': 'VA', 'vermont': 'VT', 'washington': 'WA', 'wisconsin': 'WI', 'west virginia': 'WV',
                'wyoming': 'WY'
            };
            
            // Skip checking for state abbreviations
            
            // Then check for state names
            for (const [stateName, stateCode] of Object.entries(stateNames)) {
                if (messageLC.includes(stateName)) {
                    if (!stateMatches.includes(stateCode)) {
                        stateMatches.push(stateCode);
                    }
                }
            }
            
            // Check for categories
            const categories = ['employment', 'housing', 'criminal', 'family', 'consumer', 'general'];
            const categoryKeywords = {
                'employment': ['job', 'work', 'employ', 'wage', 'salary', 'fired', 'termination', 'workplace', 'overtime', 'minimum wage'],
                'housing': ['rent', 'lease', 'evict', 'landlord', 'tenant', 'apartment', 'house', 'security deposit', 'property', 'renter'],
                'criminal': ['arrest', 'crime', 'jail', 'police', 'charge', 'offense', 'dui', 'drug', 'assault', 'criminal'],
                'family': ['divorce', 'custody', 'child support', 'alimony', 'marriage', 'spouse', 'family', 'domestic violence'],
                'consumer': ['consumer', 'purchase', 'buy', 'refund', 'warranty', 'product', 'false advertising', 'scam', 'fraud'],
                'general': ['general', 'overview', 'basic', 'rights']
            };
            
            // Check for direct category mentions
            for (const category of categories) {
                if (messageLC.includes(category)) {
                    categoryMatches.push(category);
                } else {
                    // Check for category keywords
                    const keywords = categoryKeywords[category];
                    for (const keyword of keywords) {
                        if (messageLC.includes(keyword)) {
                            if (!categoryMatches.includes(category)) {
                                categoryMatches.push(category);
                            }
                            break;
                        }
                    }
                }
            }
            
            // If we have both state and category matches, use state-specific info
            if (stateMatches.length > 0 && categoryMatches.length > 0) {
                // Use the first state and first category match
                const stateCode = stateMatches[0];
                const category = categoryMatches[0];
                
                if (allStatesLawData[stateCode] && allStatesLawData[stateCode][category]) {
                    // Extract text content from HTML
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = allStatesLawData[stateCode][category];
                    const textContent = tempDiv.textContent || tempDiv.innerText || '';
                    
                    aiResponse = `Based on your question about ${category} law in ${stateCode}, here's what I can tell you:\n\n${textContent.trim()}\n\nPlease note this is general information and not specific legal advice.`;
                }
            }
            
            // General legal topics if no state-specific match
            if (!aiResponse) {
                const legalTopics = {
                    'rights': 'Your rights depend on your jurisdiction, but generally include the right to due process, equal protection under the law, and freedom from unreasonable searches and seizures.',
                    'lawyer': 'If you need a lawyer, you can contact your local bar association for referrals, use legal aid services if you qualify, or search online directories like Avvo or FindLaw.',
                    'arrest': 'If arrested, you have the right to remain silent, the right to an attorney, and the right to refuse searches without a warrant in most cases. Always ask for an attorney before answering questions.',
                    'eviction': 'Eviction laws vary by state, but landlords generally must provide proper notice and go through a court process. Many states have protections against retaliatory evictions.',
                    'contract': 'Contracts require offer, acceptance, consideration, and legal purpose to be valid. If you need to break a contract, look for breach by the other party or consult with an attorney about your options.'
                };
                
                // Check for general legal topics
                let topicMatches = [];
                for (const topic in legalTopics) {
                    if (messageLC.includes(topic)) {
                        topicMatches.push(legalTopics[topic]);
                    }
                }
                
                if (topicMatches.length > 0) {
                    aiResponse = topicMatches.join(' ');
                }
            }
            
            // Default response if no matches
            if (!aiResponse) {
                if (stateMatches.length > 0) {
                    aiResponse = `I have information about ${stateMatches[0]} law in various categories including employment, housing, criminal, family, and consumer law. Could you specify which legal area you're interested in?`;
                } else if (categoryMatches.length > 0) {
                    aiResponse = `I have information about ${categoryMatches[0]} law for various states. Could you specify which state you're interested in?`;
                } else {
                    aiResponse = 'I can provide legal information for specific states in categories like employment, housing, criminal, family, and consumer law. Please specify a state and category in your question.';
                }
            }
            
            // Add mock response to history
            chatHistory.push({ role: 'assistant', content: aiResponse });
            
            // Remove typing indicator and show response
            removeTypingIndicator();
            addMessage(aiResponse, false);
            
            return aiResponse;
        }
        
        // Actual API implementation (when USE_MOCK is false)
        try {
            console.log('Sending request to OpenAI...');
            
            // Handle CORS issues with mode: 'cors'
            const response = await fetch(OPENAI_API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: chatHistory,
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API error details:', errorText);
                throw new Error(`API request failed with status ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('Response received:', data);
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API');
            }
            
            const aiResponse = data.choices[0].message.content;
            
            // Add AI response to history
            chatHistory.push({ role: 'assistant', content: aiResponse });
            
            // Remove typing indicator and show response
            removeTypingIndicator();
            addMessage(aiResponse, false);
            
            return aiResponse;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            removeTypingIndicator();
            addMessage(`Sorry, I encountered an error: ${error.message}. Please try again later.`, false);
            return null;
        }
    }
    
    // Add message to chat
    function addMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Handle send message
    async function handleSendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Clear input
        chatInput.value = '';
        
        // Add user message to chat
        addMessage(message, true);
        
        // Disable input while waiting for response
        chatInput.disabled = true;
        if (sendButton) sendButton.disabled = true;
        
        try {
            // Send to OpenAI and get response
            await sendToOpenAI(message);
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, something went wrong. Please try again.', false);
        } finally {
            // Re-enable input
            chatInput.disabled = false;
            if (sendButton) sendButton.disabled = false;
            chatInput.focus();
        }
    }
    
    // Event listeners for sending messages
    if (sendButton) {
        sendButton.addEventListener('click', handleSendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }

    // Show categories view when state is selected
    if (stateSubmit) {
        stateSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedState = stateSelect.value;
            
            if (!selectedState) {
                alert('Please select a state first');
                return;
            }
            
            currentState = selectedState;
            const stateFullName = stateSelect.options[stateSelect.selectedIndex].text;
            selectedStateName.textContent = stateFullName;
            
            // Show categories view
            initialState.style.display = 'none';
            rightsCategories.style.display = 'block';
            rightsContent.style.display = 'none';
        });
    }
    
    // Handle category selection
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            currentCategory = category;
            showCategoryContent(category);
        });
    });
    
    // Back to categories button
    if (backToCategories) {
        backToCategories.addEventListener('click', () => {
            rightsContent.style.display = 'none';
            document.querySelector('.category-grid').style.display = 'grid';
            backToCategories.style.display = 'none';
        });
    }
    
    // Function to show content for selected category
    function showCategoryContent(category) {
        if (!currentState) return;
        
        const stateData = allStatesLawData[currentState];
        if (!stateData || !stateData[category]) {
            rightsContent.innerHTML = `<p>No information available for this category in the selected state.</p>`;
        } else {
            rightsContent.innerHTML = stateData[category];
        }
        
        // Show content and hide categories
        document.querySelector('.category-grid').style.display = 'none';
        rightsContent.style.display = 'block';
        backToCategories.style.display = 'block';
        
        // Scroll to top of content
        rightsContent.scrollIntoView({ behavior: 'smooth' });
    }

    // Login form submission handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            console.log('Form submitted'); // Debug log
            e.preventDefault(); // Prevent default form submission
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // For now, just log the values and redirect
            console.log('Email:', email);
            console.log('Password:', password);
            
            // Immediately redirect to dashboard
            window.location.href = 'dashboard.html';
            
            // Prevent any further execution
            return false;
        });
        
        console.log('Login form handler attached'); // Debug log
    }

    const allStatesLawData = {
        'AK': { 
            employment: `
                <h3>Employment Law in Alaska</h3>
                <p>In Alaska, employment is generally 'at-will,' meaning employers can terminate employees for any reason not violating state or federal law, such as discrimination (based on race, religion, color, national origin, age, physical or mental disability, sex, marital status, changes in marital status, pregnancy, or parenthood) or retaliation.</p>
                <strong>Key points:</strong>
                <ul>
                    <li><strong>Minimum Wage:</strong> Alaska has its own minimum wage, which is adjusted annually. Always check the current rate with the Alaska Department of Labor and Workforce Development.</li>
                    <li><strong>Overtime:</strong> Overtime pay (1.5 times the regular rate) is generally required for most employees working over 8 hours a day or 40 hours a week.</li>
                    <li><strong>Workplace Safety:</strong> The Alaska Occupational Safety and Health (AKOSH) program enforces workplace safety standards.</li>
                    <li><strong>Anti-Discrimination:</strong> Strong protections exist against discrimination in employment.</li>
                    <li><strong>Union Membership:</strong> Alaska is not a 'right-to-work' state, so union membership or fee payment can be a condition of employment under a collective bargaining agreement.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Alaska</h3>
                <p>Alaska's housing rights for residential properties are primarily governed by the Uniform Residential Landlord and Tenant Act (URLTA).</p>
                <strong>Key points:</strong>
                <ul>
                    <li><strong>Habitability:</strong> Landlords must provide and maintain habitable living conditions, including essential services like heat, water, and electricity, and make necessary repairs.</li>
                    <li><strong>Lease Agreements:</strong> Written lease agreements are highly recommended and outline the terms of the tenancy.</li>
                    <li><strong>Security Deposits:</strong> Typically limited to two months' rent (unless rent exceeds $2,000/month). Landlords must return the deposit within 14 days of lease termination if the tenant provided proper notice and vacated, or 30 days if not. Deductions must be itemized.</li>
                    <li><strong>Eviction:</strong> Landlords must follow specific legal procedures for eviction, including providing proper written notice (e.g., 7 days for non-payment of rent, 10 days for other lease violations). Self-help evictions are illegal.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Alaska</h3>
                <p>If you are accused of a crime in Alaska, you have certain constitutional rights. Crimes are generally classified as felonies (more serious), misdemeanors (less serious), or violations.</p>
                <strong>Key points:</strong>
                <ul>
                    <li><strong>Rights of the Accused:</strong> These include the right to remain silent, the right to an attorney (one will be appointed if you cannot afford one for jailable offenses), and the right to a fair trial by jury for most offenses.</li>
                    <li><strong>DUI (Driving Under the Influence):</strong> Alaska has strict laws and penalties for DUI, which can include jail time, fines, license suspension, and mandatory alcohol education/treatment.</li>
                    <li><strong>Drug Offenses:</strong> Penalties for drug offenses vary widely based on the type and quantity of the controlled substance, and whether there was intent to distribute.</li>
                    <li><strong>Assault & Domestic Violence:</strong> These are serious offenses with significant consequences. Protective orders are available for victims of domestic violence.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Alaska</h3>
                <p>Family law in Alaska addresses issues related to marriage, divorce, child custody, and support.</p>
                <strong>Key points:</strong>
                <ul>
                    <li><strong>Divorce (Dissolution of Marriage):</strong> Alaska is a no-fault divorce state, meaning you don't have to prove wrongdoing. The primary ground is that the marriage has broken down and is irretrievably lost.</li>
                    <li><strong>Property Division:</strong> Alaska follows the principle of 'equitable distribution' for marital property, meaning it's divided fairly, though not necessarily 50/50.</li>
                    <li><strong>Child Custody & Support:</strong> Custody decisions are made based on the 'best interests of the child.' Child support is calculated using a formula based on parental income and time spent with the child.</li>
                    <li><strong>Spousal Support (Alimony):</strong> May be awarded based on factors like the length of the marriage, each spouse's financial situation, and earning capacity.</li>
                    <li><strong>Domestic Violence Protective Orders:</strong> Available to protect individuals from abuse by family or household members.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Alaska</h3>
                <p>Alaska's Unfair Trade Practices and Consumer Protection Act aims to protect consumers from deceptive and unfair business practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li><strong>Deceptive Practices:</strong> Businesses cannot mislead consumers through false advertising, misrepresentations, or other unfair tactics.</li>
                    <li><strong>Defective Products (Warranties):</strong> Consumers may have rights under express or implied warranties if a product is defective.</li>
                    <li><strong>Scams and Fraud:</strong> Be cautious of common scams. You can report suspected fraud to the Alaska Department of Law, Consumer Protection Unit.</li>
                    <li><strong>Debt Collection:</strong> Debt collectors must follow state and federal laws and cannot use abusive, deceptive, or unfair practices.</li>
                    <li><strong>Lemon Law:</strong> Alaska has a 'Lemon Law' that provides remedies for consumers who purchase new vehicles with significant defects that cannot be repaired after a reasonable number of attempts.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Alaska</h3>
                <p>Alaska has a unique and comprehensive set of laws. The information provided here covers common categories such as Employment, Housing, Criminal, Family, and Consumer rights. Please use the search or category buttons to explore these topics for Alaska.</p>
                <p><em>This information is for general guidance and does not constitute legal advice. Consult with a qualified attorney for advice specific to your situation.</em></p>
            `
        },
        'AL': { 
            employment: `
                <h3>Employment Law in Alabama</h3>
                <p>Alabama is a 'right-to-work' state. Employment is generally 'at-will.' State minimum wage may align with federal if no separate state law dictates higher.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Discrimination based on protected classes is illegal.</li>
                    <li>Workers' compensation laws cover workplace injuries.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Alabama</h3>
                <p>Governed by the Alabama Uniform Residential Landlord and Tenant Act.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlords must provide habitable premises.</li>
                    <li>Specific procedures for eviction must be followed.</li>
                    <li>Security deposit rules apply.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Alabama</h3>
                <p>Alabama has reformed some aspects of its criminal justice system, including cash bail. Cannabis is legal for adult use.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Sentencing guidelines and corrections system.</li>
                    <li>Expungement and sealing of records available for some offenses.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Alabama</h3>
                <p>Covers divorce, child custody, child support, and alimony.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Child custody based on 'best interests of the child.'</li>
                    <li>Equitable distribution of marital property in divorce.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Alabama</h3>
                <p>The Alabama Deceptive Trade Practices Act protects consumers from deceptive or unfair acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Prohibits unfair methods of competition and deceptive acts.</li>
                    <li>Lemon Law for new vehicles.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Alabama</h3>
                <p>Alabama laws cover various aspects of daily life. This guide provides basic information on common legal categories. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'AZ': { 
            employment: `
                <h3>Employment Law in Arizona</h3>
                <p>Arizona is an 'at-will' employment state. Arizona has its own minimum wage, often higher than federal, and mandates earned paid sick time.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Protections against workplace discrimination.</li>
                    <li>Arizona's Fair Wages and Healthy Families Act.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Arizona</h3>
                <p>Regulated by the Arizona Residential Landlord and Tenant Act (ARLTA).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord obligations for repairs and habitability.</li>
                    <li>Tenant rights and responsibilities.</li>
                    <li>Specific eviction processes.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Arizona</h3>
                <p>Includes strict laws for DUI and drug offenses. Classification of crimes and sentencing guidelines are specific to Arizona.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Right to counsel and due process.</li>
                    <li>Victims' rights are also protected.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Arizona</h3>
                <p>Arizona is a community property state for divorce, meaning assets acquired during marriage are generally divided equally.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Child custody decisions prioritize the child's best interests.</li>
                    <li>Child support calculations based on state guidelines.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Arizona</h3>
                <p>The Arizona Consumer Fraud Act protects against deceptive practices in sales and advertising.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Prohibits misrepresentation and unfair business acts.</li>
                    <li>Consumers can file complaints with the Attorney General.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Arizona</h3>
                <p>Arizona laws address a wide range of issues. Explore categories for basic information. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'AR': { 
            employment: `
                <h3>Employment Law in Arkansas</h3>
                <p>Arkansas is a 'right-to-work' state. Employment is generally 'at-will.' Arkansas has its own minimum wage rate.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Laws against workplace discrimination and harassment.</li>
                    <li>Workers' compensation for on-the-job injuries.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Arkansas</h3>
                <p>Landlord-tenant relationships are governed by state statutes. Some aspects may be considered more landlord-friendly compared to other states.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lease agreements define terms.</li>
                    <li>Specific notice requirements for eviction.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Arkansas</h3>
                <p>Arkansas law defines various offenses and their classifications (felony, misdemeanor). Sentencing is guided by state statutes.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Accused individuals have constitutional rights.</li>
                    <li>Parole and probation systems are in place.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Arkansas</h3>
                <p>Covers divorce, annulment, child custody and visitation, child support, and spousal support.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard for custody.</li>
                    <li>Division of marital property upon divorce.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Arkansas</h3>
                <p>The Arkansas Deceptive Trade Practices Act protects consumers from fraudulent or misleading business conduct.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Prohibits a wide range of deceptive acts.</li>
                    <li>Consumers have rights to pursue remedies.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Arkansas</h3>
                <p>Arkansas has a comprehensive legal framework. This guide offers a starting point for common legal topics. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'CA': { 
            employment: `
                <h3>Employment Law in California</h3>
                <p>California has extensive employment laws, including specific wage and hour rules, meal/rest breaks, and strong anti-discrimination protections.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>California minimum wage is often higher than federal.</li>
                    <li>Paid sick leave is mandated.</li>
                    <li>FEHA provides broad anti-discrimination coverage.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in California</h3>
                <p>Complex landlord-tenant laws, including rent control in some cities and statewide tenant protection acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Implied warranty of habitability.</li>
                    <li>Strict rules for security deposits and evictions.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in California</h3>
                <p>Wide range of criminal offenses. Proposition 47 and 57 have impacted sentencing and parole.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Three-strikes law.</li>
                    <li>Emphasis on rehabilitation for some offenses.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in California</h3>
                <p>California is a community property state. No-fault divorce.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Child custody based on child's best interest.</li>
                    <li>Statutory guidelines for child and spousal support.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in California</h3>
                <p>Strong consumer protection laws, including the Consumer Legal Remedies Act (CLRA) and the California Consumer Privacy Act (CCPA).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Protection against unfair business practices.</li>
                    <li>Data privacy rights.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in California</h3>
                <p>California's legal landscape is vast. This guide provides a basic overview. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'CO': { 
            employment: `
                <h3>Employment Law in Colorado</h3>
                <p>Colorado is an 'at-will' employment state. Has its own minimum wage and paid sick leave laws (Healthy Families and Workplaces Act).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Protections against discrimination.</li>
                    <li>Wage theft laws.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Colorado</h3>
                <p>Warranty of habitability applies. Specific rules for security deposits and eviction procedures.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Notice requirements for rent increases and lease termination.</li>
                    <li>Protection for victims of domestic violence.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Colorado</h3>
                <p>Legalized recreational marijuana. Focus on drug treatment for some offenses.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Sentencing guidelines and parole system.</li>
                    <li>Rights of the accused are protected.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Colorado</h3>
                <p>Allocation of parental responsibilities (custody). Equitable distribution of marital property.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Child support calculated by formula.</li>
                    <li>Mediation often encouraged in disputes.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Colorado</h3>
                <p>The Colorado Consumer Protection Act prohibits unfair or deceptive trade practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Protection against fraud and misrepresentation.</li>
                    <li>Lemon Law for new vehicles.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Colorado</h3>
                <p>Colorado laws cover many areas. Use this as a starting point. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'CT': { 
            employment: `
                <h3>Employment Law in Connecticut</h3>
                <p>Connecticut has laws on minimum wage, overtime, paid sick leave, and family and medical leave (CT FMLA).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Strong anti-discrimination and anti-harassment laws.</li>
                    <li>Rules regarding personnel files.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Connecticut</h3>
                <p>Landlord-tenant laws cover lease agreements, security deposits, and eviction processes.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to maintain fit and habitable premises.</li>
                    <li>Tenant's rights to privacy.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Connecticut</h3>
                <p>Classification of crimes (felonies, misdemeanors, violations). Specific procedures for arrest and trial.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Focus on juvenile justice reform.</li>
                    <li>Programs for diversion and rehabilitation.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Connecticut</h3>
                <p>Covers divorce, child custody, support, and property division. 'Best interests of the child' is paramount in custody cases.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Alimony considerations.</li>
                    <li>Parental education programs often required in custody cases.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Connecticut</h3>
                <p>The Connecticut Unfair Trade Practices Act (CUTPA) protects consumers from unfair or deceptive acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new and used cars.</li>
                    <li>Data breach notification laws.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Connecticut</h3>
                <p>Connecticut has a robust legal system. This guide offers basic insights. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'DE': { 
            employment: `
                <h3>Employment Law in Delaware</h3>
                <p>Delaware has laws on minimum wage, wage payment, and child labor. It is an 'at-will' state.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Discrimination protections.</li>
                    <li>Workers' compensation system.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Delaware</h3>
                <p>The Delaware Residential Landlord-Tenant Code governs most rental agreements.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to supply possession and maintain premises.</li>
                    <li>Tenant remedies for landlord noncompliance.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Delaware</h3>
                <p>Delaware is known for its Court of Chancery (business law) but also has a full criminal justice system.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Sentencing guidelines and various levels of offenses.</li>
                    <li>Victims' rights.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Delaware</h3>
                <p>Delaware's family court handles divorce, custody, support, and other domestic matters.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Equitable distribution of marital property.</li>
                    <li>Child support based on a formula (Melson Formula).</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Delaware</h3>
                <p>Delaware's Consumer Fraud Act protects against deceptive business practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Prohibits misrepresentation in sales.</li>
                    <li>Specific rules for certain industries (e.g., auto repair).</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Delaware</h3>
                <p>Delaware has specific laws for its residents and businesses. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'FL': { 
            employment: `
                <h3>Employment Law in Florida</h3>
                <p>Florida is an 'at-will' employment state. It does not have a state law requiring paid sick leave beyond federal FMLA where applicable.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Florida Minimum Wage Act.</li>
                    <li>Strong 'right-to-work' provisions.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Florida</h3>
                <p>The Florida Residential Landlord and Tenant Act governs rental relationships.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Specific notice periods for termination and eviction.</li>
                    <li>Rules for handling security deposits.</li>
                    <li>Homestead exemption.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Florida</h3>
                <p>Known for its 'Stand Your Ground' law. Strict penalties for many offenses.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Mandatory minimum sentences for certain crimes.</li>
                    <li>Extensive public records laws.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Florida</h3>
                <p>No-fault divorce. Emphasis on shared parental responsibility.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Equitable distribution of marital assets and liabilities.</li>
                    <li>Child support guidelines based on income shares model.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Florida</h3>
                <p>The Florida Deceptive and Unfair Trade Practices Act (FDUTPA) protects consumers.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Protection against telemarketing fraud.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Florida</h3>
                <p>Florida's laws are diverse. This is a general guide. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'GA': { 
            employment: `
                <h3>Employment Law in Georgia</h3>
                <p>Georgia is an 'at-will' and 'right-to-work' state. Minimum wage generally follows federal.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Laws against discrimination.</li>
                    <li>Workers' compensation for job-related injuries.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Georgia</h3>
                <p>Landlord-tenant laws cover lease agreements, security deposits, and dispossessory (eviction) proceedings.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to keep premises in repair.</li>
                    <li>Specific procedures for handling abandoned property.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Georgia</h3>
                <p>Georgia has a detailed criminal code with various felony and misdemeanor offenses.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Sentencing options include probation and incarceration.</li>
                    <li>First offender treatment may be available.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Georgia</h3>
                <p>Covers divorce, child custody, child support, and property division.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard for custody.</li>
                    <li>Equitable division of marital property.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Georgia</h3>
                <p>The Georgia Fair Business Practices Act (FBPA) protects consumers from deceptive or unfair acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new motor vehicles.</li>
                    <li>Office of Consumer Protection handles complaints.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Georgia</h3>
                <p>Georgia has a comprehensive set of laws. Use this guide as a starting point. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'HI': { 
            employment: `
                <h3>Employment Law in Hawaii</h3>
                <p>Hawaii has laws on minimum wage, overtime, temporary disability insurance, and prepaid health care.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Strong protections against discrimination and harassment.</li>
                    <li>Family leave law.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Hawaii</h3>
                <p>The Residential Landlord-Tenant Code governs rental agreements. High cost of living impacts housing.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to maintain habitable conditions.</li>
                    <li>Rules for security deposits and rent increases.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Hawaii</h3>
                <p>Hawaii's criminal justice system addresses offenses ranging from petty misdemeanors to felonies.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Emphasis on restorative justice in some cases.</li>
                    <li>Specific laws related to cultural resources.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Hawaii</h3>
                <p>Covers divorce, child custody (legal and physical), child support, and spousal support.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard for custody.</li>
                    <li>Hawaii is an equitable distribution state.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Hawaii</h3>
                <p>Hawaii's Uniform Deceptive Trade Practice Act and other laws protect consumers.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Protection against unfair or deceptive business practices.</li>
                    <li>Office of Consumer Protection provides resources.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Hawaii</h3>
                <p>Hawaii has unique laws reflecting its culture and environment. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'ID': { 
            employment: `
                <h3>Employment Law in Idaho</h3>
                <p>Idaho is an 'at-will' employment and 'right-to-work' state. Minimum wage often aligns with federal.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Laws against discrimination.</li>
                    <li>Workers' compensation system.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Idaho</h3>
                <p>Landlord-tenant laws cover lease agreements, security deposits, and eviction processes.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to maintain safe and healthy premises.</li>
                    <li>Specific notice periods for lease termination.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Idaho</h3>
                <p>Idaho's criminal code defines various offenses. Sentencing can include fines, probation, and imprisonment.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Rights of the accused are protected.</li>
                    <li>Drug courts and diversion programs may be available.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Idaho</h3>
                <p>Idaho is a community property state. Covers divorce, child custody, support, and adoption.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard in custody.</li>
                    <li>Child support calculated based on income shares model.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Idaho</h3>
                <p>The Idaho Consumer Protection Act prohibits unfair or deceptive trade practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Protection against false advertising and scams.</li>
                    <li>Lemon Law for new vehicles.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Idaho</h3>
                <p>Idaho laws address various aspects of life. This guide provides basic information. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'IL': { 
            employment: `
                <h3>Employment Law in Illinois</h3>
                <p>Illinois has comprehensive employment laws, including minimum wage, overtime, paid leave (for Chicago/Cook County, and statewide sick leave), and anti-discrimination statutes.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Illinois Human Rights Act.</li>
                    <li>Wage Payment and Collection Act.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Illinois</h3>
                <p>Landlord-tenant laws vary, with specific ordinances in cities like Chicago (RLTO). Statewide laws cover habitability and eviction.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Security deposit rules.</li>
                    <li>Protection against retaliatory eviction.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Illinois</h3>
                <p>Illinois has reformed some aspects of its criminal justice system, including cash bail. Cannabis is legal for adult use.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Sentencing and corrections system.</li>
                    <li>Expungement and sealing of records available for some offenses.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Illinois</h3>
                <p>Covers dissolution of marriage (divorce), allocation of parental responsibilities, child support, and maintenance (alimony).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Equitable distribution of marital property.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Illinois</h3>
                <p>The Illinois Consumer Fraud and Deceptive Business Practices Act protects consumers.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Prohibits unfair methods of competition and deceptive acts.</li>
                    <li>Lemon Law for new vehicles.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Illinois</h3>
                <p>Illinois has a complex legal system. This guide offers a starting point. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'IN': { 
            employment: `
                <h3>Employment Law in Indiana</h3>
                <p>Indiana is an 'at-will' employment and 'right-to-work' state. Minimum wage generally follows federal.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Laws against workplace discrimination.</li>
                    <li>Youth employment laws.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Indiana</h3>
                <p>Landlord-tenant laws cover lease agreements, security deposits, and eviction procedures.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to provide safe and habitable housing.</li>
                    <li>Tenant's responsibilities for maintaining the property.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Indiana</h3>
                <p>Indiana's criminal code classifies offenses and sets sentencing guidelines.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Rights of defendants are protected.</li>
                    <li>Problem-solving courts (e.g., drug court, veterans court).</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Indiana</h3>
                <p>Covers divorce, child custody, parenting time, child support, and spousal support (alimony).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Presumption of joint legal custody in some cases.</li>
                    <li>Child support guidelines based on parents' income.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Indiana</h3>
                <p>The Indiana Deceptive Consumer Sales Act protects consumers from unfair or deceptive acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Prohibits misrepresentation in consumer transactions.</li>
                    <li>Lemon Law for new vehicles.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Indiana</h3>
                <p>Indiana laws govern many aspects of life. This is a basic guide. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'IA': { 
            employment: `
                <h3>Employment Law in Iowa</h3>
                <p>Iowa is an 'at-will' employment state. Has its own minimum wage and laws against discrimination.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Iowa Civil Rights Act.</li>
                    <li>Wage payment collection laws.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Iowa</h3>
                <p>The Uniform Residential Landlord and Tenant Law applies in Iowa.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord duties include maintaining fit premises.</li>
                    <li>Tenant duties include keeping the unit clean and safe.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Iowa</h3>
                <p>Iowa's criminal code defines offenses and penalties. Focus on rehabilitation for some offenders.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Restorative justice practices.</li>
                    <li>Rights of crime victims.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Iowa</h3>
                <p>Covers dissolution of marriage, child custody and support, and property division.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Emphasis on child's best interests.</li>
                    <li>Mediation is often encouraged.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Iowa</h3>
                <p>The Iowa Consumer Fraud Act protects against unfair or deceptive practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Prohibits misrepresentation and unconscionable practices.</li>
                    <li>Office of the Attorney General handles complaints.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Iowa</h3>
                <p>Iowa has a comprehensive set of laws. This guide provides basic information. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'KS': { 
            employment: `
                <h3>Employment Law in Kansas</h3>
                <p>Kansas is an 'at-will' employment state. Minimum wage aligns with federal. 'Right-to-work' provisions.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Kansas Act Against Discrimination.</li>
                    <li>Workers' compensation laws.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Kansas</h3>
                <p>The Kansas Residential Landlord and Tenant Act governs rental agreements.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to maintain habitable premises.</li>
                    <li>Rules for security deposits and eviction.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Kansas</h3>
                <p>Kansas sentencing guidelines are based on a grid system for felonies.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Expungement of certain criminal records is possible.</li>
                    <li>Specialty courts for specific issues.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Kansas</h3>
                <p>Covers divorce, child custody (legal custody, residency, parenting time), child support, and spousal maintenance.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Child's best interests are paramount.</li>
                    <li>Property divided equitably.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Kansas</h3>
                <p>The Kansas Consumer Protection Act prohibits deceptive and unconscionable acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Protection against identity theft.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Kansas</h3>
                <p>Kansas laws cover a wide range of topics. This is a general overview. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'KY': { 
            employment: `
                <h3>Employment Law in Kentucky</h3>
                <p>Kentucky is an 'at-will' state. Has its own minimum wage and laws against discrimination. 'Right-to-work' state.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Kentucky Civil Rights Act.</li>
                    <li>Wage and hour laws.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Kentucky</h3>
                <p>The Uniform Residential Landlord and Tenant Act applies in many areas of Kentucky.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to maintain fit premises.</li>
                    <li>Rules for security deposits and evictions.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Kentucky</h3>
                <p>Kentucky's penal code defines crimes and penalties. Recent reforms in areas like felony expungement.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Rights of defendants are protected.</li>
                    <li>Drug court and mental health court programs.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Kentucky</h3>
                <p>Covers divorce, child custody, child support, and division of marital property.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Maintenance (alimony) may be awarded.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Kentucky</h3>
                <p>The Kentucky Consumer Protection Act prohibits unfair, false, misleading, or deceptive acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new cars.</li>
                    <li>Attorney General's office handles consumer complaints.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Kentucky</h3>
                <p>Kentucky has a comprehensive legal system. This guide provides basic information. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'LA': { 
            employment: `
                <h3>Employment Law in Louisiana</h3>
                <p>Louisiana is an 'at-will' employment state. 'Right-to-work' state. Minimum wage aligns with federal.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Louisiana Employment Discrimination Law.</li>
                    <li>Workers' compensation.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Louisiana</h3>
                <p>Louisiana's civil law system influences landlord-tenant relations. Specific lease and eviction rules.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Warranty against vices and defects.</li>
                    <li>Rules for security deposits (may be called 'damage deposits').</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Louisiana</h3>
                <p>Louisiana has a unique civil law tradition. Its criminal justice system includes specific codes and procedures. Known for high incarceration rates.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Non-unanimous jury verdicts for felonies recently changed.</li>
                    <li>Extensive use of habitual offender laws.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Louisiana</h3>
                <p>Community property state. Covers divorce, child custody, child support, and spousal support (alimony).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Child support guidelines based on income shares.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Louisiana</h3>
                <p>The Louisiana Unfair Trade Practices and Consumer Protection Law prohibits deceptive acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Protection against credit repair scams.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Louisiana</h3>
                <p>Louisiana's unique legal system (civil law based) means many laws differ from other states. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'ME': { 
            employment: `
                <h3>Employment Law in Maine</h3>
                <p>Maine has laws on minimum wage, overtime, earned paid leave, and family medical leave.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Maine Human Rights Act.</li>
                    <li>Whistleblower protections.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Maine</h3>
                <p>Landlord-tenant laws cover leases, security deposits, and eviction (Forcible Entry and Detainer).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Implied warranty of habitability.</li>
                    <li>Strict rules for handling security deposits.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Maine</h3>
                <p>Maine's criminal code defines offenses and penalties. Focus on restorative justice for some offenses.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Rights of the accused.</li>
                    <li>Deferred disposition and diversion programs.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Maine</h3>
                <p>Covers divorce, parental rights and responsibilities (custody), child support, and spousal support.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Equitable distribution of marital property.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Maine</h3>
                <p>The Maine Unfair Trade Practices Act prohibits unfair or deceptive acts in commerce.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new and used vehicles.</li>
                    <li>Strong protections for home construction contracts.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Maine</h3>
                <p>Maine has a comprehensive set of laws. This guide provides basic information. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'MD': { 
            employment: `
                <h3>Employment Law in Maryland</h3>
                <p>Maryland has laws on minimum wage, overtime, paid sick and safe leave, and anti-discrimination.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Maryland Fair Employment Practices Act.</li>
                    <li>Wage payment and collection laws.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Maryland</h3>
                <p>Landlord-tenant laws cover lease agreements, security deposits, and eviction procedures. Some local jurisdictions have additional rules.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Implied warranty of habitability.</li>
                    <li>Rent escrow provisions.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Maryland</h3>
                <p>Maryland's criminal justice system includes various offenses and sentencing guidelines. Recent reforms in bail and juvenile justice.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Expungement of certain criminal records.</li>
                    <li>Drug courts and mental health courts.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Maryland</h3>
                <p>Covers divorce, child custody and access, child support, and alimony. Marital property is divided equitably.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Parenting plans are often required.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Maryland</h3>
                <p>The Maryland Consumer Protection Act prohibits unfair or deceptive trade practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Protection against home improvement fraud.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Maryland</h3>
                <p>Maryland has a robust legal system. This guide offers basic insights. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'MA': { 
            employment: `
                <h3>Employment Law in Massachusetts</h3>
                <p>Massachusetts has strong worker protections, including minimum wage, paid sick leave, paid family and medical leave (PFML), and strong anti-discrimination laws.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Massachusetts Fair Employment Practices Act (Chapter 151B).</li>
                    <li>Strict rules on independent contractors.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Massachusetts</h3>
                <p>Comprehensive landlord-tenant laws, including 'just cause' eviction in some contexts and rent control historically (though currently restricted statewide).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>State Sanitary Code sets minimum housing standards.</li>
                    <li>Strict rules for security deposits and last month's rent.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Massachusetts</h3>
                <p>Massachusetts has a detailed criminal code. Recent criminal justice reforms have addressed sentencing and expungement.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Sealing and expungement of criminal records (CORI).</li>
                    <li>Specialty courts (e.g., drug, mental health, veterans).</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Massachusetts</h3>
                <p>Covers divorce, child custody, child support, and alimony. Equitable division of marital assets.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Child support guidelines based on income shares.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Massachusetts</h3>
                <p>Chapter 93A, the Massachusetts Consumer Protection Act, is a powerful tool against unfair or deceptive business practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Allows for multiple damages and attorney's fees.</li>
                    <li>Lemon Law for new and used vehicles.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Massachusetts</h3>
                <p>Massachusetts has extensive laws and regulations. This is a general overview. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'MI': { 
            employment: `
                <h3>Employment Law in Michigan</h3>
                <p>Michigan is an 'at-will' employment state. Has its own minimum wage and paid medical leave act. 'Right-to-work' state (though this has been subject to change).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Elliott-Larsen Civil Rights Act.</li>
                    <li>Workplace safety (MIOSHA).</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Michigan</h3>
                <p>The Michigan Landlord and Tenant Relationship Act and Truth in Renting Act govern rental agreements.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to keep premises fit for use.</li>
                    <li>Rules for handling security deposits and eviction.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Michigan</h3>
                <p>Michigan's criminal justice system includes various offenses and sentencing guidelines. Recent 'Clean Slate' laws for expungement.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Rights of defendants.</li>
                    <li>Diversion programs for certain offenders.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Michigan</h3>
                <p>Covers divorce, child custody (legal and physical), parenting time, child support, and spousal support (alimony).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' factors for custody.</li>
                    <li>Friend of the Court system plays a significant role.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Michigan</h3>
                <p>The Michigan Consumer Protection Act prohibits unfair, unconscionable, or deceptive methods, acts, or practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Home Solicitation Sales Act.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Michigan</h3>
                <p>Michigan laws cover a broad spectrum. This guide provides basic information. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'MN': { 
            employment: `
                <h3>Employment Law in Minnesota</h3>
                <p>Minnesota has laws on minimum wage, overtime, paid sick and safe time (in some cities and statewide soon), and anti-discrimination.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Minnesota Human Rights Act.</li>
                    <li>Parental leave laws.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Minnesota</h3>
                <p>Landlord-tenant laws cover leases, security deposits, and eviction. Minneapolis and St. Paul have additional tenant protections.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's covenant of habitability.</li>
                    <li>Tenant's right to privacy.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Minnesota</h3>
                <p>Minnesota's criminal code defines offenses and penalties. Sentencing guidelines commission sets presumptive sentences.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Expungement of criminal records.</li>
                    <li>Restorative justice programs.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Minnesota</h3>
                <p>Covers dissolution of marriage, child custody, parenting time, child support, and spousal maintenance.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Child support calculator based on guidelines.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Minnesota</h3>
                <p>The Minnesota Prevention of Consumer Fraud Act prohibits deceptive practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles and farm machinery.</li>
                    <li>Protection against predatory lending.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Minnesota</h3>
                <p>Minnesota has a comprehensive legal framework. This guide offers a starting point. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'MS': { 
            employment: `
                <h3>Employment Law in Mississippi</h3>
                <p>Mississippi is an 'at-will' employment and 'right-to-work' state. Minimum wage aligns with federal.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Limited state-level anti-discrimination laws beyond federal.</li>
                    <li>Workers' compensation system.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Mississippi</h3>
                <p>Landlord-tenant laws cover lease agreements, security deposits, and eviction procedures.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to maintain habitable premises.</li>
                    <li>Specific notice requirements for lease termination.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Mississippi</h3>
                <p>Mississippi's criminal code defines various offenses. Has faced scrutiny over prison conditions and sentencing.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Rights of the accused.</li>
                    <li>Parole and probation systems.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Mississippi</h3>
                <p>Covers divorce (fault and no-fault grounds), child custody, child support, and alimony.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' (Albright factors).</li>
                    <li>Equitable distribution of marital property.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Mississippi</h3>
                <p>The Mississippi Consumer Protection Act prohibits unfair or deceptive trade practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Protection against identity theft.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Mississippi</h3>
                <p>Mississippi laws govern many aspects of life. This is a basic guide. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'MO': { 
            employment: `
                <h3>Employment Law in Missouri</h3>
                <p>Missouri is an 'at-will' employment state. Minimum wage is higher than federal. 'Right-to-work' status has been contested.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Missouri Human Rights Act.</li>
                    <li>Laws on wage payment.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Missouri</h3>
                <p>Landlord-tenant laws cover leases, security deposits, and unlawful detainer (eviction) actions.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Implied warranty of habitability.</li>
                    <li>Rules for handling abandoned property.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Missouri</h3>
                <p>Missouri's criminal code defines offenses and penalties. Recent changes to marijuana laws.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Sentencing advisory commission.</li>
                    <li>Expungement of certain arrest and conviction records.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Missouri</h3>
                <p>Covers dissolution of marriage, child custody, child support, and maintenance (alimony).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Presumption of joint legal and physical custody in many cases.</li>
                    <li>Child support calculated using Form 14.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Missouri</h3>
                <p>The Missouri Merchandising Practices Act prohibits deception, fraud, and unfair practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Protection against telemarketing fraud.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Missouri</h3>
                <p>Missouri has a comprehensive set of laws. This guide provides basic information. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'MT': { 
            employment: `
                <h3>Employment Law in Montana</h3>
                <p>Montana is unique; it's not purely 'at-will' after a probationary period (Wrongful Discharge from Employment Act). Has its own minimum wage.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Montana Human Rights Act.</li>
                    <li>Wage and hour laws.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Montana</h3>
                <p>The Montana Residential Landlord and Tenant Act governs rental agreements.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to maintain fit and habitable premises.</li>
                    <li>Rules for security deposits and evictions.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Montana</h3>
                <p>Montana's criminal code defines offenses and penalties. Emphasis on community corrections for some.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Rights of the accused.</li>
                    <li>Deferred imposition of sentence options.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Montana</h3>
                <p>Covers dissolution of marriage, parenting plans (custody), child support, and maintenance.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Child support guidelines based on income shares.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Montana</h3>
                <p>The Montana Unfair Trade Practices and Consumer Protection Act prohibits unfair or deceptive acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Protection for consumers in various transactions.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Montana</h3>
                <p>Montana has a comprehensive legal framework. This guide provides basic information. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'NE': { 
            employment: `
                <h3>Employment Law in Nebraska</h3>
                <p>Nebraska is an 'at-will' employment state. Has laws on minimum wage, child labor, and workplace safety.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Nebraska Fair Employment Practice Act.</li>
                    <li>Wage and Hour Act.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Nebraska</h3>
                <p>The Uniform Residential Landlord and Tenant Act governs rental agreements.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to maintain habitable premises.</li>
                    <li>Rules for security deposits and evictions.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Nebraska</h3>
                <p>Nebraska's criminal code defines offenses and penalties. Uses a determinate sentencing system for felonies.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Rights of the accused.</li>
                    <li>Good time laws for sentence reduction.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Nebraska</h3>
                <p>Covers dissolution of marriage, child custody, parenting time, child support, and alimony.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Child support calculated using Nebraska Supreme Court rules.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Nebraska</h3>
                <p>The Nebraska Consumer Protection Act and Uniform Deceptive Trade Practices Act protect consumers.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Protection against unfair or deceptive business practices.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Nebraska</h3>
                <p>Nebraska has a comprehensive legal system. This guide offers basic insights. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'NV': { 
            employment: `
                <h3>Employment Law in Nevada</h3>
                <p>Nevada has laws on minimum wage (tiered system), overtime, paid leave, and anti-discrimination.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Nevada Equal Rights Commission.</li>
                    <li>Domestic Worker Bill of Rights.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in Nevada</h3>
                <p>Landlord-tenant laws cover leases, security deposits, and eviction procedures. Specific rules for Clark County (Las Vegas).</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Landlord's duty to maintain habitable premises.</li>
                    <li>Summary eviction process.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in Nevada</h3>
                <p>Nevada's criminal justice system includes various offenses and sentencing guidelines. Focus on gaming-related crimes.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Sealing of criminal records.</li>
                    <li>Specialty courts (e.g., drug, DUI, veterans).</li>
                </ul>
            `,
            family: `
                <h3>Family Law in Nevada</h3>
                <p>Community property state. Covers divorce, child custody, child support, and alimony.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Presumption of joint legal and physical custody in many cases.</li>
                    <li>Child support guidelines based on gross monthly income.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in Nevada</h3>
                <p>The Nevada Deceptive Trade Practices Act prohibits misleading or unfair business practices.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Protection against identity theft.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in Nevada</h3>
                <p>Nevada laws cover a broad spectrum, with unique aspects due to its industries. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'NH': { 
            employment: `
                <h3>Employment Law in New Hampshire</h3>
                <p>New Hampshire is an 'at-will' state. Has its own minimum wage and laws on youth employment and workplace safety.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>New Hampshire Law Against Discrimination.</li>
                    <li>Whistleblowers' Protection Act.</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in New Hampshire</h3>
                <p>Landlord-tenant laws cover leases, security deposits, and eviction procedures.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Prohibited Practices Act for landlords.</li>
                    <li>Strict rules for security deposits.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in New Hampshire</h3>
                <p>New Hampshire's criminal code defines offenses and penalties. No general sales tax or income tax impacts some financial crimes.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Annulment of criminal records.</li>
                    <li>Restorative justice programs.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in New Hampshire</h3>
                <p>Covers divorce, parental rights and responsibilities (custody), child support, and spousal support.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Equitable distribution of marital property.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in New Hampshire</h3>
                <p>The New Hampshire Regulation of Business Practices for Consumer Protection Act prohibits unfair or deceptive acts.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new vehicles.</li>
                    <li>Strong protections for home improvement contracts.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in New Hampshire</h3>
                <p>New Hampshire has a distinct legal landscape. This guide provides basic information. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'NJ': { 
            employment: `
                <h3>Employment Law in New Jersey</h3>
                <p>New Jersey has strong worker protections, including minimum wage, paid sick leave, family leave insurance, and anti-discrimination laws.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>New Jersey Law Against Discrimination (LAD).</li>
                    <li>Conscientious Employee Protection Act (CEPA - whistleblower).</li>
                </ul>
            `,
            housing: `
                <h3>Housing Rights in New Jersey</h3>
                <p>Comprehensive landlord-tenant laws, including 'just cause' eviction and rent control in many municipalities.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Anti-Eviction Act.</li>
                    <li>Truth in Renting Act.</li>
                </ul>
            `,
            criminal: `
                <h3>Criminal Law in New Jersey</h3>
                <p>New Jersey's criminal code (Title 2C) defines offenses. Recent bail reform and marijuana legalization.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Expungement of criminal records.</li>
                    <li>Drug Court program.</li>
                </ul>
            `,
            family: `
                <h3>Family Law in New Jersey</h3>
                <p>Covers divorce, child custody, child support, alimony, and domestic violence.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>'Best interests of the child' standard.</li>
                    <li>Equitable distribution of marital property.</li>
                </ul>
            `,
            consumer: `
                <h3>Consumer Rights in New Jersey</h3>
                <p>The New Jersey Consumer Fraud Act (CFA) is one of the strongest in the nation, allowing for treble damages and attorney's fees.</p>
                <strong>Key points:</strong>
                <ul>
                    <li>Lemon Law for new and used vehicles.</li>
                    <li>Contractors' Registration Act.</li>
                </ul>
            `,
            general: `
                <h3>Overview of Legal Information in New Jersey</h3>
                <p>New Jersey has extensive laws and regulations. This is a general overview. <em>This is not legal advice. Consult a qualified attorney.</em></p>
            `
        },
        'NM': { // New Mexico Data (Sample)
            employment: `<h3>Employment Law in New Mexico</h3><p>New Mexico has laws on minimum wage, overtime, paid sick leave, and anti-discrimination.</p><strong>Key points:</strong><ul><li>New Mexico Human Rights Act.</li><li>Occupational Health and Safety Bureau.</li></ul>`,
            housing: `<h3>Housing Rights in New Mexico</h3><p>The Uniform Owner-Resident Relations Act governs rental agreements.</p><strong>Key points:</strong><ul><li>Landlord's duty to maintain habitable premises.</li><li>Procedures for handling abandoned property.</li></ul>`,
            criminal: `<h3>Criminal Law in New Mexico</h3><p>New Mexico's criminal code defines offenses and penalties. Focus on DWI laws and drug-related offenses.</p><strong>Key points:</strong><ul><li>Expungement of certain criminal records.</li><li>Specialty courts (e.g., drug, mental health).</li></ul>`,
            family: `<h3>Family Law in New Mexico</h3><p>Community property state. Covers divorce, child custody, child support, and spousal support.</p><strong>Key points:</strong><ul><li>'Best interests of the child' standard.</li><li>Child support guidelines based on gross income.</li></ul>`,
            consumer: `<h3>Consumer Rights in New Mexico</h3><p>The New Mexico Unfair Practices Act prohibits unfair or deceptive trade practices.</p><strong>Key points:</strong><ul><li>Lemon Law for new vehicles.</li><li>Protection against predatory lending.</li></ul>`,
            general: `<h3>Overview of Legal Information in New Mexico</h3><p>New Mexico has a unique cultural and legal heritage. This guide provides basic insights. <em>This is not legal advice. Consult a qualified attorney.</em></p>`
        },
        'NY': { // New York Data (Sample)
            employment: `<h3>Employment Law in New York</h3><p>New York State and New York City have extensive worker protections, including minimum wage, paid sick leave, paid family and medical leave (PFML), and strong anti-discrimination laws.</p><strong>Key points:</strong><ul><li>New York State Human Rights Law.</li><li>New York City Human Rights Law (often broader).</li></ul>`,
            housing: `<h3>Housing Rights in New York</h3><p>Complex landlord-tenant laws, especially in NYC with rent stabilization/control. Statewide tenant protections exist.</p><strong>Key points:</strong><ul><li>Warranty of habitability.</li><li>Housing Stability and Tenant Protection Act of 2019.</li></ul>`,
            criminal: `<h3>Criminal Law in New York</h3><p>New York's criminal code defines offenses and penalties. Recent focus on bail reform and marijuana legalization.</p><strong>Key points:</strong><ul><li>Expungement of certain criminal records.</li><li>Specialty courts (e.g., drug, mental health).</li></ul>`,
            family: `<h3>Family Law in New York</h3><p>Covers divorce, child custody, child support, and spousal support/alimony.</p><strong>Key points:</strong><ul><li>'Best interests of the child' standard.</li><li>Equitable distribution of marital property.</li></ul>`,
            consumer: `<h3>Consumer Rights in New York</h3><p>The New York Consumer Protection Act (NYCPA) and other laws protect consumers.</p><strong>Key points:</strong><ul><li>Lemon Law for new and used vehicles.</li><li>Protection against deceptive business practices.</li></ul>`,
            general: `<h3>Overview of Legal Information in New York</h3><p>New York has a complex legal system. This guide provides basic insights. <em>This is not legal advice. Consult a qualified attorney.</em></p>`
        },
        'OR': {
            employment: `<h3>Employment Law in Oregon</h3><p>Oregon has strong worker protections including minimum wage, paid sick time, and anti-discrimination laws.</p><strong>Key points:</strong><ul><li>Oregon Family Leave Act (OFLA).</li><li>Fair Employment Practices Act.</li></ul>`,
            housing: `<h3>Housing Rights in Oregon</h3><p>Oregon has tenant-friendly laws including rent control in certain areas and eviction protections.</p><strong>Key points:</strong><ul><li>Rent control in Portland metro area.</li><li>90-day notice for no-cause evictions.</li></ul>`,
            criminal: `<h3>Criminal Law in Oregon</h3><p>Oregon's criminal code includes unique approaches to drug offenses and public order crimes.</p><strong>Key points:</strong><ul><li>Drug decriminalization (Measure 110).</li><li>Expungement opportunities.</li></ul>`,
            family: `<h3>Family Law in Oregon</h3><p>Covers dissolution of marriage, legal separation, child custody, parenting time, child support, and spousal support.</p><strong>Key points:</strong><ul><li>'Best interests of the child' standard.</li><li>Child support calculated using Oregon Child Support Guidelines.</li></ul>`, 
            consumer: `<h3>Consumer Rights in Oregon</h3><p>The Oregon Unlawful Trade Practices Act (UTPA) prohibits deceptive or unfair acts in commerce.</p><strong>Key points:</strong><ul><li>Lemon Law for new vehicles.</li><li>Protection against identity theft and financial fraud.</li></ul>`,
            general: `<h3>Overview of Legal Information in Oregon</h3><p>Oregon has progressive consumer and tenant protection laws. <em>This is not legal advice. Consult a qualified attorney.</em></p>`
        },
        'TN': {
            employment: `<h3>Employment Law in Tennessee</h3><p>Tennessee is an employment-at-will state with some worker protections.</p><strong>Key points:</strong><ul><li>Minimum wage follows federal rate.</li><li>Workers' compensation requirements.</li></ul>`,
            housing: `<h3>Housing Rights in Tennessee</h3><p>Tennessee has standard landlord-tenant laws with some local variations.</p><strong>Key points:</strong><ul><li>Security deposit limits and returns.</li><li>Eviction procedures.</li></ul>`,
            criminal: `<h3>Criminal Law in Tennessee</h3><p>Tennessee has specific criminal laws and sentencing guidelines.</p><strong>Key points:</strong><ul><li>Expungement eligibility.</li><li>Drug-free school zones.</li></ul>`,
            family: `<h3>Family Law in Tennessee</h3><p>Covers divorce, child custody (parental responsibilities), child support, and alimony.</p><strong>Key points:</strong><ul><li>Permanent Parenting Plan required for cases with children.</li><li>Child support guidelines based on income shares.</li></ul>`,
            consumer: `<h3>Consumer Rights in Tennessee</h3><p>The Tennessee Consumer Protection Act prohibits unfair or deceptive acts or practices.</p><strong>Key points:</strong><ul><li>Lemon Law for new vehicles.</li><li>Protection against unsolicited consumer telephone calls.</li></ul>`,
            general: `<h3>Overview of Legal Information in Tennessee</h3><p>Tennessee has standard consumer protection laws. <em>This is not legal advice. Consult a qualified attorney.</em></p>`
        },
    };

    // State selection handler
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            const selectedStateValue = this.value;
            const selectedStateName = this.options[this.selectedIndex].text;
            
            if (supportedStates.includes(selectedStateValue)) {
                aiSearchResults.innerHTML = `<p>Explore legal topics for ${selectedStateName} or ask a specific question.</p>`;
            } else {
                aiSearchResults.innerHTML = `<p>Select a category or ask a question about ${selectedStateName}. Static info for supported states only.</p>`;
            }
        });
    }

    // Add event listener for the 'Get Rights Information' button
    if (stateSubmit) {
        stateSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedStateValue = stateSelect ? stateSelect.value : '';
            const selectedStateName = stateSelect && selectedStateValue ? stateSelect.options[stateSelect.selectedIndex].text : "selected state";

            if (!selectedStateValue) {
                displayContentInResults('<p>Please select a state first.</p>');
                return;
            }

            // Create category buttons container if it doesn't exist
            let categoryContainer = document.getElementById('categoryButtons');
            if (!categoryContainer) {
                categoryContainer = document.createElement('div');
                categoryContainer.id = 'categoryButtons';
                categoryContainer.className = 'category-buttons';
                categoryContainer.style.margin = '20px 0';
                
                // Add category buttons
                const categories = ['Employment', 'Housing', 'Criminal', 'Family', 'Consumer', 'General'];
                categories.forEach(category => {
                    const button = document.createElement('button');
                    button.textContent = category;
                    button.className = 'category-btn';
                    button.dataset.category = category.toLowerCase();
                    button.style.margin = '5px';
                    button.style.padding = '10px 15px';
                    button.style.border = '1px solid #ccc';
                    button.style.borderRadius = '4px';
                    button.style.cursor = 'pointer';
                    button.style.backgroundColor = '#f8f9fa';
                    
                    // Create dropdown content div
                    const dropdownContent = document.createElement('div');
                    dropdownContent.className = 'dropdown-content';
                    dropdownContent.style.display = 'none';
                    dropdownContent.style.padding = '10px';
                    dropdownContent.style.marginTop = '5px';
                    dropdownContent.style.border = '1px solid #ddd';
                    dropdownContent.style.borderRadius = '4px';
                    dropdownContent.style.backgroundColor = '#f9f9f9';
                    
                    // Add click handler to toggle dropdown
                    button.addEventListener('click', () => {
                        // Toggle dropdown visibility
                        const isVisible = dropdownContent.style.display === 'block';
                        
                        // Hide all other dropdowns
                        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                            dropdown.style.display = 'none';
                        });
                        
                        // Reset all buttons
                        document.querySelectorAll('.category-btn').forEach(btn => {
                            btn.style.backgroundColor = '#f8f9fa';
                            btn.style.color = '';
                        });
                        
                        // Toggle current dropdown
                        if (!isVisible) {
                            // Set active state for clicked button
                            button.style.backgroundColor = '#007bff';
                            button.style.color = 'white';
                            
                            // Load content if not already loaded
                            if (!dropdownContent.hasChildNodes()) {
                                const stateData = allStatesLawData[selectedStateValue];
                                const categoryContent = stateData && stateData[category.toLowerCase()];
                                
                                if (categoryContent) {
                                    dropdownContent.innerHTML = categoryContent;
                                } else {
                                    dropdownContent.innerHTML = `<p>No specific ${category} information available for ${selectedStateName}.</p>`;
                                }
                            }
                            
                            dropdownContent.style.display = 'block';
                        }
                    });
                    
                    // Add dropdown content after button
                    button.parentNode.insertBefore(dropdownContent, button.nextSibling);
                    
                    categoryContainer.appendChild(button);
                });
                
                // Insert the category buttons container after the state selection form
                const stateForm = document.querySelector('.state-form');
                if (stateForm) {
                    stateForm.parentNode.insertBefore(categoryContainer, stateForm.nextSibling);
                }
            }
            
            // Show the laws container
            const lawsContainer = document.getElementById('lawsContainer');
            if (lawsContainer) {
                lawsContainer.style.display = 'block';
                const stateData = allStatesLawData[selectedStateValue];
                if (stateData && stateData[currentSelectedCategory]) {
                    const htmlContent = stateData[currentSelectedCategory];
                    displayContentInResults(htmlContent);

                    // Simulate AI search
                    const queryForAI = aiSearchInput.value.trim() || `Tell me about ${currentSelectedCategory} laws in ${selectedStateName}`;
                    const aiSimulationMessage = `<p style="margin-top: 20px; font-style: italic;">Simulating AI search for: "${queryForAI}"... (This is a placeholder. No actual AI call is made.)</p>`;
                    if (aiSearchResults) {
                        aiSearchResults.innerHTML += aiSimulationMessage;
                    }
                    alert(`AI Search Triggered for: "${queryForAI}"\n(Actual AI integration would happen here)`);
                } else if (stateData && stateData.general) {
                    const htmlContent = `<p>No specific information for '${currentSelectedCategory}' in ${selectedStateName}. Showing general information:</p>${stateData.general}`;
                    displayContentInResults(htmlContent);
                } else {
                    displayContentInResults(`<p>No information found for ${currentSelectedCategory} in ${selectedStateName}.</p>`);
                    
                    // For unsupported states or categories, show this message
                    displayContentInResults(`<p>Detailed static information is currently only available for ${supportedStates.join(', ')}. You can ask the AI about ${currentSelectedCategory} in ${selectedStateName}.</p>`);
                    
                    // Optionally, still trigger AI simulation for unsupported states if a category is chosen
                    const queryForAI = aiSearchInput.value.trim() || `Tell me about ${currentSelectedCategory} laws in ${selectedStateName}`;
                    const aiSimulationMessage = `<p style="margin-top: 20px; font-style: italic;">Simulating AI search for: "${queryForAI}"... (This is a placeholder. No actual AI call is made.)</p>`;
                    if (aiSearchResults) {
                        aiSearchResults.innerHTML += aiSimulationMessage;
                    }
                    alert(`AI Search Triggered for: "${queryForAI}"\n(Actual AI integration would happen here for ${selectedStateName})`);
                }
            }
        }, 1200);
    } // Close stateSubmit event listener

    // AI Search functionality
    if (aiSearchInput && aiSearchButton) {
        const newBtn = aiSearchButton.cloneNode(true);
        aiSearchButton.parentNode.replaceChild(newBtn, aiSearchButton);
        
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const question = aiSearchInput.value.trim();
            const selectedStateValue = stateSelect ? stateSelect.value : '';
            const selectedStateName = stateSelect && selectedStateValue ? stateSelect.options[stateSelect.selectedIndex].text : "selected state";
            
            if (!question) {
                displayContentInResults('<p>Please enter a question for the AI.</p>');
                return;
            }
            
            if (!selectedStateValue) {
                displayContentInResults('<p>Please select a state to ask the AI.</p>');
                return;
            }
            
                displayContentInResults(`<p>You asked: "${question}" for ${selectedStateName}.</p>`);
                const aiSimulationMessage = `<p style="margin-top: 10px; font-style: italic;">Simulating AI search for: "${question}"... (This is a placeholder. No actual AI call is made.)</p>`;
                if (aiSearchResults) {
                    aiSearchResults.innerHTML += aiSimulationMessage;
                }
                alert(`AI Search Triggered for: "${question}"\n(Actual AI integration would happen here)`);
        
        });
        
        aiSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                newBtn.click();
            }
        });
    }

    // Category button functionality
    // Using categoryButtons declared at the top of the file
    
    // Add loading overlay for AI Insight button
    if (getAiInsightButton) {
        // Remove any existing event listeners to prevent duplicates
        const newButton = getAiInsightButton.cloneNode(true);
        getAiInsightButton.parentNode.replaceChild(newButton, getAiInsightButton);
        
        newButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show loading overlay
            const loadingOverlay = document.getElementById('aiInsightLoadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
            
            // Simulate AI processing time (1.2 seconds)
            setTimeout(() => {
                // Hide loading overlay
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'none';
                    document.body.style.overflow = '';
                }
                
                // Show search section
                const searchSection = document.getElementById('searchSection');
                if (searchSection) {
                    searchSection.style.display = 'block';
                    searchSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1200);
        });
    }

    categoryButtons.forEach(button => {
        const newBtn = button.cloneNode(true);
        button.parentNode.replaceChild(newBtn, button);
        newBtn.addEventListener('click', () => {
            currentSelectedCategory = newBtn.dataset.category; // Set current category
            const selectedStateValue = stateSelect ? stateSelect.value : '';
            const selectedStateName = stateSelect && selectedStateValue ? stateSelect.options[stateSelect.selectedIndex].text : "the selected state";

            if (!selectedStateValue) {
                displayContentInResults('<p>Please select a state first.</p>');
                if (aiSearchInput) aiSearchInput.value = '';
                currentSelectedCategory = ''; // Reset category if no state
                return;
            }
            
            // Get the state data for the selected state and category
            const stateData = allStatesLawData[selectedStateValue];
            if (stateData && stateData[currentSelectedCategory.toLowerCase()]) {
                displayContentInResults(stateData[currentSelectedCategory.toLowerCase()]);
            } else {
                displayContentInResults(`<p>No information available for ${currentSelectedCategory} in ${selectedStateName}.</p>`);
            }

            if (aiSearchInput) {
                aiSearchInput.value = `Tell me about ${currentSelectedCategory} laws in ${selectedStateName}`;
            }
            // Display prompt, not full content
            displayContentInResults(
                `<p>You've selected the '${currentSelectedCategory}' category for ${selectedStateName}.</p>` +
                `<p>Click "Get AI Legal Insight" to view details and get an AI summary, or refine your question and click "Ask AI".</p>`
            );
        });
    });

    // Ensure existing login and signup link listeners are not removed if they are outside this block

    const supportedStates = Object.keys(allStatesLawData); // Define supportedStates based on the keys of allStatesLawData

    // Function to display content in the results area
    function displayContentInResults(htmlContent) {
        if (aiSearchResults) {
            aiSearchResults.innerHTML = htmlContent;
        }
    }
}); // Close the DOMContentLoaded event listener