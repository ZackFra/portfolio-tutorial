# portfolio-tutorial

## Day 1

### Set Up

There are multiple different boilerplates for creating a web-based React app.
In this tutorial, we will be using Create-React-App. The reason for this selection
is that Create-React-App is the easiest to use and requires the least configuration.

<aside>
Three popular frameworks for creating React apps are,
1. Create-React-App
2. Gatsby
3. Next.js
</aside>

In order to create an app with Create-React-App, we will use npx. npx is a tool 
provided by the Node Package Manager to execute npm package binaries. With this
we can run create-react-app without having to download it globally.

The first step is to create a github repository for our project so we can have
version-control, as well as to track our progress. Next we will create a folder for
our project. In that folder we will create two folders,

1. client
2. server

The client will be the front-end of our app, or the site that people see, whereas the
server will handle API requests, as well as serve our client once we deploy to Heroku.


```
mkdir portfolio-tutorial
cd portfolio-tutorial
mkdir client
mkdir server
npx create-react-app client
```

Note: create-react-app takes as a parameter the directory where it will set up the boilerplating
for the app. Without specifying the directory, create-react-app will do nothing. To see all the
options for create-react-app, run `npx create-react-app --help`

### Directories

First, lets get a sense of what we just created.
In our client folder, we will now have a node_modules folder, a package.json file, a package-lock.json file,
a public folder, a .gitignore file, and a src folder.

The node_modules folder will contain all of the npm packages installed for this project. Every time we run
`npm i *package*`, the package we install will be saved into node_modules so we can access it later.

The package.json is a manifest of all of the packages we have installed, scripts we have set up, 
configuration data, and other miscellaneous metadata important to our project. The important
thing to note is that this is where `npm start` and `npm build` are defined.

The .gitignore file is a file that tells git which files to ignore when we push our application
to github. Because node_modules is typically as massive folder, it is included in the .gitignore
file by default.

The package-lock.json file is a file automatically generated every time we run `npm i`. It describes the exact tree 
that was generated by the install, such that subsequent installs are able to generate identical trees, regardless of 
intermediate dependency updates.

The public folder contains all of the files that are public to users of our site. The most important file is index.html,
which is the boilerplate html page that every React page we build will be generated on. 

The src folder is where we will build all of our components, define all our utilities, and write the majority of our
code.

We can also add a .env file to set environment variables during development. If you add a .env file to your application,
make sure to add .env to your .gitignore file so that people cannot check your github to discover what those environment
variables are. When we deploy, we will need to set those environment variables by hand.

### JSX Intro

JSX is the lifeblood of a React application. It is what allows us to create interactive components that re-render without
having to have multiple HTML pages. JSX code looks like HTML, but it is actually a complicated Javascript object with data that
tells react-scripts how to render it.

You can also embed any Javascript expression into a JSX component by using the { } characters. We can also apply styling to components
like HTML tags by using the className and style props. You should use the className prop almost exclusive, and define custom CSS
classes for each usage. The style prop is useful for when you need to use calculated data from the application to set the styling.

A functional component is any function that starts with an uppercase letter and returns JSX. Functional components repeatedly
render over and over again and are updated on each subsequent render.

```
const App = (props) => (
	<h1>{props.title}</h1>
);
```

Note that the h1 does not start with an uppercase letter. This is because anything that starts with
a lowercase letter is assumed to be an HTML element.

Class-based components are more complex, but have more versatility. For example, you can refer to a class-based component
from another component and call it's functions from that other component, but you cannot do that with functional component.

```
class App extends React.Component {
	render() {
		return (
			<h1>{this.props.title}</h1>
		);
	}
}
```

Whereas in a functional component it is assumed that the function returns JSX, a class-based component requires a render function
that returns JSX, so react-scripts can call that function and know what to render onto the screen. In order to re-render a 
class-based component, you call its setState function.

Both functional and class-based components can have internal states, which are like global variables that can be accessed
at any point during the life-cycle of the component while it is mounted. The difference here is that in component based functions,
those variables can be accessed externally by functions in other components. In functional components, those variables are
isolated to that component. Functional and class-based components also create those states differently. Class-based components
set those variables by using a state object, functional components use the useState hook.

```
class App1 extends React.Component {
	state = {
		message : "HI!"
	}
	
	render() {
		return <h1>{this.state.message}</h1>
	}
}

const App2 = () => {
	const [message, setMessage] = useState("HI!");
	
	return <h1>{message}</h1>
}

```

Each component can take props, which are extra parameters to the component. These are accessed in functional components by using
the parameter of the functions, which is an object. In class-based components these are accessed by referring to this.props, or
in the constructor function as an argument passed to the constructor. The props have an equivalent representation in both functional
and class-based components. The only difference is how it's accessed.

### Life-Cycle Functions

