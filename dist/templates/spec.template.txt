require('../spec.helper')

describe('Your test case description', () => {
    // Setup
    let array

    beforeEach(() => {
        // assign values to your variables
        array = new Array(2, 3)
    });

    it('add a descriptive test title', () => {
        // Execute code if needed
        const sum = array[0] + array[1]
        // add an assertion using the `expect` keyword
        expect(sum).to.eql(5)
    })
})