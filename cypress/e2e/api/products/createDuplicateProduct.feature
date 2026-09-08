@api @products
Feature: Product API

  Scenario: Should not create a product with an existing name
    Given an authenticated administrator exists
    And an existing product is available
    When I try to create another product with the same name
    Then I should receive a duplicate product error