@api @carts
Feature: Cart API

  Scenario: Successfully complete a purchase
    Given an authenticated user with an existing cart
    When I complete the purchase
    Then the cart should be removed successfully