@api @users
Feature: User API

  Scenario: Successfully update an existing user
    Given an existing user is available
    And I have new user data
    When I update the user
    Then the user should be updated successfully