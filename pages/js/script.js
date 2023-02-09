document.addEventListener('DOMContentLoaded', async function () {
    const valueReminder = await chrome.storage.sync.get('icalExtensionReminder');

    if (valueReminder.icalExtensionReminder != null) {
        document.getElementById('selectReminder').value = valueReminder.icalExtensionReminder;
    }
});

selectReminder.addEventListener('change', function () {
    chrome.storage.sync.set({ 'icalExtensionReminder': document.getElementById('selectReminder').value });
});