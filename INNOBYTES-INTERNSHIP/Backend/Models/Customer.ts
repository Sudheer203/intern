import mongoose, { Schema, model, Document } from "mongoose";
import CryptoJS from "crypto-js";

// Define the interface for a Customer document
export interface ICustomer extends Document {
    firstname?: string;
    email?: string;
    password: string;
    MobileNumber: string;
    Profile?: string;
    isVerified: boolean;
    verificationCode?: string;
    verificationCodeExpires?: Date;
    generateVerificationCode: () => void;
}

// Define the Customer schema
const customerSchema: Schema<ICustomer> = new Schema({
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Profile: {
        type: String
    },
    MobileNumber: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    verificationCodeExpires: {
        type: Date
    }
});

// Define the method to generate a verification code
customerSchema.methods.generateVerificationCode = function() {
    const code = Math.floor(100000 + Math.random() * 900000).toString()    
    this.verificationCode = code;
    this.verificationCodeExpires = new Date(Date.now() + 3600000); 
};

// Create and export the Customer model
const Customer = model<ICustomer>("Customer", customerSchema);

export default Customer;
