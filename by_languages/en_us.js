var en_us = {
    getDates: function (htmlFullDate) {
        const dates = htmlFullDate.split(' - ');

        let startDate = Date.parse(dates[0]);
        const startDate_Date = this.getDateiCalFormat(startDate);

        let endDate = dates[1].replace(' (your local time)', '');

        if (endDate.includes(',')) {
            // Event starts on one day and ends on another

            endDate = Date.parse(endDate);
            endDate = (this.getDateiCalFormat(endDate) + this.getTimeiCalFormat(endDate));
        } else {
            endDate = (startDate_Date + this.getTimeiCalFormat(Date.parse('Jan, 1, 0000, ' + endDate)));
        }

        startDate = (startDate_Date + this.getTimeiCalFormat(startDate));

        let currentDate = new Date();
        currentDate = (this.getDateiCalFormat(currentDate) + this.getTimeiCalFormat(currentDate));

        return { startDate: startDate, endDate: endDate, currentDate: currentDate };
    },
    getDateiCalFormat: function (date) {
        const year = Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);
        const month = Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(date);
        const day = Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date);

        return (year + month + day);
    },
    getTimeiCalFormat: function (date) {
        const hours = Intl.DateTimeFormat('en-US', { hour: '2-digit', hour12: false }).format(date);
        let minutes = Intl.DateTimeFormat('en-US', { minute: '2-digit' }).format(date);

        if (minutes.length === 1) {
            minutes = ('0' + minutes);
        }

        return ('T' + hours + minutes + '00');
    }
};