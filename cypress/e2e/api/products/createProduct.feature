@api @products
Feature: Product API

  Scenario: Successfully create a product as administrator
    Given an authenticated administrator exists
    And I have valid product data
    When I create the product
    Then the product should be created successfully