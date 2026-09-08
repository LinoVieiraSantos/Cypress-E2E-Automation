@api @users
Feature: User API

  Scenario: Successfully delete an existing user
    Given an existing user is available
    When I delete the user
    Then the user should be deleted successfully