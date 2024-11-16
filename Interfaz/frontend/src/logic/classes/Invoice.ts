export class InvoiceClass {
    constructor(private number: number, 
                private date: string, 
                private pharmacyId: string,
                private medicineId: string,
                private quantity: number,
                private state: string,
                private user:string) {
        this.number = number;
        this.date = date;
        this.pharmacyId = pharmacyId;
        this.medicineId = medicineId;
        this.quantity = quantity;
        this.state = state;
        this.user = user;
    }

    getNumber() {
        return this.number;
    }

    getDate() {
        return this.date;
    }

    getPharmacyId() {
        return this.pharmacyId;
    }

    getQuantity() {
        return this.quantity;
    }

    getState() {
        return this.state;
    }

    getUser() {
        return this.user;
    }

}
