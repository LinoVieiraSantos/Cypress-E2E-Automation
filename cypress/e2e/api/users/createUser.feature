@api @users
Feature: User API

  Scenario: Successfully create a new user
    Given I have valid random user data
    When I send a request to create the user
    Then the user should be created successfully