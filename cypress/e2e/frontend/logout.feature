@logout
Feature: User Logout

  Scenario: Successful logout
    Given I visit the login page
    And I login with the user created for logout
    When I logout from the application
    Then I should be redirected to the login page