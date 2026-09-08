@api @products
Feature: Product API

  Scenario: Successfully update an existing product
    Given an authenticated administrator exists
    And an existing product is available
    And I have updated product data
    When I update the product
    Then the product should be updated successfully