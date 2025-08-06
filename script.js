// Blog Post Prompt Generator JavaScript
// Main functionality for form handling and prompt generation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form event listeners
    initializeFormListeners();
    
    // Add any initial setup
    setupFormDefaults();
});

function initializeFormListeners() {
    // Form submission handler
    document.getElementById('promptForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generatePrompt();
    });
    
    // Add real-time validation if needed
    addInputValidation();
}

function setupFormDefaults() {
    // Set any default values or configurations
    const mainKeywordInput = document.getElementById('mainKeyword');
    
    // Add placeholder text animation or other enhancements
    addPlaceholderAnimations();
}

function addInputValidation() {
    const mainKeywordInput = document.getElementById('mainKeyword');
    
    mainKeywordInput.addEventListener('blur', function() {
        validateMainKeyword(this.value);
    });
}

function validateMainKeyword(keyword) {
    if (keyword.trim().length < 2) {
        showValidationMessage('Main keyword should be at least 2 characters long');
        return false;
    }
    return true;
}

function showValidationMessage(message) {
    // Create a simple validation message system
    console.log('Validation:', message);
    // You can enhance this with actual UI feedback
}

function generatePrompt() {
    // Show loading state
    showLoadingState();
    
    try {
        // Get all form values
        const formData = collectFormData();
        
        // Validate required fields
        if (!validateFormData(formData)) {
            hideLoadingState();
            return;
        }
        
        // Generate the prompt
        const prompt = buildPromptString(formData);
        
        // Display the result
        displayGeneratedPrompt(prompt);
        
    } catch (error) {
        console.error('Error generating prompt:', error);
        showError('An error occurred while generating the prompt. Please try again.');
    } finally {
        hideLoadingState();
    }
}

function collectFormData() {
    return {
        // Basic fields
        mainKeyword: document.getElementById('mainKeyword').value.trim(),
        relatedKeywords: document.getElementById('relatedKeywords').value.trim(),
        blogTitle: document.getElementById('blogTitle').value.trim(),
        targetAudience: document.getElementById('targetAudience').value.trim(),
        postGoals: document.getElementById('postGoals').value.trim(),
        searchIntent: document.getElementById('searchIntent').value,
        funnelStage: document.getElementById('funnelStage').value,
        wordCount: document.getElementById('wordCount').value,
        toneStyle: document.getElementById('toneStyle').value,
        businessGoal: document.getElementById('businessGoal').value,
        callToAction: document.getElementById('callToAction').value.trim(),
        customInstructions: document.getElementById('customInstructions').value.trim(),
        
        // Checkbox options
        featuredSnippet: document.getElementById('featuredSnippet').checked,
        schemaMarkup: document.getElementById('schemaMarkup').checked,
        peopleAlsoAsk: document.getElementById('peopleAlsoAsk').checked,
        internalLinks: document.getElementById('internalLinks').checked,
        externalLinks: document.getElementById('externalLinks').checked,
        faqSection: document.getElementById('faqSection').checked
    };
}

function validateFormData(data) {
    if (!data.mainKeyword) {
        alert('Please enter a main keyword');
        document.getElementById('mainKeyword').focus();
        return false;
    }
    
    if (data.mainKeyword.length < 2) {
        alert('Main keyword should be at least 2 characters long');
        document.getElementById('mainKeyword').focus();
        return false;
    }
    
    return true;
}

