

docker exec build-image /bin/sh /app/build.sh
docker pull recrodeveloper/medulla-frontend:latest
docker stop medulla
docker run -d --rm -p 80:5000 --name=medulla recrodeveloper/medulla-frontend:latest

