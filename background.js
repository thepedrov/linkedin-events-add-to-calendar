chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: 'pages/help.html' });
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.url) {
        if (info.url.includes('linkedin.com/events/') && info.url.includes('/about') || info.url.includes('/comments')) {
            chrome.tabs.sendMessage(tabId, chrome.runtime.getManifest().name);
        } else if (info.url.includes('linkedin.com/video/event/')) {
            chrome.tabs.sendMessage(tabId, chrome.runtime.getManifest().name);
        }
    }
});