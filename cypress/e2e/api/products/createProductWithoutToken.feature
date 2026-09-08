@api @products
Feature: Create product without authorization

  Scenario: Attempt to create a product without an authorization token
    Given I have valid product data
    When I send a request to create a product without an authorization token
    Then I should receive an unauthorized product creation response