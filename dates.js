const available = ['en_us', 'pt_br'];

const locale = document.querySelector('meta[name="i18nLocale"]').content.toLowerCase();


function isAvailable() {
    if (available.includes(locale) === false) {
        if (window.confirm(`This feature is not available for your current language.

It is only available for:
${available.sort()}

You can change to one of these, here:
https://www.linkedin.com/mypreferences/d/language/

Do you want to go there?`)) {
            window.open('https://www.linkedin.com/mypreferences/d/language/', '_blank');
        };

        return false;
    }

    return true;
}


function getDates(htmlFullDate) {
    switch (locale) {
        case 'en_us':
            return en_us.getDates(htmlFullDate);
        case 'pt_br':
            return pt_br.getDates(htmlFullDate);
        default:
            throw new Error('Something went badly wrong!');
    }
}