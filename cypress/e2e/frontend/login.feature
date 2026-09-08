@login
Feature: User Login

  Scenario: Successful login with registered user
    Given I visit the login page
    When I login with the registered user
    Then I should be redirected to the home page

  Scenario: Unsuccessful login with invalid email and password
    Given I visit the login page
    When I login with invalid credentials
    Then I should see the invalid login error message