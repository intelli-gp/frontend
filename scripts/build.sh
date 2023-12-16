# Remove the old image 
docker rm  intelligp-frontend

# Build the new image
docker build -t intelligp-frontend .


# Stop and remove the old container
docker stop intelligp-frontend-container
docker rm intelligp-frontend-container

# Run the new container
docker run -d --name nest-frontend-container -p 8000:8000 intelligp-frontend
