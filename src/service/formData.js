export const FormData = [
    {
        "heading": "Booking 1",
        "description": "Step 1 description",
        "fields": [
            {
                "name": "textFiled",
                "type": "text",
                "step": 1,
                "label": "First Name",

                "defaultValue": "",
                "placeholder": " Name",
                "value": "",
                "class": "",
                "id": "",
                "required": true
            },
            {
                "name": "email",
                "type": "text",
                "step": 1,
                "label": "email",

                "defaultValue": "",
                "placeholder": "demo@yopmail.com",
                "value": "",
                "class": "",
                "id": "",
                "required": true
            },
            {
                "name": "selectFiled",
                "type": "select",
                "step": 1,
                "label": "Select Gender",

                "defaultValue": "",
                "placeholder": "Gender",
                "value": "",
                "class": "",
                "id": "",
                "options": [
                    {
                        "value": "men",
                        "label": "Men"
                    },
                    {
                        "value": "women",
                        "label": "Women"
                    }
                ]
            }, {
                "name": "address",
                "type": "text",
                "step": 1,
                "label": "Address",

                "defaultValue": "",
                "placeholder": "Your address",
                "value": "",
                "class": "",
                "id": "",
                "required": false
            },
        ]
    },
    {
        "heading": "Booking 2",
        "description": "Step 2 description",
        "fields": [
            {
                "name": "stepFiled2",
                "type": "text",
                "step": 2,
                "label": "Last Name",

                "placeholder": "Last Name",
                "defaultValue": "",
                "value": "",
                "class": "",
                "id": ""
            },
            {
                "name": "phone",
                "type": "number",
                "step": 2,
                "label": "phone No",

                "placeholder": "Enter phone no",
                "defaultValue": "",
                "value": "",
                "class": "",
                "id": ""
            },
            {
                "name": "stepselect2",
                "type": "select",
                "step": 2,
                "label": "Select your seat",

                "placeholder": "Select 2",
                "defaultValue": "",
                "value": "",
                "class": "",
                "id": "",
                "options": [
                    {
                        "value": "one",
                        "label": "one"
                    },
                    {
                        "value": "two",
                        "label": "two"
                    }
                ],
                "required": true
            },
            {
                "name": "description",
                "type": "text",
                "step": 2,
                "label": "Description",

                "placeholder": "Description",
                "defaultValue": "",
                "value": "",
                "class": "",
                "id": ""
            },
        ]
    },
    {
        "heading": "Booking 3",
        "description": "Step 3 description",
        "fields": [
            {
                "name": "dateTime",
                "type": "calendar",
                "step": 3,
                "label": " Date & Time",
                "defaultValue": "",
                "placeholder": "Pick date & time",
                "value": "",
                "slots": [
                    {
                        "slotId": "slot1",
                        "enable": true,
                        "startTime": "17:00",
                        "endTime": "19:00"
                    }

                ],
                "class": "",
                "id": "",
                "required": false
            }
        ]
    },
    {
        heading: "Booking  4",

        description: "Step 4 description",
        fields: [{ name: "summary", label: "Summary", type: "", }],

    }
];
