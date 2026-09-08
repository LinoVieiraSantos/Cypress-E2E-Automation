@api @carts
Feature: Cart API

  Scenario: Successfully list carts
    When I request the list of carts
    Then the list of carts should be returned successfully