

echo "local repository does not contain the latest hash so rebuilding";
git --git-dir=./medulla-frontend/.git fetch
git --git-dir=./medulla-frontend/.git reset --hard origin/main
echo "building docker file";
cd "$(dirname "$0")" || exit 1
cd ./medulla-frontend/frontend/ || exit 1
docker rmi recrodeveloper/medulla-frontend:latest
docker build -t recrodeveloper/medulla-frontend:latest .
cd ../../
docker push recrodeveloper/medulla-frontend:latest
docker stop medulla
docker run -d --rm -p 80:5000 --name=medulla recrodeveloper/medulla-frontend:latest




