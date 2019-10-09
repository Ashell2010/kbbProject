module.exports = {
    url: 'https://www.kbb.com',
    elements: {
        //login and Misc Dropdown Menu
        loginMenu: { selector: '//div[contains(@id, "globalNavIcon")]', locateStrategy: 'xpath' },
        signInPage: '#mykbbSignInLink',
        email: '#loginEmail',
        password: '#loginPassword',
        signIn: '#myKbbSignin',
        signOut: '#mykbbSignOutLink',
        //Dropdown Menu
        changeZip: { selector: '(//div/a[contains(text(), "Change")])[1]', locateStrategy: 'xpath' },
        zipInput: { selector: '//input[contains(@aria-label, "Enter Zipcode")]', locateStrategy: 'xpath' },
        zipSave: { selector: '//button[@id="zipcodeSave"]', locateStrategy: 'xpath' },
        //Account Page
        myAcc: '#mykbbAccount',
        profName: { selector: '//div/p[contains(text(), "Name")]', locateStrategy: 'xpath' },
        profEmail: { selector: '//div/p[contains(text(), "Email")]', locateStrategy: 'xpath' },
        profZip: { selector: '//div/p[contains(text(), "ZIP")]', locateStrategy: 'xpath' },
        accPage: '#myKBBManageYourAccount',
        updtProf: { selector: '//a[contains(@data-button, "updateProfile")]', locateStrategy: 'xpath' },
        updtSubmit: '#updateProfile',
        updtFirst: { selector: '//input[contains(@name, "firstname")]', locateStrategy: 'xpath' },
        updtLast: { selector: '//input[contains(@name, "lastname")]', locateStrategy: 'xpath' },
        updtZip: { selector: '//input[contains(@name, "zipcode")]', locateStrategy: 'xpath' },
        ownVeh: '#myKBBOwn',
        savVeh: '#myKBBSavedVehicles'
    },
    commands: [
        {
            logIn: function (loginInfo) {
                this
                    .waitForElementVisible('@loginMenu', 10000)
                    .click('@loginMenu')
                    .click('@signInPage')
                    .waitForElementVisible('@email')
                    .clearValue('@email')
                    .setValue('@email', loginInfo.user)
                    .clearValue('@password')
                    .setValue('@password', loginInfo.pass)
                    .click('@signIn')
                    .pause(1000)
                return this
            }
        },
        {
            logOut: function () {
                this
                    .waitForElementVisible('@loginMenu')
                    .click('@loginMenu')
                    .waitForElementVisible('@signOut')
                    .click('@signOut')
                    .waitForElementVisible('@loginMenu')
                    .pause(1000)
                    .click('@loginMenu')
                    .verify.containsText('@signInPage', 'Sign In')
                    .pause(1000)
                    .click('@loginMenu')
                    .pause(1000)
                return this
            }
        },
        {
            changeZipInMenu: function (zip) {
                this
                    .waitForElementVisible('@loginMenu', 10000)
                    .click('@loginMenu')
                    .waitForElementVisible('@changeZip')
                    .click('@changeZip')
                    .clearValue('@zipInput')
                    .setValue('@zipInput', zip)
                    .click('@zipSave')
                    .waitForElementVisible('@loginMenu', 10000)
                    .pause(1000)
                    .click('@loginMenu')
                return this
            }
        },
        //Account Sub Pages
        {
            navMyAcct: function () {
                this
                    .waitForElementVisible('@loginMenu')
                    .click('@loginMenu')
                    .waitForElementVisible('@myAcc')
                    .click('@myAcc')
                return this
            }
        },
        {
            updateAcctInfo: function (newInfo) {
                var oldFirst = ''
                var oldLast = ''
                var oldZip = ''
                this
                    .click('@updtProf')
                    .waitForElementVisible('@updtFirst')
                    .getAttribute('@updtFirst', 'value', function (result) {
                        oldFirst = result.value
                        console.log(oldFirst)
                    })
                    .getAttribute('@updtLast', 'value', function (result) {
                        oldLast = result.value
                        console.log(oldLast)
                    })
                    .getAttribute('@updtZip', 'value', function (result) {
                        oldZip = result.value
                        console.log(oldZip)
                    })
                    .clearValue('@updtFirst')
                    .setValue('@updtFirst', newInfo.first)
                    .clearValue('@updtLast')
                    .setValue('@updtLast', newInfo.last)
                    .clearValue('@updtZip')
                    .setValue('@updtZip', newInfo.zip)
                    .click('@updtSubmit')
                    .pause(1000)
                    .perform(() => {
                        var fs = require("fs")
                        this
                        let oldFileInfo = { first: oldFirst, last: oldLast, zip: oldZip }
                        let newData = JSON.stringify(oldFileInfo)
                        fs.writeFileSync('./utilities/oldProfInfo.json', newData)
                    })
                return this
            }
        },
        {
            navSavedVehicles: function () {
                this
                    .waitForElementVisible('@loginMenu')
                    .click('@loginMenu')
                    .waitForElementVisible('@myAcc')
                    .click('@myAcc')
                    .waitForElementVisible('@savVeh')
                    .click('@savVeh')
                return this
            }
        },
        {
            navOwnedVehicles: function () {
                this
                    .waitForElementVisible('@loginMenu')
                    .click('@loginMenu')
                    .waitForElementVisible('@myAcc')
                    .click('@myAcc')
                    .waitForElementVisible('@ownVeh')
                    .click('@ownVeh')
                return this
            }
        }
    ]
}