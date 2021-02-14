# [Timestamp Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice)

### Timestamp Project

---

This microservice will be able to take in parameters related to a requested timestamp, and return a JSON formatted response with that timestamp
in UNIX and UTC formats.

The functionality will look something similar to [this](https://timestamp-microservice.freecodecamp.rocks/).

---

It appears I will need an HTML landing page, and on that page a description of the parameters to pass.
The user will then be able to pass in a URL with a particular format for the request, then receive a JSON formatted response.

---

### User Stories

| Story                                                                                                          | Completed? |
| -------------------------------------------------------------------------------------------------------------- | ---------- |
| I can access a landing page with a description of the parameters to pass                                       | **YES**    |
| I can pass a date parameter to the page and receive a JSON-formatted response with the time in UNIX format     | **YES**    |
| I can pass a date parameter to the page and receive a JSON-formatted response with the time in UTC format      | **YES**    |
| I can pass a UNIX time parameter to the page and receive a JSON-formatted response with the time in UTC format | **YES**    |
| I can pass a UNIX time parameter to the page and receive a JSON-formatted response with the time in UTC format | **YES**    |

---

### Implementation

In the boilerplate, it looks like we're intended to retrieve **route parameters**.
Route parameters are included in the URL, and can be retrieved programmatically using the HTML _request_ object.

_Example_:  
_https://timestamp-microservice.freecodecamp.rocks/api/timestamp/**2021-12-25**_

---

#### UNIX Timestamp

The UNIX timestamp is an integer that represents the number of seconds elapsed since January 1 1970.

In the FreeCodeCamp example, it looks as though this is calculated incorrectly. To get the date passed in converted into Unix time, I converted the time passed in
into a JavaScript `Date()` object, then divided this by 1000. The significance of the 1000 is that this represents 1000 milliseconds, or _one second_.

#### UTC Timestamp

The format used in the FreeCodeCamp example is stringified using JavaScript's built-in `.toUTCTime()` function.

#### Converting things to UTC, given UNIX time

The API is able to receive dates parameterized as UNIX timesstamps. This is a fancy way of describing how many seconds have passed since January 1 1970,
so for my implementation I just converted this into an integer and then converted that integer to a date.

To determine if the parameter was already in date or UNIX time, I implemented simple validation to verify if Date()
functions worked on the raw input. If not, I assumed this is is a UNIX time and converted to an Integer, then to a Date.
