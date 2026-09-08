@api @carts
Feature: Cart API

  Scenario: Successfully get an existing cart by ID
    Given an authenticated user with an existing cart
    When I request the cart by ID
    Then the cart should be returned successfully