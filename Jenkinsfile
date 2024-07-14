pipeline {
    agent any

    stages {
        stage('Fetch the code') {
            steps {
                script {
                    git branch: 'master', url: 'https://github.com/Muhammad-Shawaiz/3-Tier-Application.git'
                    
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("react-app", "-f Frontend/Dockerfile Frontend")
                    docker.build("node-backend", "-f Backend/Dockerfile Backend")
                    sh 'docker pull mongo'
                    
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d -p 27017:27017 --name=db mongo'
                    sh 'docker run -d -p 4000:4000 --name=backend node-backend'
                    sh 'docker run -d -p 3000:80 --name=react react-app'
                }
            }
        }
    }
}
