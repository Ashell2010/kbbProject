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
        savVeh: '#myKBBSavedVehicles',
        //Tony's Selectors
        certPreOwned: '#cpoVehicle',
        used: '#usedVehicle',
        new: '#newVehicle',
        carYear: '#slp-dropdown-year option[value="2015"]',
        carMake: '#slp-dropdown-make option[value="13"]',
        carModel: '#slp-dropdown-model option[value="journey"]',
        carPrice: 'class="js-path-next button-one"',
        noOptions: '[class="js-path-next-default button-four"]',
        // valueHeader: '[class="css-j8rptd-StyledHeading1-defaultStyles-h1 e1jv8h5t0"]',
        valueHeader: '.css-ga5hoy',
        confYear: '[class="intent-year"]',
        carInfo: '[class="title-three zip-geolocation__header--line-height"]',
        carStyleConf: '[class="vehicle-title col-base-12 vertical-spacing-padding-bottom vertical-spacing-padding-top"]',
        certPriceBtn: '[href="/dodge/journey/2015/avp-sport-utility-4d/?vehicleid=400621&intent=buy-used&mileage=64326&pricetype=cpo&condition=very-good"]',
        // My Car Vale Selector
        myYear: '#yearDropdown option[value="2015"]',
        myMake: '#makeDropdown option[id="13"]',
        myModel: '#modelDropdown option[id="14956"]',
        // nextBtn: '//a[text()="Next"]',
        nextBtn: { selector: '//a[text()="Next"]', locateStrategy: 'xpath' },
        //F***ing error popup
        popup: '#fsrInvite',
        closePopup: '#fsrFocusFirst'
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
                    .pause(1000)
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
        },
        {
            clickButtonByText: function (text) {
                this
                    .useXpath()
                this
                    .click(`//a[contains(text(), '${text}')]`)
                    .useCss()
                return this
            }
        },
        {
            nextButton: function (text) {
                this
                    .useXpath()
                this
                    .click(`//button[contains(text(), '${text}')]`)
                    .useCss()
                return this
            }
        },
        {
            styleButton: function (text) {
                this
                    .useXpath()
                this
                    .click(`//div[contains(text(), '${text}')]`)
                    .useCss()
                return this
            }
        },
        {
            scrollDownBy: function (pixels) {
                this
                    .api.execute(`window.scrollBy(0, ${pixels})`)
                return this
            }
        },
        {
            findCarValue: function () {
                // Get A Value Any Car
                this
                    .clickButtonByText('Car Values')
                this
                    .expect.url().to.contain('car-values')
                this
                    .pause(2000)
                this
                    .click('@certPreOwned')
                    .click('@carYear')
                    .click('@carMake')
                    .click('@carModel')
                    .pause(1000)
                    .nextButton('Next')
                this
                    .waitForElementVisible('@carStyleConf')
                    .verify.containsText('@carStyleConf', "2015 Dodge Journey")
                    .styleButton('AVP Sport Utility 4D')
                this
                    .verify.containsText('@carStyleConf', "2015 Dodge Journey AVP Sport Utility 4D")
                    .checkClick('@noOptions')
                    .waitForElementVisible('@certPriceBtn')
                    .scrollDownBy(500)
                    .pause(5000)
                    .clickButtonByText('Get a Certified Car Price')
                this
                    .pause(2000)
                this
                    .verify.containsText('@confYear', "2015")
                    .verify.containsText('@carInfo', "Dodge Journey AVP Sport Utility 4D")
                return this
            }
        },
        {
            myCarValue: function () {
                // Sign In
                this
                    // Get A Cars Value
                    .pause(1000)
                    .clickButtonByText('Get a Value')
                if (this.api.url('https://www.kbb.com/whats-my-car-worth/?ico=a')) {
                    this.api.url('https://www.kbb.com/whats-my-car-worth/')
                }
                this
                    .pause(1000)
                this
                    .click('@myYear')
                    .click('@myMake')
                    .click('@myModel')
                    .setValue('#mileage', '867530')
                    .scrollDownBy(200)
                    .setValue('#zipcode', '84097')
                    .pause(1000)
                this
                    .checkClick('.button-wrapper')
                    .pause(1000)
                    .checkClick('[for="AVPSportUtility4DSelectStyle"]')
                    .waitForElementPresent('@nextBtn')
                    .pause(1000)
                this
                    .checkClick('@nextBtn')
                this
                // if (this.url('https://www.kbb.com/dodge/journey/2015/avp-sport-utility-4d/options/?vehicleid=400621&intent=trade-in-sell&mileage=867530&modalview=false')) {
                //     this.url('https://www.kbb.com/dodge/journey/2015/avp-sport-utility-4d/options/?vehicleid=400621&intent=trade-in-sell&mileage=213434&modalview=false')
                // }
                this
                    .checkClick('#standardRadio')
                    .scrollDownBy(200)
                    .waitForElementPresent('#cbxOptionId6395316')
                    .checkClick('#cbxOptionId6395316')
                    .pause(1000)
                this
                    .waitForElementPresent('#conditionfair')
                    .click('#conditionfair')
                    .waitForElementPresent('#stylesNextButton')
                    .checkClick('#stylesNextButton')
                    .pause(9000)
                this
                    .waitForElementPresent('[class="icon-heart-outline blue-icon"]')
                    .checkClick('[class="icon-heart-outline blue-icon"]')
                return this

            }
        },
        {
            checkClick: function (selector) {
                this.pause(2000)
                if (this.verify.elementNotPresent('@popup')) {}
                else {this.clickButtonByText('No thanks')}
                this.click(selector)
                return this
            }
        }
    ]
}