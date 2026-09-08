Feature: Create duplicate product

  Scenario: Attempt to create a duplicate product
    Given an authenticated administrator exists
    And an existing product exists
    When I create a product with the same name
    Then I should receive a duplicate product error