const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config.sendgrid.key

const sgMail =  require('@sendgrid/mail');

exports.firestoreEmail = functions.firestore
    .document('users/{userId}')
    .onUpdate(event => {
			const db = admin.firestore();

    })
