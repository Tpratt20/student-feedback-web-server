// imports google LLM capabilities
let { GoogleGenAI, Type } = require('@google/genai')
// directs this file on where to find departments.json
let departments = require('./departments.json')

// creates new GoogleGenAI object
let genAI = new GoogleGenAI( {} )

// defines a function that constructs a prompt and stores it in a variable. The prompt is modified based on the contents of departments.json and the user feedback message. It then feeds the prompts into the genAI object, creates a promise, and returns the LLM response
function selectDepartments(message) {
    let departmentString = JSON.stringify(departments)

    let prompt = `Return a javascript list of the most likely departments to handle the following feedback message. Only include departments that seem to be a good fit for the message.
    If there does not seem to be a good fit, return an empty list.
    message: ${message}
    departments: ${departmentString}`
    
    return genAI.models.generateContent( {
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
        responseMimeType: 'application/json',
        responseSchema: {
            type:Type.ARRAY,
            items: {
                type: Type.STRING
            }
        }
    }
    }).then( response => {
        console.log(response.text)
        let departmentList = JSON.parse(response.text)
        console.log(departmentList)
        return departmentList
    })
}

// exports the selectDepartments function
module.exports = selectDepartments