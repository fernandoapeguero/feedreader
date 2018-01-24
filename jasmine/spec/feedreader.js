/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* url must be in every feed or code will fail  */
        it('feed should have a url', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
                expect(feed.url).toBeTruthy();
            });
        });

        /*this test check for nam in the feed if no names are available the test will fail*/
        it('feed should have a name', () => {

            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
                expect(feed.url).toBeTruthy();
            });
        });

    });


    /*test suit for site sandwith menu */
    describe('The Menu', () => {
        const hiddenMenu = document.body;
        const menuIconButton = document.querySelector('.menu-icon-link');
        const menuClass = 'menu-hidden';

        /*menu needs to be hidden by default if not this test will fail */
        it('menu should be hidden by default', () => {
            expect($(hiddenMenu).hasClass(menuClass)).toBe(true);

        });
        /* checking to see if the menu open and closes correctly */
        it('menu should open and close', () => {
            // eventlistener was not working for this purpose so i use click seem to work
            menuIconButton.click();
            expect($(hiddenMenu).hasClass(menuClass)).not.toBe(true);
            menuIconButton.click();
            expect($(hiddenMenu).hasClass(menuClass)).toBe(true);

        });
    });

    /*test suite for initial entries in the feed  */
    describe('initial Entries ', () => {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        /*checking to see if the feed element have at least one element inside and is not empty */
        it('loadfeed should have at least one element', (done) => {
            const entries = $('.feed .entry').length;
            expect(entries).toBeGreaterThan(0);
            done();
        });

    });

    /*test suite for new selection */
    describe('New Feed Selection', () => {
        let firstFeed = '';
        let secondFeed = '';
        //loading the feed to get the information to compared after in the test 
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed = $('.feed a');
            });
            loadFeed(1, function () {
                secondFeed = $('.feed a');
                done();
            });

        });
        // check for the content of the feed fater loading then in the beforeEach 
        it('content has to changes on click', (done) => {
            expect(firstFeed === secondFeed).not.toBe(true);
            done();
        });

    });
}());