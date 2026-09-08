@api @carts
Feature: Create cart without authentication

  Scenario: Attempt to create a cart without an authorization token
    Given I have valid cart data
    When I send a request to create a cart without an authorization token
    Then I should receive a cart creation unauthorized response