console.log("Email Writer Extension - Content Script Loaded");

// function createAIButton() {
//    const button = document.createElement('div');
//    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
//    button.style.marginRight = '8px';
//    button.innerHTML = 'Reply with MailMate AI ✨';
//    button.setAttribute('role','button');
//    button.setAttribute('data-tooltip','Generate AI Reply');
//    return button;
// }

function createAIButton() {

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.marginRight = '8px';

    const select = document.createElement('select');
    select.className = 'ai-tone-select';

    select.style.height = '36px';
    select.style.marginRight = '6px';
    select.style.padding = '0 8px';
    select.style.border = '1px solid #dadce0';
    select.style.borderRadius = '4px';
    select.style.backgroundColor = '#0B57D0';
    select.style.color = '#FFFFFF';
    select.style.fontSize = '14px';
    select.style.fontFamily = 'Arial, sans-serif';
    select.style.cursor = 'pointer';
    select.style.outline = 'none';

    const tones = [
        'Professional',
        'Friendly',
        'Formal',
        'Casual',
        'Concise'
    ];

    tones.forEach(tone => {
        const option = document.createElement('option');
        option.value = tone.toLowerCase();
        option.textContent = tone;
        select.appendChild(option);
    });

    const button = document.createElement('button');

    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.innerHTML = 'MailMate AI Reply';
    button.setAttribute('type', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');

    container.appendChild(select);
    container.appendChild(button);

    return {
        container,
        button,
        select
    };
}

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return '';
}


function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar found, creating AI button");
    //const button = createAIButton();
    const {container,button,select} = createAIButton();
    container.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            //button.disabled = true; removing this line to allow multiple clicks while generating

            const emailContent = getEmailContent();
            //
            const selectedTone = select.value;
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: selectedTone
                })
            });

            if (!response.ok) {
                throw new Error('API Request Failed');
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if (composeBox) {
                composeBox.focus(); //shifts user's cursor to the compose box
                document.execCommand('insertText', false, generatedReply); //mimics user typing the generated reply into the compose box
            } else {
                console.error('Compose box was not found');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate reply');
        } finally {
            button.innerHTML = 'Reply with MailMate AI ✨';
            //button.disabled =  false; removing this line to allow multiple clicks while generating
        }
    });

    //toolbar.insertBefore(button, toolbar.firstChild);
    toolbar.insertBefore(container, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hasComposeElements) {
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});


observer.observe(document.body, {
    childList: true,
    subtree: true
});