chrome.runtime.onMessage.addListener(function (msg) {
    if (msg === chrome.runtime.getManifest().name) {
        generateButton();
    }
});


// <matches - manifest>
let url = window.location.toString();

url = (url.includes('/events/')) ? url.split('/events/') : url.split('/video/event/');

if (url[1] !== undefined && url[1].length > 0) {
    generateButton();
}
// </matches - manifest>


function generateButton() {
    if (!document.getElementById('ember000-1')) {
        const button = `<div class="events-live-top-card__cta">
                            <button id="ember000-1" class="artdeco-button artdeco-button--2 artdeco-button--primary ember-view" style="background-color: #dc3545" title="Save to an .ics file (calendar file to Apple Calendar, Google Calendar, Outlook and others) and add to your calendar">
                                <span class="artdeco-button__text">iCal File</span>
                            </button>
                        </div>`;

        const threeDots = document.querySelector('path[d="M3 9.5A1.5 1.5 0 114.5 8 1.5 1.5 0 013 9.5zM11.5 8A1.5 1.5 0 1013 6.5 1.5 1.5 0 0011.5 8zm-5 0A1.5 1.5 0 108 6.5 1.5 1.5 0 006.5 8z"]');

        if (threeDots != null) {
            threeDots.parentElement.parentElement.parentElement.parentElement.parentElement.insertAdjacentHTML('beforebegin', button);
        } else {
            document.querySelector('#events-top-card div.inline-block.events-live-top-card__cta').insertAdjacentHTML('beforebegin', button);
        }

        document.addEventListener('mouseover', function (e) {
            if (e.target.closest('#ember000-1')) {
                document.getElementById('ember000-1').style.backgroundColor = '#c82333';
            }
        });

        document.addEventListener('mouseout', function (e) {
            if (e.target.closest('#ember000-1')) {
                document.getElementById('ember000-1').style.backgroundColor = '#dc3545';
            }
        });

        document.addEventListener('click', function (e) {
            if (e.target.closest('#ember000-1')) {
                downloadFile();
            }
        });
    }
}


function downloadFile() {
    if (isAvailable() === false) {
        return;
    }

    initDownload(getContent());
}


function initDownload(content) {
    let a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([content.content], { type: 'text/calendar' }));
    a.download = (content.filename + '.ics');

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}


function getContent() {
    const summary = document.querySelector('h1[data-event-id]').innerText;

    const iconDate = document.querySelector('#events-top-card li-icon[type="calendar"]');

    const htmlFullDate = (iconDate != null) ? iconDate.parentElement.querySelector('span') : document.querySelector('span.mr2');

    const dates = getDates(htmlFullDate.innerText);

    let content = `BEGIN:VCALENDAR
PRODID:${chrome.runtime.getManifest().name}
VERSION:2.0
METHOD:PUBLISH
BEGIN:VEVENT
UID:${document.querySelector('h1[data-event-id]').getAttribute('data-event-id')}
CLASS:PUBLIC
SUMMARY:${summary}
DTSTART:${dates.startDate}
DTEND:${dates.endDate}
DTSTAMP:${dates.currentDate}
LOCATION:${window.location.toString().replace(/\/(about|comments)\//, '')}
TRANSP:OPAQUE`;

    if (valueReminder.icalExtensionReminder != null && valueReminder.icalExtensionReminder > -1) {
        content += `
BEGIN:VALARM
TRIGGER:-PT${valueReminder.icalExtensionReminder}M
ACTION:DISPLAY
DESCRIPTION:${summary}
END:VALARM`;
    }

    content += `
END:VEVENT
END:VCALENDAR`;

    return { filename: summary, content: content };
}


// <Reminder>
var valueReminder;

async function getReminder() {
    valueReminder = await chrome.storage.sync.get('icalExtensionReminder');
}

getReminder();
// </Reminder>