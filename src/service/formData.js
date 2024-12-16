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
                    "value": "1",
                    "label": "one"
                },
                {
                    "value": "2",
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
                "name": "textFiled2",
                "type": "text",
                "step": 2,
                "placeholder": "Full Name2",
                "defaultValue": "",
                "value": "",
                "class": "",
                "id": ""
            },
            {
                "name": "selectFiled2",
                "type": "select",
                "step": 2,
                "placeholder": " Select 2",
                "defaultValue": "",
                "value": "",
                "class": "",
                "id": "",
                "options": [{
                    "value": "1",
                    "label": "one"
                },
                {
                    "value": "2",
                    "label": "two"
                },],
                "required": true
            }
        ]
    }
]