export const validationMessages = {
    'mobile': [
        { type: 'required', message: 'Mobile number is required.' },
        {
            type: 'minlength',
            message: 'Mobile must be at least 10 characters long.'
        },
        {
            type: 'maxlength',
            message: 'mobile cannot be more than 10 characters long.'
        }
    ],
    'date': [
        { type: 'required', message: 'Date is required.' }
    ],
    'name': [
        { type: 'required', message: 'Please enter name.' }
    ],
    'description': [
        { type: 'required', message: 'Description is required.' }
    ]
};