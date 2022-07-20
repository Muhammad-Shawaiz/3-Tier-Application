# 3-Tier-Application

## Steps which are common in all scenarios

### Note: We assume that you have docker installed in your machine.

### Step 1

#### Clone this repo to your machine.

`git clone https://github.com/Muhammad-Shawaiz/3-Tier-Application`

### Step 2
 
#### Move into the Frontend Directory

`cd Frontend`

### Step 3 

#### Open into .env file

`vim .env`

### Step 4 

#### Change the PUBLIC_URL with your machine/VM IP .

`REACT_APP_PUBLIC_URL=http://<your machine/ VM IP>:4000/`

### Step 5

#### Save the File.

  `wq!`
  
#### Go back  

  `cd ..`
  
#### Move to Backend Directory

  `cd Backend`

### Step 6

#### Open .env file

`vim .env`

### Step 7

#### Change the your IP of mongoDBConnection and redirectUrl with your machine/VM IP.

`mongoDBConnection=mongodb://<machine/VM IP>:27017`

`redirectUrl=http://<machine/VM IP>/resetpassword`

#### Close the file
  
  `wq!`


## Scenario 1 : Run the Application using Docker Compose File

### Step 1

#### Run the command

`docker-compose -d up`

#### Now your stack is up.

##### Write the IPv4 of your machine/VM in your Browser along with Port Number 3000 and the Web App will be in front of you.

## Scenario 2 : Run the Application using Docker File



### Step 1

#### Pull docker image of mongodb

`docker pull mongo`

#### Run mongo container

`docker run -d -p 27017:27017 --name=db mongo`

#### Move into Frontend Directory.

`cd Frontend`

#### Run the Frontend DockerFile.

`docker build . -t front`

#### Go back and move to Backend Directory.

`cd ..` 

`cd Backend`

#### Run the Backend DockerFile.

`docker build . -t back`


#### After Building the Image ,Run containers.

`docker run -d -p 3000:80 --name=frontend front`

`docker run -d -p 4000:4000 --name=backend back`

#### Now your stack is up.

##### Write the IPv4 of your machine/VM in your Browser along with Port Number 3000 and the Web App will be in front of you.





