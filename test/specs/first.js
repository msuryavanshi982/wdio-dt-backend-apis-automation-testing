const assert = require("assert");

describe("INDMAX Digital Twin Login", async () => {
  it("should allow successful login", async () => {
    // Navigate to the login page
    await browser.url("http://34.29.169.181:3000/login/");

    // Enter valid username and password
    const username = "dev@algo8.ai";
    const password = "Algo8@2023";

    // Enter the username and password
    const usernameField = await $('.login input[name="Email"]');
    const passwordField = await $('.login input[name="Password"]');
    const signInButton = await $('.login input[type="submit"]');
    await usernameField.setValue(username);
    await passwordField.setValue(password);

    // Click on the "Sign In" button
    await signInButton.click();
    await browser.waitUntil(
      async () => {
        const title = await browser.getTitle();
        return title === "Digital Twin";
      },
      {
        timeout: 50000, // Adjust the timeout as needed
        timeoutMsg: 'Title did not change to "Digital Twin" after login',
      }
    );

    await expect(browser).toHaveTitle("Digital Twin");
  });

  it("Main Page", async () => {
    await browser.url("http://34.29.169.181:3000/");
    await expect(browser).toHaveTitle("Digital Twin");
    await browser.pause(1000);
  });

  it("should verify header information", async () => {
    await browser.url("http://34.29.169.181:3000/");

    // Wait for the page to load
    await browser.pause(1000);

    // Verify the header text "Digital Twin | INDMAX"
    const headerText = await browser.$(
      ".MuiTypography-root.MuiTypography-body1.css-1jvg22c"
    );
    const text = await headerText.getText();
    assert.strictEqual(text, "Digital Twin | INDMAX");

    // Verify the "Paradip Refinery" text
    const refineryText = await browser.$(".MuiStack-root.css-1lnp4vl > div");
    const refineryTextValue = await refineryText.getText();
    assert.strictEqual(refineryTextValue, "Paradip Refinery");

    // Verify the "Last updated on" text and date
    const lastUpdatedText = await browser.$(".MuiBox-root.css-19daxg8 > div");
    const lastUpdatedValue = await lastUpdatedText.getText();
    assert.strictEqual(lastUpdatedValue.includes("Last updated on"), true);
  });

  it("should verify INDMAX PERFORMANCE text", async () => {
    await browser.url("http://34.29.169.181:3000/");

    // Execute your test actions here
    const divText = await browser.$(
      "div.MuiTypography-root.MuiTypography-body1.css-k6wp8o"
    );
    const text = await divText.getText();

    // Assert that the text matches your expected value
    assert.strictEqual(text, "INDMAX PERFORMANCE");
  });

  it("should test the sub-title in a unique context", async () => {
    // Open the web page
    await browser.url("http://34.29.169.181:3000/");

    // Locate the "Operational Effectiveness" sub-title
    // Find all matching elements and choose the desired index
    const containers = await $$(".MuiPaper-root .sub-title");

    // Choose the desired index (adjust as needed)
    const container = await containers[0];

    // Check if the container exists
    if (container) {
      // Perform your specific tests for the sub-title content or attributes
      const subTitleText = await container.getText();
      assert.strictEqual(
        subTitleText,
        "Operational Effectiveness",
        "Unexpected sub-title content"
      );
    }
  });

  it('should verify "Profitability" text and presence of "₹", "L", and "%" symbol', async () => {
    await browser.url("http://34.29.169.181:3000/");

    // Find Profitability element using XPath
    const profitabilityElement = await $(
      '//div[contains(text(), "Profitability")]'
    );

    // Check if the Profitability element exists
    if (profitabilityElement) {
      const profitabilityText = await profitabilityElement.getText();

      // Perform your specific tests for the sub-title content or attributes
      assert.strictEqual(
        profitabilityText,
        "Profitability",
        "Unexpected sub-title content"
      );

      // Find the div element containing the "₹" and "L" symbols
      const divElement = await $(
        'div[style*="font-size: 18px; font-weight: 700;"]'
      );
      await browser.waitUntil(
        async () => {
          const textContent = await divElement.getText();
          return textContent.includes("₹") && textContent.includes("L");
        },
        {
          timeout: 5000,
          timeoutMsg: "Expected symbols not found in the div element",
        }
      );

      // Assert the presence of the "₹" and "L" symbols
      const textContent = await divElement.getText();
      await assert(textContent.includes("₹"), 'The "₹" symbol is not present.');
      await assert(textContent.includes("L"), 'The "L" symbol is not present.');

      // Find the div element containing the "%" symbol using a unique selector
      const percentDivElement = await $(
        'div[style*="font-size: 12px; font-weight: 600; color: rgb(159, 159, 159);"]'
      );
      await browser.waitUntil(
        async () => {
          const textContent1 = await percentDivElement.getText();
          return textContent1.includes("%");
        },
        {
          timeout: 5000,
          timeoutMsg: 'Expected "%" symbol not found in the div element',
        }
      );

      // Get the text content of the div and convert it to a string
      const textContent1 = await percentDivElement.getText();

      // Assert the presence of the "%" symbol
      assert(
        textContent1.includes("%"),
        'The "%" symbol is not present in Profitability block.'
      );
    } else {
      throw new Error("Profitability element not found");
    }
  });

  it('should verify "Energy Efficiency" text and presence of "%" symbol', async () => {
    await browser.url("http://34.29.169.181:3000/");

    // Find the div containing "Energy Efficiency" text
    const energyEfficiencyElement = await $(
      '//div[contains(text(), "Energy Efficiency")]'
    );

    // Get the text content of the div
    if (energyEfficiencyElement) {
      const textContent = await energyEfficiencyElement.getText();

      // Assert that "Energy Efficiency" text is present
      assert(
        textContent.includes("Energy Efficiency"),
        'The "Energy Efficiency" text is not present.'
      );

      // Find the div containing "%" symbol
      const percentDiv = await $(
        'div[style*="font-size: 18px; font-weight: 700;"]'
      );

      // Wait for the element to exist (with a timeout)
      await percentDiv.waitForExist({ timeout: 5000 });

      // Get the text content of the div
      const percentText = await percentDiv.getText();
      console.log({ percentText: percentText });

      // Assert the presence of the "%" symbol
      assert(
        percentText.includes("%"),
        'The "%" symbol is not present in the "Energy Efficiency" block.'
      );
    } else {
      throw new Error("Energy Efficiency element not found");
    }
  });

  // it('should verify "% Conversion" text and presence of "%" symbol', async () => {
  //     await browser.url('http://34.29.169.181:3000/');

  //     // Find the div containing "% Conversion" text
  //     const conversionElement = await $('//div[contains(text(), "% Conversion")]');

  //     // Get the text content of the div
  //     if (conversionElement) {
  //         const textContent = await conversionElement.getText();

  //         // Assert that "% Conversion" text is present
  //         await assert(textContent.includes('% Conversion'), 'The "% Conversion" text is not present.');

  //         // Find the div containing "%" symbol
  //         const percentDiv = await $('div[style*="font-size: 12px; font-weight: 600 color: rgb(159, 159, 159);"]');

  //         // Wait for the element to exist (with a timeout)
  //         await percentDiv.waitForExist({ timeout: 5000 });

  //         // Get the text content of the div
  //         const percentText = await percentDiv.getText();
  //         console.log({percentText: percentText})

  //         // Assert the presence of the "%" symbol
  //         await assert(percentText.includes('%'), 'The "%" symbol is not present in the "% Conversion" block.');
  //     } else {
  //         throw new Error('% Conversion element not found');
  //     }
  // });

  // it('should verify "Compliance Score" text and presence of "%" symbol', async () => {
  //     await browser.url('http://34.29.169.181:3000/');

  //     // Find the div containing "Compliance Score" text
  //     const complianceScoreElement = await $('//div[contains(text(), "Compliance Score")]');

  //     // Get the text content of the div
  //     if (complianceScoreElement) {
  //         const textContent = await complianceScoreElement.getText();

  //         // Assert that "Compliance Score" text is present
  //         await assert(textContent.includes('Compliance Score'), 'The "Compliance Score" text is not present.');

  //         // Find the div containing "%" symbol
  //         const percentDiv = await $('div[style*="font-size: 12px; font-weight: 600 color: rgb(159, 159, 159);"]');

  //         // Wait for the element to exist (with a timeout)
  //         await percentDiv.waitForExist({ timeout: 5000 });

  //         // Get the text content of the div
  //         const percentText = await percentDiv.getText();
  //         console.log({percentText: percentText})

  //         // Assert the presence of the "%" symbol
  //         await assert(percentText.includes('%'), 'The "%" symbol is not present in the "Compliance Score" block.');
  //     } else {
  //         throw new Error('Compliance Score element not found');
  //     }
  // });

  // it('should verify "Unit Uptime" text and presence of "%" symbol', async () => {
  //     await browser.url('http://34.29.169.181:3000/');

  //     // Find the div containing "Unit Uptime" text
  //     const unitUptimeElement = await $('//div[contains(text(), "Unit Uptime")]');

  //     // Get the text content of the div
  //     if (unitUptimeElement) {
  //         const textContent = await unitUptimeElement.getText();

  //         // Assert that "Unit Uptime" text is present
  //         await assert(textContent.includes('Unit Uptime'), 'The "Unit Uptime" text is not present.');

  //         // Find the div containing "%" symbol
  //         const percentDiv = await $('div[style*="font-size: 12px; font-weight: 600 color: rgb(159, 159, 159);"]');

  //         // Wait for the element to exist (with a timeout)
  //         await percentDiv.waitForExist({ timeout: 5000 });

  //         // Get the text content of the div
  //         const percentText = await percentDiv.getText();
  //         console.log({percentText: percentText})

  //         // Assert the presence of the "%" symbol
  //         await assert(percentText.includes('%'), 'The "%" symbol is not present in the "Unit Uptime" block.');
  //     } else {
  //         throw new Error('Unit Uptime element not found');
  //     }
  // });

  // it('should navigate to "Reactor-Regenerator" page', async () => {
  //     await browser.url('http://34.29.169.181:3000/');

  //     // Assuming the menu button is identified by its class name
  //     const menuButton = await browser.$('.MuiIconButton-root');

  //     // Click the menu button
  //     await menuButton.click();

  //     // Wait for the menu to appear (adjust the timeout as needed)
  //     await browser.waitUntil(
  //         async () => await browser.$('.MuiList-root'),
  //         { timeout: 10000, timeoutMsg: 'Menu not visible after 10s' }
  //     );

  //     // Example: Click on the "Reactor-Regenerator" link
  //     const reactorLink = await browser.$('a[href="/reactor-regenerator"]');
  //     await reactorLink.click();

  //     const pageTitle = await browser.getTitle();
  //     expect(pageTitle).toContain('Reactor-Regenerator');
  // });
});
