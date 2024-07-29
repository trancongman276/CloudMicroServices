#!/bin/bash

# Define your Docker repository
DOCKER_REPO="doku96522"

# Function to build Docker images
build_images() {
  echo "Building Docker images..."

  # Build user service image
  docker build -t $DOCKER_REPO/user-service:latest ./services/user-service

  # Build booking service image
  docker build -t $DOCKER_REPO/booking-service:latest ./services/booking-service

  # Build hotel service image
  docker build -t $DOCKER_REPO/hotel-service:latest ./services/hotel-service

  # Build rating service image
  docker build -t $DOCKER_REPO/rating-service:latest ./services/rating-service

  # Build payment service image
  docker build -t $DOCKER_REPO/payment-service:latest ./services/payment-service

  # Build PostgreSQL image
  docker build -t $DOCKER_REPO/postgres-db:latest ./database

  # Build NGINX image
  docker build -t $DOCKER_REPO/nginx:latest ./nginx

  # Build Prometheus image
  docker build -t $DOCKER_REPO/prometheus:latest ./monitoring/prometheus

  # Build Grafana image
  docker build -t $DOCKER_REPO/grafana:latest ./monitoring/grafana

  echo "Docker images built successfully."
}

# Function to push Docker images to repository
push_images() {
  echo "Pushing Docker images to repository..."

  # Push user service image
  docker push $DOCKER_REPO/user-service:latest

  # Push booking service image
  docker push $DOCKER_REPO/booking-service:latest

  # Push hotel service image
  docker push $DOCKER_REPO/hotel-service:latest

  # Push rating service image
  docker push $DOCKER_REPO/rating-service:latest

  # Push payment service image
  docker push $DOCKER_REPO/payment-service:latest

  # Push PostgreSQL image
  docker push $DOCKER_REPO/postgres-db:latest

  # Push NGINX image
  docker push $DOCKER_REPO/nginx:latest

  # Push Prometheus image
  docker push $DOCKER_REPO/prometheus:latest

  # Push Grafana image
  docker push $DOCKER_REPO/grafana:latest

  echo "Docker images pushed to repository successfully."
}

# Function to apply Kubernetes configurations
deploy_kubernetes() {
  echo "Deploying Kubernetes resources..."

  # Apply Kubernetes configurations for PostgreSQL
  kubectl apply -f kubernetes/postgres-pvc.yaml
  kubectl apply -f kubernetes/postgres-deployment.yaml
  kubectl apply -f kubernetes/postgres-service.yaml
  kubectl apply -f kubernetes/db-secret.yaml

  # Apply Kubernetes configurations for user service
  kubectl apply -f kubernetes/user-deployment.yaml
  kubectl apply -f kubernetes/user-service.yaml

  # Apply Kubernetes configurations for booking service
  kubectl apply -f kubernetes/booking-deployment.yaml
  kubectl apply -f kubernetes/booking-service.yaml

  # Apply Kubernetes configurations for hotel service
  kubectl apply -f kubernetes/hotel-deployment.yaml
  kubectl apply -f kubernetes/hotel-service.yaml

  # Apply Kubernetes configurations for rating service
  kubectl apply -f kubernetes/rating-deployment.yaml
  kubectl apply -f kubernetes/rating-service.yaml

  # Apply Kubernetes configurations for payment service
  kubectl apply -f kubernetes/payment-deployment.yaml
  kubectl apply -f kubernetes/payment-service.yaml

  # Apply Kubernetes configurations for NGINX
  kubectl apply -f kubernetes/nginx-deployment.yaml
  kubectl apply -f kubernetes/nginx-service.yaml

  # Apply Kubernetes configurations for monitoring
  kubectl apply -f kubernetes/prometheus-deployment.yaml
  kubectl apply -f kubernetes/prometheus-service.yaml
  kubectl apply -f kubernetes/grafana-deployment.yaml
  kubectl apply -f kubernetes/grafana-service.yaml
  kubectl apply -f kubernetes/node-exporter-daemonset.yaml

  echo "Kubernetes resources deployed successfully."
}

# Build, push, and deploy
build_images
push_images
deploy_kubernetes

echo "Deployment completed successfully."
