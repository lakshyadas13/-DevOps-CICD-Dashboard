pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                echo 'Cloning project...'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run') {
            steps {
                sh 'node app.js &'
            }
        }
    }
}