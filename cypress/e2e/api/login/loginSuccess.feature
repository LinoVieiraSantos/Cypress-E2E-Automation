@api @login
Feature: Login API

  Scenario: Successfully login with valid credentials
    Given a registered user exists for API login
    When I send a login request
    Then I should receive a successful response
    And I should receive a token