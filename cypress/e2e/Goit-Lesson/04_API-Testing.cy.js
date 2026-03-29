describe ("API Testing", () => {
context("HTTP Requests", () => {
    it("TC-01_ FUNDAMENTAL TEST: status and url check", () => {
        cy.request("https://httpbin.org/get").then((response) => {
            //Chai library assertions: assert, expect, should
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)
            assert.equal(response.statusText, "OK") 
            assert.equal(response.body.url, "https://httpbin.org/get")
            expect(response.body).to.have.property("url", "https://httpbin.org/get")    
        })
    })

    it("TC-02_ GET request: RESPONSE LOGGING", () => {
        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",
            failOnStatusCode: false,
    //failOnStatusCode: true, // default value : if status code is not 2xx or 3xx, the test will fail and stop execution.
        }
        cy.request(rq).then((response) => {
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property("url", "https://httpbin.org/get")
            console.log("response", response)
            cy.log("response::: " + JSON.stringify(response))
             cy.log("response body::: " + JSON.stringify(response.body))
             cy.log("response headers::: " + JSON.stringify(response.headers))
             cy.log("response status::: " + JSON.stringify(response.status))
             cy.log("response statusText::: " + JSON.stringify(response.statusText))
             cy.log("response duration::: " + JSON.stringify(response.duration))
    // response body is an object, so we need to stringify it to log it in the console or in the Cypress log.
    // Query params, headers, and body can be added to the request object as needed.
        })
    })

    // For example, to add query params:
    it("TC-03_ GET request: QUERY PARAMS", () => {
        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",
            qs: {id:"1"}, // query params, it will be added to the url as ?id=1
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)
             cy.log("response body::: " + JSON.stringify(response.body))
        })
    })

    it("TC-04_ POST request: BODY", () => {
        const rq = {
            method: "POST",
            url: "https://httpbin.org/post",
            body: {name:"Juan", role:"QA", age:37}, // request body, it will be sent as JSON in the request body
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)
             cy.log("response body::: " + JSON.stringify(response.body))
        })
    })

    it("TC-05_ POST request: BODY_v.2", () => {
        const body = {
            name: "Juan",
            role: "QA",
            age: 37
        }
    
        const rq = {
            method: "POST",
            url: "https://httpbin.org/post",
            body: body,
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)
             cy.log("response body::: " + JSON.stringify(response.body))
        })
    })

    it("TC-06_ POST request: BODY_v.3", () => {
        const bodyData = {
            bodyKey: "bodyValue",  
     // body data from out of the test case, it can be imported from a fixture file or defined as a variable in the test case.
        }
    
        const rq = {
            method: "POST",
            url: "https://httpbin.org/post",
            body: bodyData,
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)
             cy.log("response body::: " + JSON.stringify(response.body))
        })
    })

    it("TC-07_ POST request: HEADERS", () => {
        const body = {
            name: "Juan",
            role: "QA",
            age: 37
        }
    
        const rq = {
            method: "POST",
            url: "https://httpbin.org/post",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124"
            }, // request headers, it will be sent in the request headers
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)
             cy.log("response body::: " + JSON.stringify(response.body))
             cy.log("response headers::: " + JSON.stringify(response.headers))
        })
    })
})

context("API Assertions", () => {
    it("TC-08_ API Assertions: Get request", () => {
        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)             
        })
    })

    it("TC-09_ API Assertions: Post request BODY", () => {
        const rq = {
            method: "POST",
            url: "https://httpbin.org/post",
            body: {name:"Juan", role:"QA", age:37},
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)
             cy.log("response body::: " + JSON.stringify(response.body))

                // Assertions on response body  
            assert.equal(response.body.json.name, "Juan")
            expect(response.body.json.role).to.eq("QA")
            expect(response.body.json.age).to.be.a("number").and.to.eq(37)  

            assert.equal(response.body.url, "https://httpbin.org/post")
            expect(response.body.json).to.deep.eq({name:"Juan", role:"QA", age:37}) 
            // deep equality check for objects
             expect(response.body.json).to.have.property("name", "Juan") 
             // check if the property exists and has the expected value
             expect(response.body.json).to.have.property("role").that.is.a("string").and.to.eq("QA") 
             // check if the property exists, is a string, and has the expected value
             expect(response.body.json).to.have.property("age").that.is.a("number").and.to.eq(37) 
             // check if the property exists, is a number, and has the expected value

             expect(response.headers["content-type"]).to.include("application/json")
             // check if the content-type header includes application/json
             expect(response.duration).to.be.lessThan(500)
             // check if the response time is less than 500 ms
             
    // --- SENIOR TOUCH: SCHEMA KEYS VALIDATION ---
        // response.body.json objesinin tam olarak bu 3 anahtara sahip olduğunu doğrular
        expect(response.body.json).to.have.all.keys("name", "role", "age");

        // Ardından değerleri kontrol edebilirsin
        assert.equal(response.body.json.name, "Juan");
        expect(response.body.json.role).to.eq("QA");
        })
        
    })
})

