var loginInfo = { user: 't3stpass@gmail.com', pass: 'T3stingpas$' }
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
    //=============================================================================
    /*                          Josh's Tests                                     */
    //=============================================================================
    'login': browser => {
        //Can I sign in then out of my account?
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
        //Does my account information persist after logging out and back in?
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
        //Sync with Old Profile Info json File
        var getInfo = fs.readFileSync('./utilities/oldProfInfo.json')
        var newInfo = JSON.parse(getInfo)
        console.log(newInfo.zip)
        //Changes zip code in profile page, then verifies zip was changed.
        page.changeZipInMenu(newInfo.zip)
        page.useXpath()
        page.expect.element(`(//a[contains(text(), "${newInfo.zip}")])[1]`).text.to.equal(newInfo.zip)
        page.useCss()
},
    //=============================================================================
    /*                           Tony's Tests                                    */
    //=============================================================================
    'Find Value of Car': browser => {
        //Can I find the value of an owned car I want to buy?
        page
            .logOut()
            .findCarValue()
    },
        'Find Value of MY Car': browser => {
            //Can I find the value of the car I own and want to sell?
            page
                .logIn(loginInfo)
                .myCarValue()
        }
}