function buildPromptString(data) {
    let prompt = `🧠 SEO CONTENT BRIEF: ${data.mainKeyword.toUpperCase()}\n\n`;
    
    // Opening instruction
    prompt += `You are an expert SEO strategist and content writer. Create a comprehensive, Google-optimized blog post targeting the primary keyword "${data.mainKeyword}"`;
    
    if (data.relatedKeywords) {
        prompt += ` and supporting keyword cluster: ${data.relatedKeywords}`;
    }
    prompt += `.\n\n`;
    
    // Audience & Intent Section
    prompt += `👥 TARGET AUDIENCE & INTENT:\n`;
    prompt += `• Target Audience: ${data.targetAudience || 'General audience interested in ' + data.mainKeyword}\n`;
    prompt += `• Search Intent: ${data.searchIntent}\n`;
    prompt += `• Funnel Stage: ${data.funnelStage}\n\n`;
    
    // Business Objectives
    prompt += `🎯 BUSINESS OBJECTIVES:\n`;
    if (data.postGoals) {
        prompt += `• Post Goals & Content Type: ${data.postGoals}\n`;
    }
    prompt += `• Primary Goal: ${data.businessGoal}\n`;
    if (data.callToAction) {
        prompt += `• Call-to-Action: ${data.callToAction}\n`;
    }
    prompt += `\n`;
    
    // SEO Requirements
    prompt += `🧰 SEO & STRUCTURAL REQUIREMENTS:\n`;
    
    // Handle title requirements
    if (data.blogTitle) {
        prompt += `• Use this specific title: "${data.blogTitle}"\n`;
        prompt += `• Ensure title is SEO-optimized and contains primary keyword\n`;
    } else {
        prompt += `• Create 3-5 SEO-optimized title options (55-60 characters each) with primary keyword\n`;
        prompt += `• Choose the most compelling title for the post\n`;
    }
    
    prompt += `• Meta description (150-160 characters) with compelling CTA\n`;
    prompt += `• Primary keyword naturally placed in first 100 words\n`;
    prompt += `• Keyword density: 1-2% (avoid keyword stuffing)\n`;
    prompt += `• Use semantic/LSI keywords throughout\n`;
    
    if (data.schemaMarkup) {
        prompt += `• Include schema markup suggestions (Article/FAQ/HowTo)\n`;
    }
    if (data.featuredSnippet) {
        prompt += `• Optimize for featured snippet opportunity\n`;
    }
    prompt += `\n`;
    
    // Content Structure
    prompt += `📐 CONTENT STRUCTURE:\n`;
    prompt += `• Hook-driven introduction addressing reader's pain point\n`;
    prompt += `• H1: Main title with primary keyword\n`;
    prompt += `• H2/H3 subheadings incorporating related keywords\n`;
    
    if (data.peopleAlsoAsk) {
        prompt += `• Answer 3-5 "People Also Ask" questions as dedicated sections\n`;
    }
    if (data.internalLinks) {
        prompt += `• Include 2-3 strategic internal link opportunities\n`;
    }
    if (data.externalLinks) {
        prompt += `• Add 1-2 external links to authoritative sources\n`;
    }
    
    prompt += `• Include relevant data, statistics, or case studies for credibility\n`;
    
    if (data.faqSection) {
        prompt += `• Brief FAQ section (3-5 common questions)\n`;
    }
    prompt += `\n`;
    
    // Engagement Elements
    prompt += `✨ ENGAGEMENT & UX ELEMENTS:\n`;
    prompt += `• Use bullet points and numbered lists for scannability\n`;
    prompt += `• Keep paragraphs short (2-3 sentences maximum)\n`;
    prompt += `• Include actionable takeaways and practical tips\n`;
    prompt += `• Add relevant examples or case studies\n`;
    prompt += `• Ensure mobile-friendly formatting\n\n`;
    
    // Technical Specs
    prompt += `⚙️ TECHNICAL SPECIFICATIONS:\n`;
    prompt += `• Word Count: ${data.wordCount} words\n`;
    prompt += `• Tone: ${data.toneStyle}\n`;
    prompt += `• Conclusion with summary and next steps\n`;
    prompt += `• Clear value proposition throughout\n`;
    
    if (data.customInstructions) {
        prompt += `\n📝 ADDITIONAL REQUIREMENTS:\n${data.customInstructions}\n`;
    }
    
    // Content Goals
    prompt += `\n🚀 CONTENT GOALS:\n`;
    prompt += `• Establish topical authority in the subject area\n`;
    prompt += `• Provide comprehensive, actionable coverage\n`;
    prompt += `• Drive organic traffic and user engagement\n`;
    prompt += `• Support conversion objectives\n\n`;
    
    prompt += `Please create content that balances SEO optimization with genuine value for readers, ensuring it ranks well while serving the target audience's needs effectively.`;
    
    return prompt;
}

function displayGeneratedPrompt(prompt) {
    document.getElementById('generatedPrompt').textContent = prompt;
    document.getElementById('output').style.display = 'block';
    
    // Smooth scroll to output with offset for better UX
    setTimeout(() => {
        document.getElementById('output').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
    
    // Track generation (for analytics if needed)
    trackPromptGeneration();
}

function showLoadingState() {
    const button = document.querySelector('.generate-btn');
    button.textContent = '⏳ Generating...';
    button.disabled = true;
}

function hideLoadingState() {
    const button = document.querySelector('.generate-btn');
    button.textContent = '🚀 Generate Blog Post Prompt';
    button.disabled = false;
}

function showError(message) {
    alert(message); // You can enhance this with a better UI
}

// Copy to clipboard functionality
function copyToClipboard() {
    const promptText = document.getElementById('generatedPrompt').textContent;
    
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(promptText).then(function() {
            showCopySuccess();
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            fallbackCopyToClipboard(promptText);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(promptText);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    const btn = document.querySelector('.copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = '#28a745';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#28a745';
    }, 2000);
}

function showCopyError() {
    const btn = document.querySelector('.copy-btn');
    const originalText = btn.textContent;
    btn.textContent = '❌ Failed to copy';
    btn.style.background = '#dc3545';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#28a745';
    }, 2000);
}

function addPlaceholderAnimations() {
    // Add any placeholder animations or enhancements
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function trackPromptGeneration() {
    // Add analytics tracking here if needed
    console.log('Prompt generated successfully');
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generatePrompt,
        copyToClipboard,
        collectFormData,
        buildPromptString
    };
}