<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/pikselinweb/rick-and-morty-multi-select">
    <img src="public/rickandmorty.png" alt="Logo" width="300" height="auto">
  </a>

<h3 align="center">Rick and Morty Multiselect</h3>

  <p align="center">
   This is a React application that utilizes the “Rick and Morty” API. It features a multi-select option and a search function, enabling users to easily find and select their favorite characters from the show. Dive into the universe of ‘Rick and Morty’ with ease and fun!
    <br />
    <a href="https://github.com/pikselinweb/rick-and-morty-multi-select"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://rick-and-morty-multi-select-nine.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/pikselinweb/rick-and-morty-multi-select/issues">Report Bug</a>
    ·
    <a href="https://github.com/pikselinweb/rick-and-morty-multi-select/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Rick and Morty Multiselect][product-screenshot]](https://rick-and-morty-multi-select-nine.vercel.app/)

**Application Overview:** I developed an application using Adobe’s React Aria components. The primary reasons for this choice were their asynchronous list structure and customizable components.

**Component Development:** Initially, I started with the combobox, but I realized that it does not support multiple selections beyond general usage. As a result, I created my own input component.

**Multiselect Component:** This led to the creation of a multiselect component that allows searching and multiple selections.

**Navigation:** You can navigate between selected items and input with the tab key. When you are in the input field and press the down arrow, the list opens.

**Selection:** After the list opens, you can navigate up and down between the list items and make a selection with the enter key.

**Detail Modal:** Similarly, when you click on a selected item in the input or press the space or enter key while it is selected, the detail modal opens.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![React][React.js]][React-url]

-   React Aria: A library of React Hooks that provides accessible UI primitives. Also It includes components async list for infinite scrolling.

-   Tailwind CSS

-   Lodash: A JavaScript utility library that provides helpful methods for manipulation and combination of arrays, objects, strings, etc.

-   clsx: A tiny utility library for constructing className strings conditionally.
-   @heroicons/react: A set of beautiful hand-crafted SVG icons as React components, designed by the creators of Tailwind CSS5.

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

To run this project locally you need download and install <a href="https://nodejs.org/en/download">Node.js</a>

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/pikselinweb/rick-and-morty-multi-select.git
    ```
2. Go project directory and install dependencies

```sh
 cd rick-and-morty-multi-select && npm install
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To run the project in development mode, execute the following command:

```sh
npm run dev
```

For production build:

```sh
npm run prod
```

After successful build you could preview application:

```sh
npm run preview
```

 <!-- ROADMAP -->

## Roadmap

-   [X] Developed a reusable multiselect and customizable component
-   [X] Implemented an autocomplete search feature
-   [X] Added a feature to highlight search queries
-   [X] Enabled character display in a modal view by pressing space or enter when tag selected
-   [X] Facilitated navigation and actions using keys
-   [X] Incorporated infinite scrolling functionality.
-   [X] Searh input on popover in small devices
-   [X] Select Mode Switch
-   [ ] Refactor code blocks into separate components for enhanced performance and readability
-   [ ] Optimize images for faster load times and better user experience
-   [ ] Conduct a thorough analysis of code quality
-   [ ] Perform comprehensive testing to ensure functionality and reliability
-   [ ] Develop a Storybook for documenting the application’s components

See the [open issues](https://github.com/pikselinweb/rick-and-morty-multi-select/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Gökhan Duman - [@dumangkhan](https://twitter.com/dumangkhan) - c2@gkhan.me

Project Link: [https://github.com/pikselinweb/rick-and-morty-multi-select](https://github.com/pikselinweb/rick-and-morty-multi-select)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/pikselinweb/rick-and-morty-multi-select.svg?style=for-the-badge
[contributors-url]: https://github.com/pikselinweb/rick-and-morty-multi-select/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/pikselinweb/rick-and-morty-multi-select.svg?style=for-the-badge
[forks-url]: https://github.com/pikselinweb/rick-and-morty-multi-select/network/members
[stars-shield]: https://img.shields.io/github/stars/pikselinweb/rick-and-morty-multi-select.svg?style=for-the-badge
[stars-url]: https://github.com/pikselinweb/rick-and-morty-multi-select/stargazers
[issues-shield]: https://img.shields.io/github/issues/pikselinweb/rick-and-morty-multi-select.svg?style=for-the-badge
[issues-url]: https://github.com/pikselinweb/rick-and-morty-multi-select/issues
[license-shield]: https://img.shields.io/github/license/pikselinweb/rick-and-morty-multi-select.svg?style=for-the-badge
[license-url]: https://github.com/pikselinweb/rick-and-morty-multi-select/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/gkhanduman/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[product-screenshot]: public/rick-and-morty-ss.png