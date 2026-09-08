@api @carts
Feature: Cart API

  Scenario: Successfully create a shopping cart
    Given an authenticated user exists
    And an available product exists
    When I create a shopping cart with the product
    Then the cart should be created successfully