var pt_br = {
    getDates: function (htmlFullDate) {
        const dates = htmlFullDate.split(' - ');

        let startDate = dates[0].split(', ');

        const haveDayOfTheWeek = (startDate.length === 3);

        const startDate_Date = this.getDateiCalFormat(startDate[(haveDayOfTheWeek ? 1 : 0)]);

        let endDate = dates[1].replace(' (seu horário local)', '');

        if (endDate.includes(',')) {
            // Event starts on one day and ends on another

            endDate = endDate.split(', ');
            endDate = (this.getDateiCalFormat(endDate[0]) + this.getTimeiCalFormat(endDate[1]));
        } else {
            endDate = (startDate_Date + this.getTimeiCalFormat(endDate));
        }

        startDate = (startDate_Date + this.getTimeiCalFormat(startDate[(haveDayOfTheWeek ? 2 : 1)]));

        let currentDate = new Date();
        currentDate = currentDate.toISOString().split('.')[0].replaceAll('-', '').replaceAll(':', '');

        return { startDate: startDate, endDate: endDate, currentDate: currentDate };
    },
    getDateiCalFormat: function (date) {
        date = date.split(' de ');

        const year = date[2];
        const month = this.getMonthiCalFormat(date[1].replace('.', '').toLowerCase());
        let day = date[0];

        if (day.length === 1) {
            day = ('0' + day);
        }

        return (year + month + day);
    },
    getTimeiCalFormat: function (date) {
        return ('T' + date.replace(':', '') + '00');
    },
    getMonthiCalFormat: function (month) {
        switch (month) {
            case 'jan':
                return '01';
            case 'fev':
                return '02';
            case 'mar':
                return '03';
            case 'abr':
                return '04';
            case 'mai':
                return '05';
            case 'jun':
                return '06';
            case 'jul':
                return '07';
            case 'ago':
                return '08';
            case 'set':
                return '09';
            case 'out':
                return '10';
            case 'nov':
                return '11';
            case 'dez':
                return '12';
            default:
                throw new Error('Something went badly wrong!');
        }
    }
};