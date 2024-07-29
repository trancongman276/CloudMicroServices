#!/bin/bash

# Tạo thư mục gốc của dự án
mkdir -p {services/{user-service,hotel-service,booking-service,rating-service},nginx,database,kubernetes,monitoring/{prometheus,grafana}}

# Tạo thư mục con cho các microservice
for service in user-service hotel-service booking-service rating-service
do
  mkdir -p services/$service/src/{controllers,models,routes}
done

# Tạo các tệp tin cơ bản cho từng dịch vụ
for service in user-service hotel-service booking-service rating-service
do
  touch services/$service/{Dockerfile,package.json}
  touch services/$service/src/{index.js,db.js,config.js}
  touch services/$service/src/controllers/{authController.js,userController.js}
  touch services/$service/src/models/{userModel.js,hotelModel.js,bookingModel.js,ratingModel.js}
  touch services/$service/src/routes/{authRoutes.js,userRoutes.js,hotelRoutes.js,bookingRoutes.js,ratingRoutes.js}
done

# Tạo các tệp tin cơ bản cho NGINX
touch nginx/{nginx.conf,Dockerfile}

# Tạo các tệp tin cơ bản cho cơ sở dữ liệu
touch database/{init.sql,Dockerfile}

# Tạo các tệp tin triển khai Kubernetes cho từng dịch vụ
for service in user-service hotel-service booking-service rating-service
do
  touch kubernetes/$service-deployment.yaml
  touch kubernetes/$service-service.yaml
done

# Tạo các tệp tin triển khai Kubernetes cho NGINX
touch kubernetes/{nginx-deployment.yaml,nginx-service.yaml}

# Tạo các tệp tin triển khai Kubernetes cho PostgreSQL
touch kubernetes/{postgres-deployment.yaml,postgres-service.yaml}

# Tạo các tệp tin cấu hình giám sát
touch monitoring/prometheus/prometheus.yaml
touch monitoring/grafana/grafana.ini

# Tạo thư mục con và tệp tin cho Grafana
mkdir -p monitoring/grafana/{dashboards,datasources}

# Tạo tệp README.md
touch README.md

echo "Cấu trúc thư mục đã được tạo thành công!"
