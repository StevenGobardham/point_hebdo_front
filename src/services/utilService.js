export default class UtilService {
    static isEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    static formatDate(dateString) {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }
    static dateToString(dateToConvert){
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return  dateToConvert.toLocaleString('fr-FR', options).substr(0, 10);
    }
}