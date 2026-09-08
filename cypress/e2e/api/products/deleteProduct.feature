@api @products
Feature: Product API

  Scenario: Successfully delete an existing product
    Given an authenticated administrator exists
    And an existing product is available
    When I delete the product
    Then the product should be deleted successfully