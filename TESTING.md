# Component Testing
Component testing specs are placed with their related components.
## InterfaceHeader (Jest)
This component represents the general header element across the whole application.
Component Testing follows the following flow:
* **Under unauthorized environment**
  * Check elements displayed as expected
* **Under authorized environment**
  * Check elements displayed as expected
  * Try to log out
  * Check if the page is navigated
## ItemPropertyGeneric (Jest)
This component represents a listing item displayed on homepage.
* **With given data**
  * Check basic elements displayed as expected
  * Check navigation link as expected
  * Check `status` displayed as expected
  * Check `reviews` displayed as expected
## ItemPropertyHosted (Jest)
This component represents a listing item displayed on dashboard.
* **With given data**
  * Check basic elements displayed as expected
  * Check `button` **Unpublish** exists if the listing is published
  * Check `button` **Publish** exists if the listing is not published
  * Try to publish with default settings
  * Check `button` **Unpublish** exists after publishing
## LoginForm (Jest)
* **With given data**
  * Check basic elements displayed as expected
  * Check `link` for registration exists as expected
  * Check `button` **Submit** exists if the listing is published
  * Check `button` **Cancel** exists if the listing is not published
  * Try to login
  * Check if backend API has been called
## RegisterForm (Cypress)
* Render elements as expected
* Try to fill the form
* Try to register
## PageManage (Cypress)
* Render elements with given fake API response
* Check listing title and calculation exist as expected
# UI Testing
## User happy path (Cypress)
As defined in spec.
## Host accept a booking path (Cypress)
* register a user as host
* create a listing
* publish
* logout
* register a user as client
* go to that listing
* book once
* logout
* login as the host
* go to dashboard and manage
* accept the booking
* check that the booking has been accepted