context("Debugging and Logging", () => {
    it("TC-10_ Logging", () => {
        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
            console.log("response", response)  // log the entire response object in the browser console (not in the Cypress log)
             assert.equal(response.status, 200)
             expect(response.status).to.eq(200)             
             cy.log("response::: " + JSON.stringify(response))  // log the entire response object in the Cypress log (not in the browser console)
             cy.log("response body::: " + JSON.stringify(response.body))          
        })
    })
// browser (localhost) -> f12 -> console -> filter by "log" to see only the logs from cy.log() and console.log() 
// and you can also see the logs in the Cypress Test Runner under the "Console" tab for each test case.
// IMPORTANT: console.log() will log the message in the browser console, while cy.log() will log the message in the Cypress Test Runner.
// console.log() is used to log messages in the browser console, while cy.log() is used to log messages in the Cypress Test Runner.

    it("TC-11_ Debugger", () => {
        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
    // it will pause the test execution at this line and open the browser's developer tools, 
    // where you can inspect the response object and its properties. 
            debugger;
            assert.equal(response.status, 200)
    // you can add multiple debugger statements to pause at different points in the test 
    // and inspect the state of the application or the response.
    // when the test execution is paused, you can use the browser's developer tools to inspect the variables and the response object.
    // you can also use the "Step over" and "Step into" buttons in the developer tools to step through the code line by line 
    // and see how the response object is being processed.
    // after inspecting the response object, you can resume the test execution by clicking the "Resume" button in the developer tools, 
    // and the test will continue to run until it finishes or encounters another debugger statement.
            debugger;
            expect(response.status).to.eq(200)
            debugger;
            cy.log("response::: " + JSON.stringify(response))
            debugger;
            cy.log("response body::: " + JSON.stringify(response.body))
        })
    })

    it("TC-12_ Debugging on cypress", () => {
        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
            // you can also use the "debug" command in Cypress to log the response object and its properties in a more structured way.
            cy.debug() // it will log the current state of the test and the response object in the Cypress Test Runner, and you can inspect it there.
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)             
            cy.debug() // you can add multiple debug commands to log the state of the test at different points in the execution.
             cy.log("response::: " + JSON.stringify(response)) 
             cy.debug()
             cy.log("response body::: " + JSON.stringify(response.body))
             cy.debug()
        })
    })

it("TC-13_ Checking while Execution", () => {
    const rq = {
        method: "GET",
        url: "https://httpbin.org/get",
        failOnStatusCode: false,
    }
    cy.request(rq).then((response) => {
        // you can also check the response object and its properties while the test is executing by using the "Check" feature in the Cypress Test Runner.
        assert.isTrue(response.duration <=500) 
        // check if the response time is less than or equal to 500 ms --> Chai library assertion
        expect(response.duration).to.be.lessThan(500) 
        // check if the response time is less than 500 ms --> Chai library assertion
        // to use the "Check" feature, you need to add an assertion in your test case, and then when the test is running, you can click on the assertion in the Cypress Test Runner to see the details of the response object and its properties at that point in the execution.
         cy.log("response duration::: " + JSON.stringify(response.duration))
         cy.log("response status::: " + JSON.stringify(response.status))
         cy.log("response statusText::: " + JSON.stringify(response.statusText))
         cy.log("response headers::: " + JSON.stringify(response.headers))
         cy.log("response body::: " + JSON.stringify(response.body))
    })
})
})

