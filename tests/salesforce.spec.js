import { test, expect } from '@playwright/test'
import { ai } from '@zerostep/playwright'

const email = 'siva8kolli-kybe@force.com'
const password = 'Appium@123'
const hostname = 'data-inspiration-1691.lightning.force.com'

test.describe('Salesforce', () => {
  test('create an opportunity', async ({ page }) => {
    await page.goto('https://login.salesforce.com')
    await ai(`Enter the username ${email}`, { page, test })
    await ai(`Enter the password ${password}`, { page, test })
    await page.click('text="Log In"')

    // Only reaches here if we are successfully authenticated
    await page.waitForSelector('text="Home"')

    // Navigate directly to Sales app
    await page.goto(`https://${hostname}/lightning/page/home`)
    await page.waitForSelector('text="Create your first contact"')

    await ai('Click on Create your first contact link', { page, test })
    //await page.click('text="Create your first contact"')

    // Wait for 'New contact' form to be displayed
    await page.waitForSelector('text="Dismiss"')
    await ai('Click on Dismiss button', { page, test })
    await page.waitForSelector('div[title="New"]')
    await page.click('div[title="New"]')
    //await ai('Click on New button', { page, test })
    

    await page.waitForSelector('text="New Contact"')

    await ai(`Open Salutation dropdown`, {page, test})
    await ai('Click on Mr text', { page, test })
    await ai('Enter TestFirstName in the contact first name input', { page, test })
    await ai('Enter TestLasttName in the contact last name input', { page, test })
    //await ai(`Enter '12000' in the Amount field.`, { page, test })
    await ai('Enter Mr in the contact title input', { page, test })

    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    const closeDate = thirtyDaysFromNow.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })

    await ai(`Input ${closeDate} into the Close Date field`, { page, test })
    await ai('Click on the Stage dropdown', { page, test })
    await ai('Click on the Needs Analysis option', { page, test })
    await ai('Click Save', { page, test })

    const result = await ai('What is the current stage of the opportunity?', { page, test })
    expect(result).toEqual('Needs Analysis')
  })
})