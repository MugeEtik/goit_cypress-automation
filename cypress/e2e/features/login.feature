@login.feature
Feature: testing edu.goit Login Page

  Background: go to the login page
    Given I am on the "login" page

  @tc01 @tc02 @tc03 @login @positive @smoke @regression @critical @ui
  Scenario Outline: TC <num> <segment> - Login with valid credentials
    When I enter valid credentials "<email>" and "<password>" and click the login button
    Then I should be redirected to the homepage
    Examples:
      | num | email                 | password   | segment |
      |  01 | user888@gmail.com     | 1234567890 | Regular |
      |  02 | user888@gmail.com     | 1234567890 | Premium |
      |  03 | user888@gmail.com     | 1234567890 | VIP |

  @tc04-11 @login @negative @smoke @regression @ui
  Scenario Outline: TC <num> <expectedMessage> - Login failure with various invalid credentials
    When I enter invalid credentials "<email>" and "<password>"
    Then I should see an error message "<expectedMessage>"
    Examples:
      | num | email             | password   | expectedMessage |
      |  04 | deneme@homecom    | ajaja156   | Incorrect email address |
      |  05 |                   | 1234567890 | Email address is missing |
      |  06 | user888@gmail.com |            | Enter the password to continue |
      |  07 |                   |            | Email address is missing , Enter the password to continue |
      |  08 | user888@gmail.com | ajaja156   | An incorrect username or password has been submitted |
      |  09 | deneme@homecom    | 1234567890 | Incorrect email address |
      |  10 | deneme@homecom    |            | Incorrect email address , Enter the password to continue |
      |  11 |                   | ajaja156   | Email address is missing |
    


