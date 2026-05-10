pipeline {

    agent any

    environment {

        MINIKUBE_HOME = "/home/javva/.minikube"

    }

    stages {

        stage('Build User Service') {

            steps {
                sh 'cd user-service && docker build -t user-service:v1 .'
            }
        }

        stage('Build Product Service') {

            steps {
                sh 'cd product-service && docker build -t product-service:v1 .'
            }
        }

        stage('Build Order Service') {

            steps {
                sh 'cd order-service && docker build -t order-service:v1 .'
            }
        }

        stage('Load Images Into Minikube') {

            steps {
                sh 'MINIKUBE_HOME=/home/javva/.minikube minikube image load user-service:v1'
                sh 'MINIKUBE_HOME=/home/javva/.minikube minikube image load product-service:v1'
                sh 'MINIKUBE_HOME=/home/javva/.minikube minikube image load order-service:v1'
            }
        }

        stage('Deploy To Kubernetes') {

            steps {

                sh 'kubectl apply -f kubernetes/deployments/'
                sh 'kubectl apply -f kubernetes/services/'
                sh 'kubectl apply -f ingress/'
            }
        }

        stage('Verify Pods') {

            steps {
                sh 'kubectl get pods'
            }
        }

        stage('Verify Services') {
            steps {
                sh 'kubectl get svc'
            }
        }

        stage('Verify Ingress') {

            steps {
                sh 'kubectl get ingress'
            }
        }
    }
}
