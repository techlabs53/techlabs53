const themes = {
    dark: {
        '--background':        '#141414',
        '--accent-primary':    '#1c1c1c',
        '--accent-secondary':  '#242424',
        '--accent-hover':      '#2e2e2e',
        '--accent-active':     '#373737',
        '--border':            '#2a2a2a',
        '--text-primary':      '#f0f0f0',
        '--text-secondary':    '#888888',
        '--text-muted':        '#555555',
        '--highlight':         '#c8ff00',
        '--highlight-dim':     'rgba(200, 255, 0, 0.08)',
    },
    light: {
        '--background':        '#d6d6d6',
        '--accent-primary':    '#eeeeee',
        '--accent-secondary':  '#dbdbdb',
        '--accent-hover':      '#cfcfcf',
        '--accent-active':     '#c9c9c9',
        '--border':            '#dcdcdc',
        '--text-primary':      '#111111',
        '--text-secondary':    '#555555',
        '--text-muted':        '#999999',
        '--highlight':         '#2563eb',
        '--highlight-dim':     'rgba(37, 99, 235, 0.08)',
    },
    grady: {
        '--background':        '#eeedd7',  
        '--accent-primary':    '#272C40',  
        '--accent-secondary':  '#4b547aa4',
        '--accent-hover':      '#80604e',
        '--accent-active':     '#705444',
        '--border':            '#525252',  
        '--text-primary':      '#FDFCDE',  
        '--text-secondary':    '#fdfcde83',
        '--text-muted':        '#8b949e',
        '--highlight':         '#fc800c',  
        '--highlight-dim':     'rgba(227, 139, 58, 0.12)',
    }
};

const themeLabels = {
    dark:  { name: 'Dark',          desc: 'Default',         icon: '◐' },
    light: { name: 'Light',         desc: 'Clean & bright',  icon: '○' },
    grady: { name: "Grady's Theme", desc: 'Profile Colors', icon: '★' },
};

// apply theme
function applyTheme(id) {
    const root = document.documentElement;
    const vars = themes[id];
    if (!vars) return;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    localStorage.setItem('portfolio-theme', id);
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === id);
    });
}

// build and inject settings
function buildSettingsUI() {
    // wrapper sits next to the h1
    const wrapper = document.createElement('div');
    wrapper.className = 'theme-settings-wrapper';

    // gear button
    const btn = document.createElement('button');
    btn.className = 'theme-settings-btn';
    btn.setAttribute('aria-label', 'Open theme settings');
    btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>`;

    // popover panel
    const panel = document.createElement('div');
    panel.className = 'theme-panel';
    panel.setAttribute('aria-hidden', 'true');

    const panelHeader = document.createElement('p');
    panelHeader.className = 'theme-panel-label';
    panelHeader.textContent = '// theme';
    panel.appendChild(panelHeader);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'theme-options';

    Object.entries(themeLabels).forEach(([id, meta]) => {
        const opt = document.createElement('button');
        opt.className = 'theme-option';
        opt.dataset.theme = id;
        opt.innerHTML = `
            <span class="theme-option-icon">${meta.icon}</span>
            <span class="theme-option-text">
                <span class="theme-option-name">${meta.name}</span>
                <span class="theme-option-desc">${meta.desc}</span>
            </span>
        `;
        opt.addEventListener('click', () => {
            applyTheme(id);
        });
        optionsContainer.appendChild(opt);
    });

    panel.appendChild(optionsContainer);
    wrapper.appendChild(btn);
    wrapper.appendChild(panel);

    // toggle open/close
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.toggle('open');
        btn.classList.toggle('active', isOpen);
        panel.setAttribute('aria-hidden', !isOpen);
    });

    // close on outside click
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            panel.classList.remove('open');
            btn.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
        }
    });

    // inject after h1
    const h1 = document.querySelector('header h1');
    if (h1) {
        const headerLeft = document.createElement('div');
        headerLeft.className = 'header-left';
        h1.parentNode.insertBefore(headerLeft, h1);
        headerLeft.appendChild(h1);
        headerLeft.appendChild(wrapper);
    }

    // apply saved or default theme
    const saved = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(saved);
}

document.addEventListener('DOMContentLoaded', buildSettingsUI);