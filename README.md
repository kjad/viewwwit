# viewwwit

A simple image viewer for reddit. Check it out @ [viewwwit.com](http://viewwwit.com/ "viewwwit.com")

## Getting Up & Running

To run the project locally
```
git clone https://github.com/kjad/viewwwit.git
cd viewwwit
npm run start
```

## Frameworks & technologies

Viewwwit uses [React](https://reactjs.org/) and [Bulma](https://bulma.io/) to create the front end application

Other plugins utilized include:
- [lodash](https://lodash.com/)
- [React Router](https://github.com/ReactTraining/react-router)

## Development Notes

### TODO

#### UI
- Cleanup image layout (need to solve the "image layout strategy" problem)
- Create search bar for subreddit
- Dynamic URL routing, ex: "/r/aww", "/r/pics", ...
- Combination subreddts: "/combo/aww+pics"
- Sidenav of subreddts selected??
- Show post title over each post
- Clickable posts for enlarged view

#### Other
- Travis CI & auto-deployment
- LICENSE file
- CONTRIBUTING guide
- SSL Cert for viewwwit.com

### Image layout strategy
- Each Post will
  - async determine the url
  - then async determine type of content
  - then async load the content
  - then async determine dimensions of the content
  - finally set valid flag if we successfully determined the content & size

- The Mosaic will receive Posts as they are completed (filtering on .valid)
  - Each post will be added to the current row (up to 5, for now) and rendered

# Created with React

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
