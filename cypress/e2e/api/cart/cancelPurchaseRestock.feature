@api @carts
Feature: Cart API

  Scenario: Should restore product stock when cancelling a purchase
        Given an authenticated user with an existing cart
        When I complete the purchase
        Then the purchase should be completed successfully