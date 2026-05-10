pipeline {

    agent any

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
                sh 'minikube image load user-service:v1'
                sh 'minikube image load product-service:v1'
                sh 'minikube image load order-service:v1'
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

        stage('Verify Ingress') {

            steps {
                sh 'kubectl get ingress'
            }
        }
    }
}
