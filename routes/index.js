const express = require('express')
const router = express.Router()
const messageSorter = require('../services/message_sorting')
// figures out what code to run in response to a request. Typically based on URL, and the method

// responds to get request to home page
router.get('/', function(req, res, next) { //request, response, next
    // name of Handlebars file - name of a template, optional object with data template
    res.render('index', {title: 'Feedback Application',
        author: 'Tyler',
        timePageLoadedAt: new Date()
    })
}) // get request to the home page

router.get('/feedback-form', function(req, res, next) {
    res.render('student_feedback_form')
})

router.post('/submit-feedback', function(req, res, next) {
    // access form data
    // const formData = req.query // for a GET request
    const formData = req.body // for a POST request
    console.log(formData)

    let message = formData.comments

    messageSorter(message).then(departmentList => {
        // departmentList will be an array - either of departments or empty list
        if (departmentList.length === 0) {
            departmentList = ['General college feedback']
        }
        console.log('Departments to contact', departmentList)
        return res.render('thank_you', { 
            name: formData['student-name'],
            email: formData['student-email'],
            comments: formData['student-comment'],
            currentStudent: formData['current-student'],
            departmentList: departmentList
    })
    })

    // potential todo in future - save to a database
    // - automatically email someone when feedback is submitted


})





module.exports = router // this line needs to be the very last line