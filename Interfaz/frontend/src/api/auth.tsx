import axios from './axios';
import { User } from '../logic/classes/User'

type UserData = {
    username: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    rol: string;
};

type InvoiceData = {
    number: number;
    date: string;
    pharmacy: string;
    medicine: string;
    quantity: number;
    image: string;
    state: string;
};

type MedicineData = {
    name: string;
    description: string;
    redeeming_points: number;
    points_given: number;
};

export const registerRequest = (userData : UserData) => {return axios.post(`/register`, userData);};
export const loginRequest = (userData : {username : string, password : string}) => 
    axios.post(`/login`, userData);
export const verifyTokenRequest = () => axios.get(`/verify`);
 
//Invoices
export const createInvoice = (invoice : InvoiceData) => {
    return axios.post('/createInvoice',invoice);
}

export const getAllInvoices = () => axios.get('/get-all-invoice'); 
export const filterInvoices = (stateFilter:any, dateRangeFilter:any, searchInvoiceNumber:any, userFilter: any) => axios.get('/filter-invoices', {
  params:{stateFilter, dateRangeFilter, searchInvoiceNumber, userFilter}
});
export const getImage = (number: any) => axios.get('/getImage', {params: {number}});

export const setInvoiceState = (update:{number:number, state:string}) => axios.post('/set-invoice-state', update)

//Medicines
export const getMedicines = () => {return axios.get('/getmedicines');};
export const filterMedicines = (searchName: any, inBenefitsProgram: any) => axios.get('/filter-medicines', {
    params: {searchName, inBenefitsProgram}
});
export const updateRedeemPoints = (medicine: MedicineData) => axios.put('/updateRedeem', medicine);
export const updateGivenPoints = (medicine: MedicineData) => axios.put('/updateGiven', medicine);
export const getAllPharmacies = () => axios.get('/get-all-pharmacies');

