export const FormData = [
    {
        "heading": "Step 1",
        "description": "Step 1 description",
        "fields": [
            {
                "name": "textFiled",
                "type": "text",
                "step": 1,
                "defaultValue": "",
                "placeholder": "Full Name",
                "value": "",
                "class": "",
                "id": "",
                "required": true
            },
            {
                "name": "selectFiled",
                "type": "select",
                "step": 1,
                "defaultValue": "",
                "placeholder": " Select",
                "value": "",
                "class": "",
                "id": "",
                "options": [{
                    "value": "one",
                    "label": "one"
                },
                {
                    "value": "two",
                    "label": "two"
                },],
            }
        ]
    },
    {
        "heading": "Step 2",
        "description": "Step 2 description",
        "fields": [
            {
                "name": "stepFiled2",
                "type": "text",
                "step": 2,
                "placeholder": "Full Name2",
                "defaultValue": "",
                "value": "",
                "class": "",
                "id": ""
            },
            {
                "name": "stepselect2",
                "type": "select",
                "step": 2,
                "placeholder": " Select 2",
                "defaultValue": "",
                "value": "",
                "class": "",
                "id": "",
                "options": [{
                    "value": "one",
                    "label": "one"
                },
                {
                    "value": "two",
                    "label": "two"
                },],
                "required": true
            }
        ]
    }, {
        "heading": "Step 3",
        "description": "Step 3 description",
        "fields": [
            {
                "name": "dateTime",
                "type": "calendar",
                "step": 3,
                "label": "Pick date & time",
                "defaultValue": "",
                "placeholder": "Pick date & time",
                "value": "",
                "slot": {
                    "2024-12-18": {
                        "fullDayBooked": false,
                        "slots": [
                            { "time": "09:00", "available": true },
                            { "time": "10:00", "available": false },
                            { "time": "11:00", "available": true },
                            { "time": "12:00", "available": true },

                        ]
                    },
                    "2024-12-19": {
                        "fullDayBooked": true,
                        "slots": []
                    },
                    "2024-12-20": {
                        "fullDayBooked": false,
                        "slots": [
                            { "time": "09:00", "available": true },

                            { "time": "16:00", "available": true },
                            { "time": "17:00", "available": false }
                        ]
                    },
                    "2024-12-21": {
                        "fullDayBooked": false,
                        "slots": [
                            { "time": "09:00", "available": true },
                            { "time": "10:00", "available": true },
                            { "time": "11:00", "available": true },

                            { "time": "16:00", "available": true },
                            { "time": "17:00", "available": true }
                        ]
                    },
                    "2024-12-22": {
                        "fullDayBooked": true,
                        "slots": []
                    }
                },
                "subfield": [{
                    "name": "fullName",
                    "type": "text",
                    "step": 3,
                    "defaultValue": "",
                    "placeholder": "Full Name",
                    "value": "",
                    "class": "",
                    "id": "",
                    "required": true
                },
                {
                    "name": "emailFiled",
                    "type": "email",
                    "step": 3,
                    "defaultValue": "",
                    "placeholder": "Enter email",
                    "value": "",
                    "class": "",
                    "id": "",
                    "required": true
                },
                {
                    "name": "phone",
                    "type": "number",
                    "step": 3,
                    "defaultValue": "",
                    "placeholder": "Enter number",
                    "value": "",
                    "class": "",
                    "id": "",
                    "required": true
                },],
                "class": "",
                "id": "",
                "required": true
            },


        ]
    },
]