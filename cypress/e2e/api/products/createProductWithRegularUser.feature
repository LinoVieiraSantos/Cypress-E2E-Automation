@api @products
Feature: Product API

  Scenario: Should not create a product as a regular user
    Given an authenticated regular user exists
    And I have valid product data
    When I try to create the product
    Then I should receive an administrator permission error