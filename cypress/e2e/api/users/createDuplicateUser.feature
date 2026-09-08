@api @users
Feature: User API

  Scenario: Should not create a user with an existing email
    Given a user already exists
    When I try to create another user with the same email
    Then I should receive a duplicate email error