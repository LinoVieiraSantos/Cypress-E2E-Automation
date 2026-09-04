Feature: User Registration

  Scenario: Successful registration with valid details
    Given I visit the registration page
    When I fill in the registration form with random user data
    And I click on the Cadastrar button
    Then I should be redirected to the home page