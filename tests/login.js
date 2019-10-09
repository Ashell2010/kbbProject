var loginInfo = { user: 'jtaylor.rk@gmail.com', pass: 't3stpass' }
var fs = require("fs")
require('../utilities/oldProfInfo')
var page
module.exports = {
    beforeEach: browser => {
        page = browser.page.kbbPage()
        page.navigate()
    },
    after: browser => {
        browser.end()
    },
    'login': browser => {
        //Test (Can I sign in then out of my account?)
        page
            .logIn(loginInfo)
            .navMyAcct()
            .verify.containsText('@profEmail', loginInfo.user)
            .logOut()
    },
    'Update Account Info': browser => {
        //Synv with Old Profile Info json File
        var getInfo = fs.readFileSync('./utilities/oldProfInfo.json')
        var newInfo = JSON.parse(getInfo)
        //Test (Does my account information persist after logging out and back in?)
        page
            .logIn(loginInfo)
            .navMyAcct()
            .updateAcctInfo(newInfo)
            .logOut()
            .logIn(loginInfo)
            .navMyAcct()
            .verify.containsText('@profName', newInfo.first + ' ' + newInfo.last)
            .verify.containsText('@profEmail', loginInfo.user)
            .verify.containsText('@profZip', newInfo.zip)

    },
    'Update Zip in Menu Dropdown': browser => {
        //Synv with Old Profile Info json File
        var getInfo = fs.readFileSync('./utilities/oldProfInfo.json')
        var newInfo = JSON.parse(getInfo)
        console.log(newInfo.zip)
        //Test (Changes, then verifies zip was changed.)
        page.changeZipInMenu(newInfo.zip)
        page.useXpath()
        page.expect.element(`(//a[contains(text(), "${newInfo.zip}")])[1]`).text.to.equal(newInfo.zip)
        page.useCss()
    }

}
