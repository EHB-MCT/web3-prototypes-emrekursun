export class FormData {
    voornaam: string = '';
    achternaam : string = '';
    email: string = '';
    doel: string = '';
    day: string = '';

    clear() {
        this.voornaam = '';
        this.achternaam = '';
        this.email = '';
        this.doel = '';
        this.day = '';
    
    }
}

export class Personal {
    voornaam: string = '';
    achternaam : string = '';
    email: string = '';
}

export class Dag {
    day: string = '';
}