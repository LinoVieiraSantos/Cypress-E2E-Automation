Feature: User Login

  Scenario: Successful login with registered user
    Given I visit the login page
    When I login with the registered user
    Then I should be redirected to the home page