Class-based and functional components both use life-cycle functions, but they work differently. I will just cover the major life-cycle
functions, but this is not an exhaustive list of all the life-cycle functions.

The most common class-based life-cycle functions are constructor, componentDidMount, and componentWillUnmount. 

The constructor function is called once when the component is loaded. It is only called once, and it is typically used to set up 
complex state variables.

The componentDidMount function is called after the component is mounted. By mounted, I mean after it is rendered to the screen.
If you need custom event-listeners on the object, this is the place to set them.

The componentWillUnmount function is called right before the component unmounts. This would be the place to remove event-listeners
from the DOM if any were set.

In functional components, there is no equivalent to the constructor. There are equivalents to componentDidMount and componentWillUnmount
though. This is called the useEffect hook.

```
import React, { useEffect } from 'react'; 

const App = (props) => {

	useEffect(() => {
		// do something
		
		return () => {
			// undo whatever I did
		}
	}, []);
	
	return <h1>Hello!</h1>
}
```

How useEffect works is, it uses a dependency array as it's second parameter to determine when it should re-run the callback it
recieves as it's first parameter. It calls the callback function returned by that function when the component is unmounted.
By using an empty dependency array, We tell the useEffect hook to only run this function once after the component monuts, like how
componentDidMount is only run once after a class-based component mounts. The callback function returned by that function acts like
componentWillUnmount and runs only when the component unmounts to do any necessary cleanup actions.

As a general rule, if the functional component starts looking too complicated, it's usually easier to just transform it into a 
class component.

### Routing

Because React is a single-page application, routing has to be handled internally. We handle this with an npm package called
react-router-dom. With this, we "route" by telling react-scripts which components to render given the URL requested.

```
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'

const App = () => (

	<Router>
		<Switch>
		
			<Route exact path='/'>
				<HomePage />
			</Route>
			
			<Route exact path ='/blog'>
				<BlogPage />
			</Route>
			
			<Route path='*'>
				<NotFoundPage />
			</Route>
			
		</Switch>
	</Router>
);
```

How this works is, we wrap everything in the Router component. We then use the Switch component to define a set of rules for the
router to follow when determining which component to render. We use the keyword "exact" to specify that we want the router to
redirect when the path is exactly what we specified with the path prop.

At the end, as our final route, we specify the 404 page route. We set the path to be the wildcard character so every path will render the
404 page if it was not matched by that point. It is important that this be the final route, because the router will cascade down the
ruleset to determine which component to render. If it were the first rule, every page would render the 404 page.

More information on react-router-dom can be found here, https://reactrouter.com/web/guides/quick-start

### Bootstrap

We don't just want our app to work, we also want it to not look terrible. A simple fix for this is to use bootstrap. We can set up
bootstrap on our app in two easy steps. First we run `npm i bootstrap react-bootstrap`, and second we add this line of code to the
index.js file.

```
import "bootstrap/dist/css/bootstrap.min.css";
```

This will automatically make bootstrap's styling rules and CSS classes globally available to use in every application. The react-bootstrap
package is a bunch of components wrapped around bootstrap-styled tags which makes it a lot easier to use than to have to set each class
individually.

Not to be too formal but... let make a form!

```
import { Button, Form } from 'react-bootstrap'

class LoginForm extends React.Component {

	state = {
		username: '',
		password: ''
	}
	
	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		// make an API call
	}
	
	render() {
		const { username, password } = this.state;
		const { onChange, onSubmit } = this;
		
		return (
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label htmlFor="user">Username: </Form.Label>
					<Form.Control 
						id="user"
						type="text" 
						name="username" 
						value={username} 
						onChange={onChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="pass">Username: </Form.Label>
					<Form.Control 
						id="pass"
						type="text" 
						name="password" 
						value={password} 
						onChange={onChange}
					/>
				</Form.Group>
				<Button type="submit">Submit</Button>
			</Form>
		);
	}
}

```

This showcases how to use react-bootstrap's Form and Button components as well as introduces us to how React handles events.
Events in react are set by using event props such as onSubmit, onChange, onMouseDown, and others. These event-listener props
expect a callback that expects a synthetic-event object as its first parameter. The onChange function is a generic function
that is frequently used with forms. It uses the DOM node's name, which we set explicitly to be the name of the state variable that
is associated with each respective input, to call setState and update the state of those variables. That is what [e.target.name] refers
to. The square brackets tell Javascript to evaluate the value of the variable, which is a string name. This is just a trick to increase
code reusability. The onSubmit function begins with a call to e.preventDefault. By default, when a form is submitted, the browser will
attempt to refresh the page. Given that this is a single-page application, we don't want to do that because that would reset the 
state variables and any other variables we have locally. So what we do is we prevent that behavior, then make our API requests
using either the fetch API or the axios package.

More information on bootstrap and react-bootstrap can be found here,

bootstrap: https://getbootstrap.com/
react-bootstrap: https://react-bootstrap.github.io/
