@api @users
Feature: User API

  Scenario: Successfully get a user by ID
    Given an existing user is available
    When I request the user by ID
    Then the user should be returned successfully