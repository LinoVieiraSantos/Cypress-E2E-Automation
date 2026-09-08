Feature: API Login with invalid credentials

  Scenario: Login with invalid credentials
    Given I have invalid login credentials
    When I send a login request
    Then I should receive an unauthorized response
    And I should receive the invalid credentials error message