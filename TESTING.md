# Component Testing
Component testing specs are placed with their related components.
## InterfaceHeader
This component represents the general header element across the whole application.
Component Testing follows the following flow:
* **Under unauthorized environment**
  * Check elements displayed as expected
* **Under authorized environment**
  * Check elements displayed as expected
  * Try to log out
  * Check if the page is navigated
## ItemPropertyGeneric
This component represents a listing item displayed on homepage.
* **With given data**
  * Check basic elements displayed as expected
  * Check navigation link as expected
  * Check `status` displayed as expected
  * Check `reviews` displayed as expected
## ItemPropertyHosted
This component represents a listing item displayed on dashboard.
* **With given data**
  * Check basic elements displayed as expected
  * Check `button` **Unpublish** exists if the listing is published
  * Check `button` **Publish** exists if the listing is not published
  * Try to publish with default settings
  * Check `button` **Unpublish** exists after publishing
# UI Testing
## User happy path
As defined in spec.