context("Data Randomization", () => {
    it("TC-14_ Data Randomization: const rand", () => {
        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",
            failOnStatusCode: false,
        }
        cy.request(rq).then((response) => {
                    cy.log("response duration::: " + JSON.stringify(response.duration)) 
                    cy.log("response status::: " + JSON.stringify(response.status))
                    cy.log("response statusText::: " + JSON.stringify(response.statusText))
                    cy.log("response headers::: " + JSON.stringify(response.headers))
                    cy.log("response body::: " + JSON.stringify(response.body))
                const randomNum = Math.floor(Math.random() * 1000) // generate a random number between 0 and 999        
                cy.log("random number::: " + randomNum)
                const randomString = Math.random().toString(36).substring(2, 10) // generate a random string of 8 characters
                cy.log("random string::: " + randomString)
                const randomBoolean = Math.random() < 0.5 // generate a random boolean value
                cy.log("random boolean::: " + randomBoolean)

            // you can use these random values in your test cases to create more dynamic and robust tests, 
            // for example, you can use the random string as a value in the request body or as a query parameter in the request URL.
        })
    })

    it("TC-15_ Data Randomization: getRandomInt", () => {
// you can use this function to generate random integers 
// within a specified range, and then use those random integers in your test cases as needed.

        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",
            failOnStatusCode: false,
        }
        
        function getRandomInt(max) {    
            return Math.floor(Math.random() * max);
        } 

            for (let i = 0; i < 10; i++) {
                const randomId = getRandomInt(10000)

                const rq = {
                    url: 'https://httpbin.org/headers' ,
                    id: randomId,
                    failOnStatusCode: false,
                }   
                cy.request(rq).then((response) => {
                    cy.log("response id::: " + randomId) // log the random id used in the request
                    cy.log("response headers::: " + JSON.stringify(response.headers))  // log the response headers to see the random id in the request headers
                    assert.isTrue(response.status == 200) // check if the status code is 200
                    expect(response.status).to.eq(200) // check if the status code is 200
                })
            }
        // in this example, we are generating a random integer between 0 and 9999 using the getRandomInt function, 
        // and then we are using that random integer as an id in the request object. 
        // We are making 10 requests with different random ids, and we are logging the random id and the response headers 
        // to see the random id in the request headers. We are also checking if the status code of the response is 200 for each request.
    }) 
// const getRandomInt = (max) => Math.floor(Math.random() * max); 
// is an arrow function that generates a random integer between 0 and max-1.

// const randomNum = Math.floor(Math.random() * 1000) 
// is a simple way to generate a random integer between 0 and 999, 
// but using a function like getRandomInt allows you to easily generate random integers 
// within any range by simply passing the desired maximum value as an argument to the function.

// random data-sets can be used in various ways in your test cases, such as:
/*  - Generating random user data for testing user registration or login functionality.
    - Creating random product data for testing e-commerce applications.
    - Generating random search queries for testing search functionality.
    - Creating random input data for testing form validation.
    - Generating random IDs or tokens for testing authentication and authorization.
    - Creating random data for testing API endpoints that require dynamic input.

Using random data in your tests can help to uncover edge cases 
and ensure that your application can handle a wide range of inputs and scenarios, making your tests more robust and reliable.
*/

it("TC-15_A: Data Randomization via Query Params", () => {
    const randomId = Math.floor(Math.random() * 10000);
    
    const rq = {
        method: 'GET',
        url: 'https://httpbin.org/get', // Base URL
        qs: { id: randomId }, // query params -> ?id=randomId
        failOnStatusCode: false,
    }

    cy.request(rq).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.args.id).to.eq(randomId.toString()); // httpbin args içinde döner
    });
});

it("TC-15_B: Data Randomization via URL Path (INCORRECT: Wrong path)", () => {
    const randomId = Math.floor(Math.random() * 10000);
    
    const rq = {
        method: 'GET',
        url: `https://httpbin.org/get/${randomId}`, // Template literal ile birleştirme
    // 'get' endpoint'i dinamik path desteklemez, bu yüzden 404 alırsın!
        failOnStatusCode: false,
    }

    cy.request(rq).then((response) => {
        expect(response.status).to.eq(200);
    });
// Endpoint path-variable desteklemediği için URL yapısı bozuldu ve sunucu isteği tanımsız bir resource olarak algıladı.

// why 404? Because the 'get' endpoint of httpbin.org does not support dynamic path variables,  
// so when you try to access 'https://httpbin.org/get/{randomId}', 
// it does not recognize this URL as a valid resource and returns a 404 Not Found error. 

});

