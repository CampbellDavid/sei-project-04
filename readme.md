![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Project Four - Extreme Meet Up

Software Engineering Immersive: Project 4 (Solo Project)

This was a solo project for the Software Engineering Immersive at General Assembly London (Week 12) built with React.js and Django.

## Built With

1. HTML5
2. CSS3
3. JavaScript
   - ECMAScript6
   - React.js
   - Node.js
   - Express.js
   - Axios
4. PostgreSQL
   - Django
5. Testing
   - Manual: Insomnia
   - Automated: Mocha & Chai
6. GitHub

# User Experience

## Login & Register

User registration and login is required if the user wishes to perform create, update and delete functions on the database. Read capabilities are accessible without registration, however due to the setup of some sections of the site, a user may not be able to read data on come pages, as the code will return null if there is no user present. This is a bug I need to look into fixing, as I would like to enable the user to access sections of the site without registration.

<img src="screenshots/login_screen.png" width=700>

#

## Profile

Once logged in, users can navigate to the 'MY ACCOUNT' section (accessible from the navigation bar) if they wish to edit any section of thier account, such as updating their name, password or profile image.

<img src="screenshots/user_form.png" width=700>

#

## Homepage

The homepage is the page any user is presented with upon navigation to the URL. This displays the site name, slogan and an image. Users can vavigate to other sections of the app from here using the links int he navigatuo bar.

<img src="screenshots/home_screen.png" width=700>

#

## Posting/editing/deleting a sport

Active users (logged in) can post to the sport section of the database by navigating to the 'SPORTS' link in the navbar and selecting 'Create Sport'.

<img src="screenshots/sports_index.png" width=400>

Users will then be presented with a form for completion.

<img src="screenshots/sport_form.png" width=400>

If a user selects a sport from the sport index page, they will then be shown the sport in detail. This page displays all the sport information, including a brief summary, event's linked to said sport, and a graphic that represents the sport.

<img src="screenshots/sport_display.png" width=400>

If the user created the sport in question, then 'Edit Sport' and 'Delete Sport; buttons will appear, enabling the user to respectively amend any details of the sport or delete it entirely. If the user selects the edit function, then the form displayed above will be automatically popualted with the pre-existing data.

#

## Posting/editing/deleting an event

Again, users must be logged in to perform CUD actions on the event section of the database (read actions do not require a user to be loggen in here). This can be achieved by loggin in, navigating to the 'EVENTS' section of the site and selecting 'Create Event'.

<img src="screenshots/event_index.png" width=400>

A form is then displayed for the user to complete.

<img src="screenshots/event_form.png" width=400>

The same as with the sport section, when an event is selected from the event index page, the user will be shown the event display page, which contains information in detail relating to a single event. This data includes, location, price, date, title and teams. IF the user logged in is the owner of the event, then they too can edit and delete the event by selecting the appropriate buttons that will appear if the conditions for ownership are met.

<img src="screenshots/event_display.png" width=400>

The user can also add and remove the event from their wishlist and shopping cart by selecting the appropriate buttons displayed in the above screenshot. Note that the user can also add themselves to any teams nested within the event, create new teams, and if they own the team, edit the team name and delete the team altogether.

## Shopping Cart and Checkout

The user has a shopping cart that is attached to their account ID. This is a list of dictionaries that is edited whenever the user performs an update on this section of the database. The user's shopping cart can be viewed by navigating to the 'SHOPPING CART' link in the navbar.

<img src="screenshots/shopping_cart.png" width=400>

The shopping cart will display all items in the cart, and will also allow the user to remove any items they do not want before checkout. Each card within the checkout also links to the appropriate event display page.

<img src="screenshots/checkout_screen.png" width=400>

The checkout screen displays all items and the grand total. This page is for the user's information solely. They cannot remove any items from the checkout.

The payment screen uses `react-credit-cards` and an animated graphic I found online that displays the user's inputted data (i.e. the card number, their name, the expiraton date and the CVC). The card graphic at the top will automatically change depending on the first series of digits that are entered, as this will dictate the card type (e.g. AMEX, MasterCard, VISA...). The graphic will also flip over to show the reverse of the card when the user clicks on the CVC field of the form.

<img src="screenshots/payment_screen_card.png" width=400>
<img src="screenshots/payment_screen_cvc.png" width=400>

This section of the site is for display purposes only at current, to show what I would like to happen on the app; no payment will be taken in the case of a user netering correct card details, and none will be saved.

#

## Planning

-- BACKEND --

The backend of this app was created over the courdse of two days and was edited as capabilities and errors were discovered. I used Django to develop the backend for this project.

<img src="screenshots/erd.png" width=400>

The ERD above demonstrates the different sections of the database and how they relate to each other.

-- FRONTEND --

The frontend was developed using React.js and Axios for communication with the backend. We started developing the frontend on the second day of the project, in order to maximize our time and use the time we had efficiently. We have implemented the use of various concepts that we have learned over the preceding several weeks leading up to the development of this application.

The frontend is separated into six separate directories, all located within the 'components' directory which is located in 'src'. Each folder and nested file have been named to reflect the functionality of the file. For example, 'auth' contains files necessary for the correct execution of the login and register functions, and for the protection of access to certain member-only features within the site.

Login is necessary for a user to access features such as the creation, edition and deletion of data within models; a user must be logged in to create a new event, pub or team. This was achieved through the development of the 'authorization.js' file in the 'lib' directory located in the back end. This file has been imported wherever a change to the page needs to reflect if the user is logged in and who the user is. For example, a post request to the 'teams' section of the API requires a token, reflected in the following section of code:

```handleSubmit = async e => {
    e.preventDefault()
    const eventId = this.props.match.params.id
    try {
      await axios.post(`/api/events/${eventId}/teams`, this.state.team, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
      this.props.history.push(`/events/${eventId}`)
    } catch (error) {
      console.log(error)
    }
  }
```

Meanwhile, a ternary statement was used to discern if the user was logged in to be able to show the button to create a new pub:

```
  {Authorization.isAuthenticated() ?
    <Link to="/pubs/new">
      <button
        className="button"
        type="button">New Pub</button>
    </Link>
    : null}
```

The isOwner() identifier was used to discern if a user's profile belonged to the currently logged in user. If this is a match, the 'edit' button will appear:

```
isOwner = () => Authorization.getPayload().sub === this.state.user._id

render() {
    const userId = this.props.match.params.id
    return(
      {this.isOwner() && <Link to={`/profiles/${userId}/edit`}>
              <button type="button" className="button">Edit Profile</button>
            </Link>}
    )
}

export default Profile
```

## Project Management

We structured the ten days we had as follows:
Day 1:

- Planning and assignment of tasks

Day 2:

- Began backend development
- Seed development
- Tests
- Start of frontend development

Day 3 - Day 8:

- Continual changes to backend as issues were discovered
- Development of frontend
- Testing using Mocha and Chai

Day 9:

- Fixing errors so that minimum viable product can be showcased
- Begin styling

Day 10:

- Continued amendments to code for added features
- Finishing touches to styling

## Challenges & future improvements

I believe we produced an exceptional amount of work and to a high standard for the ten days we had to produce this project, working very well as a team with ambitious goals and a can-do approach to problem solving.

Given more time, the added features we wanted to implement include the capability of an instant messaging feature, the ability to take payments for pub quizzes and for the app to display who has paid in the team, the ability to 'buy a pint' for other users. Additionally, more time would ideally have been allocated to styling the site, however we collectively agreed that the application's functionality was of higher importance.

The app has some errors that require addressing. The first I would like to address relates to the functionality that allows users to add and remove themselves to teams within the quiz. At present, it is possible to belong to two teams at the same time; this is a bug that needs addressing so that any one user can only belong to a single team whilst they are not a member of any others. The 'add to team' function is also only visible from the front end at present, meaning when the page is refreshed the data reverts back to its original state. The reason for this was due to the time crunch we experienced when developing the application, as this was a feature we left until later and required for demonstration. It would also be good if a single user could only belong to one event at any given time, as the way the app is configured currently allows users to be able to belong to multiple teams at various pubs simultaneously. We would have liked to achieve this and have all current attending events visible to the user through the profile view page. Finally, the current team captain does not change in the case that the user who created the team leaves; we tried to set the team captain as the '0' index of the members array, however it wasn't rendering properly in the frontend.

Additionally, a user is currently able to add multiple star ratings to a single pub, which is a big that needs addressing. We would achieve this through the use of the .contains() method on the star rating array, as the array is set up to consist of objects which has the user data nested within; the star rating number simply returns the sum of all ratings divided by the length of how many users have left a star rating.
