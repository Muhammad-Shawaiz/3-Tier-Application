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
                    
                }
            }
        }
    }
}
