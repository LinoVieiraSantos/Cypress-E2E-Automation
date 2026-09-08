@api @users
Feature: User API

  Scenario: Should not find a non-existing user
    Given I have a non-existing user ID
    When I request the user by ID
    Then I should receive a user not found error