# nikko-dumrique-IS24-full-stack-competition-req97073

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup Prereqs](#setup-prereqs)
* [Setup](#setup)
* [Troubleshooting](#troubleshooting)

## General info
A full-stack application which catalogs active projects within an organization.
	
## Technologies
Project is created with:
* Node.js version: 16.13.2
* Express.js version: 4.18.2
* React version: 18.2.0
* Docker version: 20.10.23
* Docker Compose version: v2.15.1
* swagger-jsdoc version: 6.2.8

## Setup Prereqs: 
To use this application, you must first install Docker on your local machine. Installation documents for Docker can be found [here](https://docs.docker.com/desktop/).
Additionally Git must be installed on your local machine. Installation documents for Git can be found [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
A terminal is used to run the following setup commands.
Please ensure you have [GNU make](https://www.gnu.org/software/make/) on your computer. 
Installation of this can vary between devices but can be achieved by running the following in a terminal:
##### GNU Install
Linux:
```
sudo apt-get install make
```

MacOS:
```
brew install make
```

Windows:
```
choco install make
```


## Setup

Running this project: 


1. clone the repository onto your local machine (SSH and HTTP examples are provided below).

##### SSH Clone:
```
$ git clone git@github.com:nkoda/nikko-dumrique-IS24-full-stack-competition-req97073.git
```

##### HTTP Clone:
```
$ git clone https://github.com/nkoda/nikko-dumrique-IS24-full-stack-competition-req97073.git
```


2. Navigate to the root of the repository directory:
```
$ cd ../nikko-dumrique-IS24-full-stack-competition-req97073.git
```

3. Run the makefile command to build the docker images and run docker-compose
```
$ make build-run-all
```

4. Access the application at `http://localhost:3000`


5.(OPTIONAL) When done with the application, remove the images by running the following makefile command:
```
$ make remove-images
```



## Troubleshooting
* If Docker fails to pull the associated images, you can manually run the applications by running 'npm start' within both the `backend` and `frontend` directories.

* Swagger documentation is provided by visiting the following url when application is running:
```
http://localhost:8080/api-docs/#/
```

* If you encounter any issues, try rebuilding the Docker images:
```
docker-compose build --no-cache
```

* If you want to run the application in the backgroun, use the `-d` flag:
```
docker-compose up -d
```

* To stop the application, press `CTRL + C` on windows, or `CMD + C` on mac in the terminal, or run the following command:
```
docker-compose down
```
