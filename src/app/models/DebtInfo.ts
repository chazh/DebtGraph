export interface DebtInfo {
    name: string;
    balance: number;
    payment: number;
    interestRate: number;
    type: string;
    hold: boolean;
    holdUntil: string;
    notes: string;
    estimatedNumberOfPayments: number;
    estimatedPayoffDate: Date;
    interestPaid: number;
}


