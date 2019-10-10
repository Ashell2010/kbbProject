var loginInfo = { user: 'jtaylor.rk@gmail.com', pass: 't3stpass' }
var page
module.exports = {
    beforeEach: browser => {
        page = browser.page.kbbPage()
        page.navigate()
    },
    after: browser => {
        browser.pause()
    },
    'login': browser => {
        //Test (Can I sign in then out of my account?)
        page
            .logIn(loginInfo)
    }
}