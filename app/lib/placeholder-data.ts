// This file contains placeholder data that will be used to seed the database

import { User, Customer, Invoice, Revenue } from './definitions';

// Placeholder Users
export const users: User[] = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
    },
];

// Placeholder Customers
export const customers: Customer[] = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Delba de Oliveira',
        email: 'delba@example.com',
        image_url: '/customers/delba-de-oliveira.png',
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Lee Robinson',
        email: 'lee@example.com',
        image_url: '/customers/lee-robinson.png',
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        name: 'Hector Simpson',
        email: 'hector@example.com',
        image_url: '/customers/evil-rabbit.png',
    },
    {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        name: 'Michael Novotny',
        email: 'michael@example.com',
        image_url: '/customers/michael-novotny.png',
    },
    {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        name: 'Amy Burns',
        email: 'amy@example.com',
        image_url: '/customers/amy-burns.png',
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        name: 'Balazs Orban',
        email: 'balazs@example.com',
        image_url: '/customers/balazs-orban.png',
    },
];

// Placeholder Invoices
export const invoices: Invoice[] = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        customer_id: customers[0].id,
        amount: 15795,
        status: 'pending',
        date: '2022-12-06',
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442b',
        customer_id: customers[1].id,
        amount: 20348,
        status: 'pending',
        date: '2022-11-14',
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442c',
        customer_id: customers[4].id,
        amount: 3040,
        status: 'paid',
        date: '2022-10-29',
    },
    {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120003',
        customer_id: customers[3].id,
        amount: 44800,
        status: 'paid',
        date: '2023-09-10',
    },
    {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442d',
        customer_id: customers[5].id,
        amount: 34577,
        status: 'pending',
        date: '2023-08-05',
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f3',
        customer_id: customers[2].id,
        amount: 54246,
        status: 'pending',
        date: '2023-07-16',
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442e',
        customer_id: customers[0].id,
        amount: 666,
        status: 'pending',
        date: '2023-06-27',
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442f',
        customer_id: customers[2].id,
        amount: 32545,
        status: 'paid',
        date: '2023-06-09',
    },
    {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442g',
        customer_id: customers[4].id,
        amount: 1250,
        status: 'paid',
        date: '2023-06-17',
    },
    {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120004',
        customer_id: customers[3].id,
        amount: 8546,
        status: 'paid',
        date: '2023-06-07',
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442h',
        customer_id: customers[1].id,
        amount: 500,
        status: 'paid',
        date: '2023-08-19',
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f4',
        customer_id: customers[5].id,
        amount: 8945,
        status: 'pending',
        date: '2023-06-03',
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442i',
        customer_id: customers[2].id,
        amount: 8945,
        status: 'paid',
        date: '2023-06-18',
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442j',
        customer_id: customers[0].id,
        amount: 8945,
        status: 'paid',
        date: '2023-10-04',
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442k',
        customer_id: customers[2].id,
        amount: 1000,
        status: 'pending',
        date: '2022-06-05',
    },
];

// Placeholder Revenue
export const revenue: Revenue[] = [
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2200 },
    { month: 'Apr', revenue: 2500 },
    { month: 'May', revenue: 2300 },
    { month: 'Jun', revenue: 3200 },
    { month: 'Jul', revenue: 3500 },
    { month: 'Aug', revenue: 3700 },
    { month: 'Sep', revenue: 2500 },
    { month: 'Oct', revenue: 2800 },
    { month: 'Nov', revenue: 3000 },
    { month: 'Dec', revenue: 4800 },
];

