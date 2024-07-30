@echo off

REM Define your Docker repository
set DOCKER_REPO=doku96522

REM Function to build Docker images
:build_images
    echo Building Docker images...

    REM Build user service image
    docker build -t %DOCKER_REPO%/user-service:latest ./services/user-service

    REM Build booking service image
    docker build -t %DOCKER_REPO%/booking-service:latest ./services/booking-service

    REM Build hotel service image
    docker build -t %DOCKER_REPO%/hotel-service:latest ./services/hotel-service

    REM Build rating service image
    docker build -t %DOCKER_REPO%/rating-service:latest ./services/rating-service

    REM Build payment service image
    docker build -t %DOCKER_REPO%/payment-service:latest ./services/payment-service

    REM Build PostgreSQL image
    docker build -t %DOCKER_REPO%/postgres-db:latest ./database

    REM Build NGINX image
    docker build -t %DOCKER_REPO%/nginx:latest ./nginx

    REM Build Prometheus image
    docker build -t %DOCKER_REPO%/prometheus:latest ./monitoring/prometheus

    REM Build Grafana image
    docker build -t %DOCKER_REPO%/grafana:latest ./monitoring/grafana

    echo Docker images built successfully.
@REM goto :eof

REM Function to push Docker images to repository
:push_images
echo Pushing Docker images to repository...

REM Push user service image
docker push %DOCKER_REPO%/user-service:latest

REM Push booking service image
docker push %DOCKER_REPO%/booking-service:latest

REM Push hotel service image
docker push %DOCKER_REPO%/hotel-service:latest

REM Push rating service image
docker push %DOCKER_REPO%/rating-service:latest

REM Push payment service image
docker push %DOCKER_REPO%/payment-service:latest

REM Push PostgreSQL image
docker push %DOCKER_REPO%/postgres-db:latest

REM Push NGINX image
docker push %DOCKER_REPO%/nginx:latest

REM Push Prometheus image
docker push %DOCKER_REPO%/prometheus:latest

REM Push Grafana image
docker push %DOCKER_REPO%/grafana:latest

echo Docker images pushed to repository successfully.
@REM goto :eof

REM Function to apply Kubernetes configurations
:deploy_kubernetes
echo Deploying Kubernetes resources... 
kubectl delete all --all
REM Apply Kubernetes configurations for PostgreSQL
kubectl apply -f kubernetes/db-secret.yaml
kubectl apply -f kubernetes/postgres-pvc.yaml
kubectl apply -f kubernetes/postgres-deployment.yaml
kubectl apply -f kubernetes/postgres-service.yaml

REM Apply Kubernetes configurations for user service
kubectl apply -f kubernetes/user-deployment.yaml
kubectl apply -f kubernetes/user-service.yaml

REM Apply Kubernetes configurations for booking service
kubectl apply -f kubernetes/booking-deployment.yaml
kubectl apply -f kubernetes/booking-service.yaml

REM Apply Kubernetes configurations for hotel service
kubectl apply -f kubernetes/hotel-deployment.yaml
kubectl apply -f kubernetes/hotel-service.yaml

REM Apply Kubernetes configurations for rating service
kubectl apply -f kubernetes/rating-deployment.yaml
kubectl apply -f kubernetes/rating-service.yaml

REM Apply Kubernetes configurations for payment service
kubectl apply -f kubernetes/payment-deployment.yaml
kubectl apply -f kubernetes/payment-service.yaml

REM Apply Kubernetes configurations for NGINX
kubectl apply -f kubernetes/nginx-deployment.yaml
kubectl apply -f kubernetes/nginx-service.yaml

REM Apply Kubernetes configurations for monitoring
kubectl apply -f kubernetes/prometheus-deployment.yaml
kubectl apply -f kubernetes/prometheus-service.yaml
kubectl apply -f kubernetes/grafana-deployment.yaml
kubectl apply -f kubernetes/grafana-service.yaml
kubectl apply -f kubernetes/node-exporter-daemonset.yaml

echo Kubernetes resources deployed successfully.
goto :eof

REM Build, push, and deploy
call :build_images
call :push_images
call :deploy_kubernetes

echo Deployment completed successfully.