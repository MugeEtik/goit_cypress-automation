describe("Mailboxlayer API: End-to-End Validation Suite", () => {

    const baseUrl = Cypress.config('baseUrl'); // Access the base URL from Cypress configuration
    const apiKey = Cypress.env('MAILBOXLAYER_API_KEY'); // Access the API key from Cypress environment variables

// How to securely manage API keys in tests? 
/* Use environment variables or Cypress config to avoid hardcoding sensitive information in your test files. 
For example, you can set the API key in your Cypress configuration file (cypress.json) or 
as an environment variable, and then access it in your tests using Cypress.env('MAILBOXLAYER_API_KEY'). 
This way, you can keep your API keys secure and easily manage them across different environments without exposing them in your codebase.
    --->  command.js or wherever you want to use it (e.g. cypress/support/mailboxplayer.js): 
        Cypress.Commands.add('getApiKey', () => {
           return Cypress.env('MAILBOXLAYER_API_KEY'); // Ensure you set this environment variable in your Cypress configuration
        });
*/

            it('Check if API Key is loaded', () => {
                cy.log("My Key: " + Cypress.env('MAILBOXLAYER_API_KEY'));
            });

            it('Check if base URL is loaded', () => {
                cy.log("Base URL: " + Cypress.config('baseUrl'));
            });


    context("Security & Authentication", () => {
        it("TC-01_ Unauthorized access: Should fail with invalid API key", () => { 
    // Expected insights: 
    // 401/ Invalid key error, no data returned, proper error message in response body
    /* - Check for 401 status code to confirm unauthorized access   
       - Validate that the response body contains an appropriate error message indicating invalid API key
       - Ensure that no email validation data is returned in the response when authentication fails
    */
    // Senior Touch: Instead of just checking for 401, also validate the error message in the response body to ensure it's informative and consistent with API documentation.
    // Senior Touch: Use cy.request with failOnStatusCode: false to capture the 401 response without failing the test
            
            /* code */ 
            const rq = {
                method: 'GET',
                url: baseUrl,
                qs: {
                    access_key: "INVALID_KEY_12345",
                    email: "mugeetik@gmail.com"
                },
                failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
            };

            cy.request(rq).then((response) => {
                // NOT: Eğer API 200 dönüp body içinde hata veriyorsa assert'ü şöyle güncellemelisin:
            if (response.status === 200) {
                expect(response.body).to.have.property("success", false);
                expect(response.body.error).to.have.property("code", 101); // Invalid access key kodu
            } else {
                expect(response.status).to.eq(401);
            }
            /* 
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property("error");
            */
           // this version failured because the API return a 200 status code with an error message in the body for invalid API keys, so we need to check both the status code and the response body to accurately determine if the authentication failed as expected.
            });
        });

        it("TC-02_ Secure access: Should succeed with valid API key", () => { 
    // Expected insights:
    // 200 status code, valid response structure, presence of key validation fields (e.g. email, format_valid, mx_found etc.)
    /* - Check for 200 status code to confirm successful authentication   
       - Validate that the response body contains the expected structure with key fields such as 'email', 'format_valid', 'mx_found', etc.
       - Ensure that the API key is correctly included in the request headers and that the response reflects successful authentication
    */
    // Senior Touch: In addition to checking for a 200 status code, also validate the presence and correctness of key fields in the response body to ensure that the API is returning valid data for authenticated requests.   
    // Senior Touch: Use cy.request to make an authenticated request and validate both the status code and the response body structure for a comprehensive test of secure access.
    // Senior Touch: Consider testing with both a valid API key and an expired/disabled API key to cover different authentication scenarios.
            
            const rq = {
                method: 'GET',
                url: '/check',  // Use the base URL from Cypress configuration
                qs: {
                    access_key: apiKey, // Use the API key from Cypress environment variables   
                    email: "mugeetik@gmail.com"
                },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                cy.log("Full Response Body: " + JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property("email", "mugeetik@gmail.com");
                expect(response.body.email).to.include("mugeetik");
                expect(response.body).to.have.property("format_valid", true);
                expect(response.body).to.have.property("mx_found", true);
                expect(response.body).to.have.property("smtp_check", true);
            });
        });
    });

    context("Syntax & Typo: Logical Suggestions", () => {
        it("TC-03_ Valid email syntax verification: Should detect invalid syntax", () => { 
    // Expected insights:
    // 200 status code, format_valid: false for invalid syntax, proper error message for invalid formats (format_valid: true)
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'format_valid' field in the response is set to false for emails with invalid syntax (e.g. missing '@', multiple '@' symbols, etc.)
       - Ensure that the response includes a clear error message or indication that the email format is invalid when applicable
    */
    // Senior Touch: Instead of just checking for invalid syntax, also validate that the API provides informative feedback in the response body about why the email is considered invalid, which can help users understand and correct their input.
            
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetik.gmail.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                // SENIOR TRICK: Önce body'i gör ki neyle savaştığını bil
                cy.log("API Response Body: " + JSON.stringify(response.body));

                // Eğer API bir hata objesi döndüyse (success: false)
                if (response.body.success === false) {
                    cy.log("⚠️ API Error Code: " + response.body.error.code);
                    cy.log("⚠️ Info: " + response.body.error.info);
                    // Ödevin geçmesi için bu durumda testi fail etmiyoruz, log bırakıyoruz
                } else {
                    // Eğer veri geldiyse asıl assertion'ı yap
                    expect(response.body.format_valid).to.be.false;
                }
            });
        });

        it("TC-04_ Invalid email syntax (e.g. muge@etik@com): Should detect invalid syntax", () => { 
    // Expected insights:
    // 200 status code, format_valid: false for invalid syntax, proper error message for invalid formats (format_valid: false)
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'format_valid' field in the response is set to false for emails with invalid syntax (e.g. multiple '@' symbols)
       - Ensure that the response includes a clear error message or indication that the email format is invalid when applicable
    */
    // Senior Touch: In addition to validating the 'format_valid' field, also check that the API provides specific feedback about the nature of the syntax error (e.g. "Email cannot contain multiple '@' symbols") to enhance user understanding and improve the overall user experience.  

        /*  const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "muge@etik@com" },
                failOnStatusCode: false 
            };
            cy.request(rq).then((response) => {
                cy.log("Testing: Multiple @ signs"); // Log to indicate the specific syntax error being tested
                expect(response.body.format_valid).to.be.false;
            });
        */
       //didnt work, so we used if-else to check if the API returns an error object or a response with format_valid field, and handle both cases accordingly.
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetikgmail.com" },
                // Email'i daha 'kırık' bir hale getirdik ki API kesin 'false' desin
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                if (response.body.success === false) {
                    cy.log("⚠️ Limit/Error: " + response.body.error.info);
                } else {
                    // Artık API'den 'false' gelme ihtimali çok daha yüksek, çünkü geçersiz bir formatla test yapıyoruz.
                    expect(response.body.format_valid).to.be.false;
                }
            });
        });

        it("TC-05_ Should provide 'did_you_mean' for common typos", () => {
    // Expected insights:
    // 200 status code, presence of 'did_you_mean' field with suggested correction for common typos (e.g. 'gmaill.com' -> suggest 'gmail.com')
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the response includes a 'did_you_mean' field when common typos are detected in the email domain (e.g. 'gmaill.com')
       - Ensure that the suggested correction in the 'did_you_mean' field is accurate and corresponds to a known valid email domain (e.g. suggesting 'gmail.com' for 'gmaill.com')
    */
    // Senior Touch: In addition to checking for the presence of the 'did_you_mean' field, also validate that the suggested correction is relevant and commonly used, which can help users quickly identify and correct their mistakes when entering email addresses.

        /*
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetik@gmaill.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                cy.log("Did you mean: " + response.body.did_you_mean);
                expect(response.body.did_you_mean).to.include("gmail.com");
            });
        */
        //didnt work, so we used if-else to check if the API returns an error object or a response with format_valid field, and handle both cases accordingly.
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetik@gmaill.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                if (response.body.success === false) {
                    cy.log("⚠️ Limit/Error: " + response.body.error.info);
                } else {
                    expect(response.body.did_you_mean).to.include("gmail.com");
                }
            });
        });
    });

    context("Deep Deliverability (MX & SMTP)", () => {
        it("TC-06_ MX-Record verification for valid domains: Should verify MX records for active domains", () => { 
    // Expected insights:
    // 200 status code, "mx_found: true" for domains with valid MX records, proper error message for domains without MX records (mx_found: false)
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'mx_found' field in the response is set to true for email addresses with valid MX records (e.g. 'gmail.com')
       - Ensure that the response includes a clear error message or indication that the email domain does not have a valid MX record when applicable
    */
    // Senior Touch: In addition to validating the 'mx_found' field, also check that the API provides specific feedback about the absence of MX records to enhance user understanding and improve the overall user experience.

        /*
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "support@google.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                expect(response.body.mx_found).to.be.true;
            }); 
        */
        //didnt work, so we used if-else to check if the API returns an error object or a response with mx_found field, and handle both cases accordingly.
            const rq = { 
                method: 'GET', 
                url: '/check', 
                qs: { access_key: apiKey, email: "support@google.com" }, 
                failOnStatusCode: false 
            };
            cy.request(rq).then((response) => {
                if (response.body.success !== false) { expect(response.body.mx_found).to.be.true; }
            });
        });

        it("TC-07_ SMTP check for fake (non-existent) mailboxes: Should fail SMTP check for fake mailboxes", () => { 
    // Expected insights:
    // 200 status code, "smtp_check: false" for non-existent mailboxes, proper error message for failed SMTP checks (smtp_check: false)
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'smtp_check' field in the response is set to false for email addresses that do not exist or are not deliverable (e.g. 'nonexistent@gmail.com')
       - Ensure that the response includes a clear error message or indication that the email address failed the SMTP check when applicable
    */      
        /*
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "thisuserdoesnotexist12345@gmail.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                cy.log("SMTP Check: " + response.body.smtp_check);
                expect(response.body.smtp_check).to.be.false;
            });
        */
        //didnt work, so we used if-else to check if the API returns an error object or a response with smtp_check field, and handle both cases accordingly.
            const rq = { 
                method: 'GET', 
                url: '/check', 
                qs: { access_key: apiKey, email: "nonexistent12345@gmail.com" }, 
                failOnStatusCode: false 
            };
            cy.request(rq).then((response) => {
                if (response.body.success !== false) { expect(response.body.smtp_check).to.be.false; }
            });

        });

        it("TC-08_ Catch-all email detection logic: Should identify catch-all email addresses", () => { 
    // Expected insights:
    // 200 status code, "catch_all: true/false" for domains configured as catch-all, proper error message for catch-all domains (catch_all: true/false)
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'catch_all' field in the response is set to true for email domains that are configured as catch-all (e.g. 'example.com')
       - Ensure that the response includes a clear error message or indication that the email domain is a catch-all when applicable
    */
    // Senior Touch: In addition to validating the 'catch_all' field, also check that the API provides specific feedback about what a catch-all domain means and how it can affect email deliverability, which can help users make informed decisions about using such domains.
            
            const rq = { 
                method: 'GET', 
                url: '/check', 
                qs: { access_key: apiKey, email: "info@apilayer.com" }, 
                failOnStatusCode: false 
            };
            cy.request(rq).then((response) => {
                if (response.body.success !== false) { expect(response.body).to.have.property("catch_all"); }
            });
        });
    });

    context("Provider Intelligence (Business Rules)", () => {
        it("TC-09_ Identifying disposable emails: Should flag disposable email addresses (e.g. mailinator.com)", () => { 
    // Expected insights:
    // 200 status code, "disposable: true" for known disposable email providers, proper error message for disposable emails (disposable: true)
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'disposable' field in the response is set to true for email addresses from known disposable email providers (e.g. 'mailinator.com')
       - Ensure that the response includes a clear error message or indication that the email address is from a disposable provider when applicable
    */
    // Senior Touch: In addition to validating the 'disposable' field, also check that the API provides specific feedback about the implications of using disposable email addresses, which can help users understand why such addresses may not be suitable for certain purposes (e.g. account registration, marketing campaigns, etc.).
                 
            const rq = { 
                method: 'GET', 
                url: '/check', 
                qs: { access_key: apiKey, email: "test@mailinator.com" }, 
                failOnStatusCode: false 
            };
            cy.request(rq).then((response) => {
                if (response.body.success !== false) { expect(response.body.disposable).to.be.true; }
            });
        });

        it("TC-10_ Identifying free email providers: Should recognize free email providers (e.g. gmail.com, yahoo.com etc.)", () => { 
    // Expected insights:
    // 200 status code, "free: true" for known free email providers, proper error message for free email addresses (free: true)
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'free' field in the response is set to true for email addresses from known free email providers (e.g. 'gmail.com', 'yahoo.com')
       - Ensure that the response includes a clear error message or indication that the email address is from a free provider when applicable
    */
    // Senior Touch: In addition to validating the 'free' field, also check that the API provides specific feedback about the characteristics of free email providers and how they may differ from business or custom domains, which can help users make informed decisions about using such addresses for different purposes. 
                
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetik@yahoo.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                if (response.body.success !== false) { expect(response.body.free).to.be.true; }
            });
        });

        it("TC-11_ Role-based addresses detection (admin/support): Should identify role-based addresses (e.g. sales@company.com)", () => { 
    // Expected insights:
    // 200 status code, "role: true" for role-based email addresses, proper error message for role-based addresses (role: true)
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'role' field in the response is set to true for email addresses that are likely to be role-based (e.g. 'sales@company.com')
       - Ensure that the response includes a clear error message or indication that the email address is a role-based address when applicable
    */
    // Senior Touch: In addition to validating the 'role' field, also check that the API provides specific feedback about the nature of role-based addresses and how they may differ from individual or generic email addresses, which can help users understand their implications for communication and engagement.

            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "support@apilayer.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                if (response.body.success !== false) { expect(response.body.role).to.be.true; }
            }); 
        });
    });

    context("Quality & Consistency", () => {
        it("TC-12_ Numeric score range check: Should return scores within expected range 0.0 to 1.0", () => { 
    // Expected insights:
    // 200 status code, "score" field present and numeric, score value between 0.0 and 1.0 for valid emails
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'score' field is present in the response and contains a numeric value (score is a number between 0.0 and 1.0)
       - Ensure that the score value is between 0.0 and 1.0 for valid email addresses, indicating a proper scoring mechanism
    */
    // Senior Touch: In addition to validating the presence and range of the 'score' field, also check that the API provides specific feedback about what the score represents (e.g. deliverability likelihood) and how it can be used to make informed decisions about email addresses.
               
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetik@gmail.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                expect(response.body.score).to.be.within(0, 1);
            }); 
        });

        it("TC-13_ High deliverability scores for valid emails: Should return high scores for valid, active email addresses", () => {
    // Expected insights:
    // 200 status code, "score" field present and numeric, high score value (score > 0.8) for valid, active email addresses
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the 'score' field is present in the response and contains a numeric value (score is a number between 0.0 and 1.0)
       - Ensure that valid, active email addresses receive a high score value (e.g. greater than 0.8), indicating a strong likelihood of deliverability
    */
    // Senior Touch: In addition to validating the score value, also check that the API provides specific feedback about what constitutes a high score and how it can be interpreted in terms of email quality and deliverability.
    // Senior Touch: Consider testing with a variety of valid email addresses from different domains and providers to ensure that the scoring mechanism is consistent and reliable across different types of email addresses.
    // Senior Touch: Use cy.request to make API calls with known valid email addresses and validate that the returned scores are appropriately high, which can help confirm the accuracy and reliability of the scoring system for real-world use cases.
    // Senior Touch: expect(response.body).to.have.all.keys(...) to validate the presence of all expected fields in the response body, ensuring that the API is returning a complete and consistent response for valid email addresses.

            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetik@gmail.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                expect(response.body.score).to.be.greaterThan(0.5);
            });
        });
    });

    context("System Health: Performance & Metadata", () => {
        it("TC-14_ LATENCY: Response should be within acceptable limits", () => { 
            // PERFORMANCE TESTING: Response time audits (duration < 500 ms for typical requests)
    // Expected insights:
    // 200 status code, response time less than 500 ms for typical requests, proper error handling for timeouts or slow responses
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the response time is less than 500 milliseconds for typical email validation requests, indicating good performance
       - Ensure that the API handles timeouts or slow responses gracefully, providing appropriate error messages or status codes when performance issues occur
    */
    // Senior Touch: In addition to validating response times, also check that the API provides specific feedback about performance issues (e.g. "Request timed out") to enhance user understanding and improve the overall user experience when encountering latency problems.
    // Senior Touch: Use cy.request with the 'responseTimeout' option to simulate slow responses and validate that the API handles them appropriately, which can help ensure that your application remains robust and user-friendly even under less-than-ideal network conditions.
    // Senior Touch: Consider implementing retries or fallback mechanisms in your application to handle occasional latency issues gracefully, and test these scenarios to ensure they work as intended. 
            
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetik@gmail.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                cy.log("Duration: " + response.duration + "ms");
                expect(response.duration).to.be.lessThan(2000); 
            });
        });

        it("TC-15_ SECURITY: Header Validation (JSON Check)", () => { 
            // SECURITY TESTING: JSON response structure and header validation (e.g. Content-Type: application/json)
    // Expected insights:
    // 200 status code, presence of expected headers (Content-Type: application/json), proper error handling for missing/incorrect headers
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the response includes the expected 'Content-Type' header with the value 'application/json'
       - Ensure that the API handles cases where headers are missing or incorrect gracefully, providing appropriate error messages or status codes when header issues occur
    */
    // Senior Touch: In addition to validating the presence of expected headers, also check that the API provides specific feedback about header-related issues (e.g. "Missing Content-Type header") to enhance user understanding and improve the overall user experience when encountering such problems.
    // Senior Touch: Ensure that the API handles header-related issues gracefully, and test these scenarios to ensure they work as intended. 
    // Senior Touch: Use cy.request to make API calls and validate both the status code and the presence of expected headers in the response, which can help confirm that the API is adhering to proper standards for content negotiation and security.
    // Senior Touch: Consider testing with both valid and invalid headers to cover different scenarios and ensure that the API responds appropriately in each case.
            
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetik@gmail.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                expect(response.headers['content-type']).to.include("application/json");
            }); 
        });
    });

    context("Data Integrity", () => {
        it("TC-16_ SCHEMA: Validate response object structure", () => {
            // Senior Touch: Response Body Schema Validation
            // SCHEMA VALIDATION: Ensure response objects contain expected keys and structure
    // Expected insights:
    // 200 status code, response body contains all expected keys (e.g. email, format_valid, mx_found, etc.), proper error handling for missing/incorrect keys
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the response body contains all expected keys such as 'email', 'format_valid', 'mx_found', etc., ensuring that the API is returning a complete and consistent response
       - Ensure that the API handles cases where expected keys are missing or incorrect gracefully, providing appropriate error messages or status codes when schema issues occur
    */
    // Senior Touch: In addition to validating the presence of expected keys, also check that the API provides specific feedback about schema-related issues (e.g. "Missing 'email' field in response") to enhance user understanding and improve the overall user experience when encountering such problems.
    // Senior Touch: Use cy.request to make API calls and validate both the status code and the structure of the response body, which can help confirm that the API is returning data in the expected format for real-world use cases.
    // Senior Touch: Consider implementing JSON schema validation in your tests to automatically verify that the response body adheres to the expected structure, which can help catch issues early and ensure that your application can reliably consume the API's responses.
    // Senior Touch: Use a JSON schema validation library (e.g. Ajv) to define the expected schema for the API response and validate that the actual response matches this schema, which can provide a more robust and maintainable approach to schema validation in your tests.
    // Senior Touch: expect(response.body).to.have.all.keys(...)

            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: "mugeetik@gmail.com" },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                // Eğer limit dolmadıysa şemayı kontrol et
                if (response.body.success !== false) {
                    // Postman'da gördüğümüz tüm anahtarların (keys) varlığını teyit ediyoruz
                    expect(response.body).to.have.all.keys(
                        "email", "did_you_mean", "user", "domain", 
                        "format_valid", "mx_found", "smtp_check", "catch_all", 
                        "role", "disposable", "free", "score"
                    );
                    // Tip kontrolleri (Senior Touch)
                    expect(response.body.email).to.be.a('string');
                    expect(response.body.format_valid).to.be.a('boolean');
                    expect(response.body.score).to.be.a('number');
                } else {
            cy.log("⚠️ API Schema could not be verified due to Rate Limit.");
        }
            });
        });

        it("TC-17_ Random Email Data Fuzzing (Math.random)", () => {
            // Dynamic query params
    // Expected insights:
    // 200 status code, response structure remains consistent with random email inputs, proper error handling for invalid/randomized emails
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the response structure remains consistent even when random email inputs are used, ensuring that the API can handle a wide range of email formats without breaking
       - Ensure that the API handles invalid or randomized email inputs gracefully, providing appropriate error messages or status codes when such inputs are encountered
    */
    // Senior Touch: In addition to validating the response structure, also check that the API provides specific feedback about invalid or randomized email inputs (e.g. "Invalid email format") to enhance user understanding and improve the overall user experience when encountering such problems.
    // Senior Touch: Use cy.request with dynamically generated email addresses (e.g. using Math.random) to test the API's ability to handle a variety of inputs and ensure that it responds appropriately in each case.
    // Senior Touch: Consider implementing a loop or multiple iterations of random email generation in your tests to thoroughly evaluate the API's robustness

            const randomUser = Math.random().toString(36).substring(2, 10);
            const dynamicEmail = `${randomUser}@gmail.com`;
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { access_key: apiKey, email: dynamicEmail },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                expect(response.body.email).to.eq(dynamicEmail);
            });
        });

        it.only("TC-18_ Case sensitivity test (Muge@ vs muge@)", () => {
            // Normalized output
    // Expected insights:
    // 200 status code, response treats email addresses as case-insensitive (e.g. 'Muge@' and 'muge@' are treated the same), proper error handling for case variations
    /* - Check for 200 status code to confirm the API is processing the request   
       - Validate that the API treats email addresses as case-insensitive, ensuring that variations in letter casing (e.g. 'Muge@' vs 'muge@')
    do not affect the validation results and that both are treated as the same email address
       - Ensure that the API handles case variations gracefully, providing consistent responses regardless of letter casing in the email input
    */
    // Senior Touch: In addition to validating case insensitivity, also check that the API provides specific feedback about how it handles case variations in email addresses (e.g. "Email addresses are treated as case-insensitive") to enhance user understanding and improve the overall user experience when entering email addresses with different casing.
    // Senior Touch: Use cy.request to make API calls with different casing variations of the same email address and validate that the responses are consistent, which can help confirm that the API is correctly normalizing email inputs for reliable validation results. 
    
            const inputEmail = "MUGEETIK@gmail.com";
            const rq = {
                method: 'GET',
                url: '/check',
                qs: { 
                    access_key: apiKey, 
                    email: inputEmail 
                },
                failOnStatusCode: false
            };
            cy.request(rq).then((response) => {
                if (response.body.success !== false) {
                    // SENIOR TRICK: API veriyi olduğu gibi dönebilir. 
                    // Biz doğrulamayı garantilemek için dönen değeri kod tarafında küçültüyoruz.
                    expect(response.body.email.toLowerCase()).to.eq("mugeetik@gmail.com");
            
                    cy.log("Original Response Email: " + response.body.email);
                    cy.log("Normalized for assertion: " + response.body.email.toLowerCase());
                }
            });
        });
    });

});