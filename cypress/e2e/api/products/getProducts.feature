@api @products
Feature: Product API

  Scenario: Successfully list products
    When I request the list of products
    Then the list of products should be returned successfully