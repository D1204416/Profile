// 語言管理
let currentLang = localStorage.getItem('preferredLanguage') || 
    (navigator.language.startsWith('zh') ? 'zh' : 'en');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    setupEventListeners();
    initializeAnimations();
});

function initLanguage() {
    // 設置初始語言
    changeLang(currentLang);
    // 更新語言按鈕狀態
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
    });
}

function setupEventListeners() {
    // 語言切換按鈕
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            localStorage.setItem('preferredLanguage', currentLang);
            changeLang(currentLang);
        });
    });

    // 關於我按鈕的效果
    document.querySelectorAll('.about-me').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
}

function initializeAnimations() {
    // 添加滾動顯示動畫
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

function changeLang(lang) {
    const t = translations[lang];

    // 更新按鈕狀態
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    // 更新頁面標題
    document.title = `${t.name} - ${t.title}`;

    // 更新標題和姓名
    document.querySelector('.name').textContent = t.name;
    document.querySelector('.title').textContent = t.title;

    // 更新按鈕文字
    document.querySelectorAll('.nav-btn').forEach((btn, index) => {
        const btnKey = ['about', 'motivation', 'advantages'][index];
        if (btnKey) btn.textContent = t[btnKey];
    });

    // 更新區段標題
    updateSectionTitles(t);

    // 更新教育經歷
    updateEducation(t);

    // 更新工作經歷
    updateWorkExperience(t);

    // 更新技能類別
    updateSkillCategories(t);

    // 更新聯絡資訊
    updateContactInfo(t);
}

function updateSectionTitles(t) {
    const titleMappings = {
        '聯絡資訊': 'contact',
        '技能': 'skills',
        '學習經歷': 'education',
        '工作經歷': 'experience',
        '作品集': 'portfolio',

        'Contact Info': 'contact',
        'Skills': 'skills',
        'Education': 'education',
        'Experience': 'experience',
        'Portfolio': 'portfolio'
    };

    document.querySelectorAll('.section-title, .section-title-left').forEach(title => {
        const currentText = title.textContent.trim();
        // 直接從映射中獲取鍵值
        const key = titleMappings[currentText];
        if (key) {
            title.textContent = t[key];
        }
    });
}

function updateEducation(t) {
    const educationItems = document.querySelectorAll('.education-timeline .timeline-item');
    ['education1', 'education2'].forEach((key, index) => {
        if (educationItems[index]) {
            educationItems[index].querySelector('.timeline-date').textContent = t[key].date;
            educationItems[index].querySelector('.school').textContent = t[key].school;
        }
    });
}

function updateWorkExperience(t) {
    const expItems = document.querySelectorAll('.experience-timeline .timeline-item');
    ['exp1', 'exp2', 'exp3'].forEach((key, index) => {
        if (expItems[index]) {
            const item = expItems[index];
            const exp = t[key];
            item.querySelector('.timeline-date').textContent = exp.date;
            item.querySelector('.company').textContent = exp.company;
            item.querySelector('.position').textContent = exp.position;
            
            const duties = item.querySelectorAll('.duties li');
            exp.duties.forEach((duty, dutyIndex) => {
                if (duties[dutyIndex]) {
                    duties[dutyIndex].textContent = duty;
                }
            });
        }
    });
}

function updateSkillCategories(t) {
    document.querySelectorAll('.skills-category-title').forEach(title => {
        const key = Object.keys(t.skillCategories).find(k => 
            t.skillCategories[k] === title.textContent ||
            translations[currentLang === 'en' ? 'zh' : 'en'].skillCategories[k] === title.textContent
        );
        if (key) {
            title.textContent = t.skillCategories[key];
        }
    });
}

function updateContactInfo(t) {
    const locationElement = document.querySelector('.contact-info .location');
    if (locationElement) {
        locationElement.innerHTML = `<i class="bi bi-geo-fill"></i> ${t.location}`;
    }
}


// 樣式切換功能
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

//檢查本地存儲中的主題設置
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        switchTheme('styles2.css');
    }
}


// 切換主題函數
function switchTheme(cssFile) {
    let oldlink = document.getElementsByTagName("link").item(0);
    let newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);
    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

// 監聽開關變化
toggleSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        switchTheme('styles2.css');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        switchTheme('styles.css');
    }    
});



