@api @carts
Feature: Cart API

  Scenario: Successfully cancel a purchase
    Given an authenticated user with an existing cart
    When I cancel the purchase
    Then the cart should be cancelled successfully