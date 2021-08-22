
rm -rf main.zip medulla-frontend-main/
echo "downloading medulla";
wget https://github.com/recro/medulla-frontend/archive/main.zip
echo "unzipping medulla";
unzip main.zip
cd medulla-frontend-main/frontend/
docker login --username "$DOCKER_USERNAME" --password "$DOCKER_PASSWORD"
docker build -t recrodeveloper/medulla-frontend:latest .
docker push recrodeveloper/medulla-frontend:latest







