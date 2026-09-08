@api @users
Feature: User API

  Scenario: Successfully list users
    When I request the list of users
    Then the list of users should be returned successfully