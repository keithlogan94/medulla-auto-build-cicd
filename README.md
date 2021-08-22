# To Start Application
- clone the application to a local hosting server
- start the build docker image by running `docker run --privileged -e DOCKER_USERNAME={username} -e DOCKER_PASSWORD={password} -d --rm --name=build-image build-image`
- create an environment variable `MATCH_ACCESS_KEY` and set it to an accesskey
- start the webserver by running `node dist/`
- setup a github workflow that sends a get request to the host server at `http://{host serverdomain}:5000/build?accessKey={accessKey}` whenever there is a commit push



# Docker Images Building

### In order to run the build image docker image run:

`docker run --privileged -e DOCKER_USERNAME={username} -e DOCKER_PASSWORD={password} -d --rm --name=build-image build-image`

### Environment variables
You have to set the following environment variables 
`DOCKER_USERNAME`, and `DOCKER_PASSWORD` so that pushes can be done to dockerhub

### To build docker image

`cd build-image/`

`docker build -t build-image .`

### To run the script that builds medulla-frontend from source and publishes to recrodeveloper/medulla-frontend:latest

`docker exec build-image /bin/sh /app/build.sh`


# How it works

<p>there is an express webserver that is listening for requests to http://localhost:5000/build
requests to http://localhost:5000/build?accessKey=test
need to provide a url query accessKey.

Then the webserver will start the docker image that builds the repo from source and publishes the image</p>



