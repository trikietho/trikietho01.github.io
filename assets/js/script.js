const mainFile = document.getElementById('main');
const navItems = document.querySelectorAll('.nav-item .nav-item-text');
// let NameTab = '';
window.onload = async () => {
    let defaultTab = 'personal-info';
    if (location.hash.length > 1) {
        defaultTab = location.hash.replace('#', '');
    }
    // NameTab = defaultTab;
    // navItems.forEach((navItem) => {
    //     if (navItem.getAttribute('href')?.replace('#', '') != NameTab) {
    //         navItem.classList.remove('active')
    //     } else {
    //         navItem.classList.add('active')
    //     }
    // });
    const currentTab = document.querySelector(`.nav-item-text[href='#${defaultTab}']`);
    if (currentTab) {
        currentTab.classList.add('active');
    }
    await loadTab(defaultTab);
};
navItems.forEach((navItem) => {
    navItem.onclick = async () => {
        let tabId = navItem.getAttribute('href')?.replace('#', '');
        if (tabId) {
            navItems.forEach((navItem) => {
                navItem.classList.remove('active');
            });
            navItem.classList.add('active');
        }
        // if (tabId) {
        //     NameTab = tabId
        // }
        await loadTab(tabId || '');
    };
});
const tabData = {
    'personal-info': '',
    'skills': '',
    'projects': '',
};
async function loadTab(tabId) {
    if (!tabId)
        return;
    if (!tabData[tabId]) {
        const response = await fetch(`tabs/${tabId}.html`);
        const html = await response.text();
        tabData[tabId] = html;
    }
    if (mainFile) {
        mainFile.innerHTML = tabData[tabId];
    }
}
const showMoreBtn = document.getElementById('show-more');
if (showMoreBtn) {
    showMoreBtn.onclick = () => {
        const showMoreDiv = document.querySelector('.show-more');
        if (showMoreDiv.style.display === 'none' || showMoreDiv.style.display === '') {
            showMoreDiv.style.display = 'block';
        }
        else {
            showMoreDiv.style.display = 'none';
        }
    };
}
