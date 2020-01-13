# Running the project

NB! The project requires node v10+ and npm to be installed. If you have something running on port `3000`, please shut it down before running the project.

The project is structured in two directions - frontend and backend. By running the `start.sh` script from the home folder, it should run both the NodeJS backend used for fetching the CPU data
and the frontend in development mode will be run on `localhost:3000`.

## Simulation of load

There is a `highload.sh` script that is located in the home directory. It's goal is to simulate CPU load by running dummy tasks and killing them after some period of time. Run the script after you have started the project using the `start.sh` script.

## Running the tests

In order to run the tests navigate to the frontend folder and run `npm run test`, this will trigger a test run of the unit tests that are available

## Future improvements

There are many things that could be improved in the project, so here I will list just a few of them

* Add better test coverage for both UI and API - unit and integration tests
* Improve overall UI/UX
* Optimize data stream computation - use smarter algorithm (no need to parse the whole stream every time) that can handle more data points
* Add CSS component framework for easy styling like `emotion`, etc.
* Add support for accessibility features
* Add production build and dockerize the application for easy deployment.
* Add support for Jenkins pipeline

## License
Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/typescript-hapi-starter/blob/master/LICENSE) for more information