it("TC-15_C: Data Randomization via URL Path (Corrected)", () => {
    const randomId = Math.floor(Math.random() * 10000);
    
    const rq = {
        method: 'GET',
        // 'get' yerine 'anything' kullanıyoruz çünkü 'get' dinamik path desteklemez.
        url: `https://httpbin.org/anything/${randomId}`, 
        failOnStatusCode: false,
    }

    cy.request(rq).then((response) => {
        // Artık 200 alacaksın!
        expect(response.status).to.eq(200);
        
        // Sunucunun gönderdiğimiz ID'yi URL içinde aldığını da doğrulayalım:
        expect(response.body.url).to.include(randomId);
        cy.log("Sended Random ID via Path: " + randomId);
    });
});

})

context("Test Organization & Advanced Techniques", () => {
    it("TC-16_ Describe and context", () => {
        // you can use "describe" and "context" blocks to organize your test cases into logical groups, 
        // making it easier to read and maintain your test suite. 
        // "describe" is typically used to group related test cases together, 
        // while "context" is used to provide additional context or conditions for the test cases within a "describe" block.
        // For example, you can use "describe" to group all the test cases related to a specific API endpoint, 
        // and then use "context" to differentiate between different scenarios or conditions for that endpoint. 
    })

    /*    describe("User API Tests", () => {
            context("GET /users", () => {
                it("should return a list of users", () => {
                    // test case for GET /users endpoint
                })
            })          
            context("POST /users", () => {
                it("should create a new user", () => {
                    // test case for POST /users endpoint
                })  
    */

    it("TC-17_ Alias", () => {
        // you can use aliases in Cypress to store and reuse values across different test cases or within the same test case. 
        // Aliases are created using the "as" command, and they can be accessed using the "@" symbol followed by the alias name.
        // For example, you can create an alias for a response object in one test case 
        // and then access that alias in another test case to perform assertions or use its properties. 
        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",     
        }

        cy.request(rq).as("getResponse") // create an alias for the response object of this request 
        cy.get("@getResponse").then((response) => { // access the alias to get the response object
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)             
             cy.log("response::: " + JSON.stringify(response)) 
             cy.log("response body::: " + JSON.stringify(response.body))
        })
    })

    it("TC-18_ Stub & Fixtures: Advanced Techniques", () => {
        // you can use stubs and fixtures in Cypress to mock API responses and test your application in isolation from external dependencies. 
        // Stubs allow you to replace a function or method with a custom implementation, while fixtures allow you to load predefined data from a file and use it in your tests.
        // For example, you can use a fixture to load a JSON file containing mock data for an API response, and then use that fixture in your test case to stub the API response and test how your application handles that response.
        const rq = {
            method: "GET",
            url: "https://httpbin.org/get",     
        }

        cy.fixture("mockResponse.json").as("mockData") // load the fixture file and create an alias for it
         cy.get("@mockData").then((mockData) => { // access the alias to get the mock data
             cy.intercept("GET", "https://httpbin.org/get", { // stub the API response for this endpoint
                 statusCode: 200,
                 body: mockData, // use the mock data from the fixture as the response body
                }).as("getStub") // create an alias for the stubbed response    

        })
    // Stubs and fixtures are powerful tools for testing your application in isolation 
    // and ensuring that your tests are reliable and consistent, regardless of the state of external APIs or services.
    // By using stubs and fixtures, you can create controlled test environments 
    // and simulate various scenarios to thoroughly test your application's behavior under different conditions.
    // For example, you can use stubs to simulate error responses from an API and test how your application handles those errors,
    // or you can use fixtures to load different sets of data and test how your application processes that data.
    // Overall, stubs and fixtures are essential techniques for effective API testing in Cypress, 
    // allowing you to create robust and reliable tests that can be run consistently across different environments and scenarios.
    // Note: The "mockResponse.json" file should be placed in the "cypress/fixtures" directory of your project, and it should contain the mock data you want to use for stubbing the API response.
    // Example content of "mockResponse.json":
    /*
    {
        "args": {},
        "headers": {
            "Accept": "* /*",
            "Host": "httpbin.org",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124"
    }
    */

    // In this example, we are loading a fixture file named "mockResponse.json" and creating an alias for it.
    // We then access the mock data from the fixture and use it to stub the API response for the GET request to "https://httpbin.org/get". 
    // When we make the API request, it will be intercepted by the stub, and the response will be the mock data from the fixture instead of the actual response from the API. 
    // We can then perform assertions on the response to verify that our application is handling the mocked response correctly.

    // stable and consistent tests, as they allow you to control the data and responses used in your tests,
    // and they help to isolate your tests from external dependencies, making them more reliable and easier to maintain.

        cy.intercept("GET", "https://httpbin.org/get", { // stub the API response for this endpoint
            statusCode: 200,
            body: {message: "This is a stubbed response"}, // use a simple object as the response body for stubbing
        }).as("getStub") // create an alias for the stubbed response    
        cy.request(rq).then((response) => { // make the API request, which will be intercepted by the stub  
            assert.equal(response.status, 200)
            expect(response.status).to.eq(200)             
             cy.log("response::: " + JSON.stringify(response)) 
             cy.log("response body::: " + JSON.stringify(response.body))
        })

/*
In this example, we are stubbing the API response for the GET request to "https://httpbin.org/get" with a simple object containing a message.
When we make the API request, it will be intercepted by the stub, and the response will be the stubbed object instead of the actual response from the API. 
We can then perform assertions on the response to verify that our application is handling the stubbed response correctly.
*/
/*
Note: The "cy.intercept" command is used to stub the API response, and it takes three arguments: 
the HTTP method, the URL to intercept, and the response object to return when the request is made. 
*/

/*   EXAMPLE OF USING FIXTURES TO STUB API RESPONSES IN A REAL-WORLD SCENARIO:
        CREATING FIXTURE FILE "cypress/fixtures/products.json" WITH THE FOLLOWING CONTENT:
[
    {"id": 1, "name": "Product 1", "price": 10.99},
    {"id": 2, "name": "Product 2", "price": 19.99},
    {"id": 3, "name": "Product 3", "price": 5.99},
    {"id": 4, "name": "Product 4", "price": 15.99},
    {"id": 5, "name": "Product 5", "price": 9.99},
    {"id": 6, "name": "Product 6", "price": 12.99},
    {"id": 7, "name": "Product 7", "price": 8.99},
    {"id": 8, "name": "Product 8", "price": 14.99},
]

describe("product list API tests", () => {
    context("GET /products", () => {
        it("should return a list of products by fixture data ", () => {
            cy.intercept("GET", "/api/products", { fixture: "products.json" }).as("getProducts") // stub the API response with fixture data
            cy.visit("/products") // visit the page that makes the API request
            cy.wait("@getProducts") // wait for the API request to be made and intercepted
            cy.get(".product").should("have.length", 10) // assert that the page displays the correct number of products based on the fixture data
            cy.contains(".product", "Product 1").should("be.visible") // assert that a specific product from the fixture data is displayed on the page

        })
*/

  })

// cy.intercept is for UI testing (cy.visit), not for cy.request, 
// because cy.request is a direct API call 
// and does not go through the browser's network layer where intercept can capture and modify requests.

  // ÖRNEK 1: UI TESTLERİNDE MOCKING (INTERCEPT)
it("TC-18_A: UI Mocking with Intercept (The Proper Way)", () => {
    // 1. Önce dinleyiciyi (intercept) kur
    cy.intercept("GET", "/api/products", { fixture: "products.json" }).as("getProducts");
    
    // 2. Sonra sayfayı ziyaret et (UI aksiyonu)
    cy.visit("/products"); 
    
    // 3. İsteğin tamamlanmasını bekle ve UI'ı doğrula
    cy.wait("@getProducts");
    cy.get(".product-card").should("have.length", 10);
});

// ÖRNEK 2: SAF API TESTLERİNDE VERİ ÇEKME (REQUEST)
it("TC-18_B: Pure API Testing with Fixtures", () => {
    // Fixture dosyasındaki veriyi al ve request gövdesinde kullan
    cy.fixture("mockResponse.json").then((testData) => {
        cy.request("POST", "https://httpbin.org/post", testData).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.json.name).to.eq(testData.name);
        });
    });
});

})

})
