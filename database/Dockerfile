FROM postgres:13

# Add the init.sql script to the Docker image
COPY init.sql /docker-entrypoint-initdb.d/

# Set environment variables for the database
ENV POSTGRES_DB=your_db_name
ENV POSTGRES_USER=your_db_user
ENV POSTGRES_PASSWORD=your_db_password
