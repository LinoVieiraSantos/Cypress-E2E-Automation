@fixtureLogin
Feature: User Login With Registered User

  Scenario: Successful login using the user created in the registration scenario
    Given I visit the login page
    When I login with the user stored in the fixture
    Then I should be redirected to the home page