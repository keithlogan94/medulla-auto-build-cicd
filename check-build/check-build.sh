# wget https://raw.github.com/recro/medulla-frontend/main/auto_build_and_deploy.sh && chmod +x auto_build_and_deploy.sh && ./auto_build_and_deploy.sh

if [ ! -d "medulla-frontend" ]; then
  echo "directory does not exist";
  git clone https://github.com/recro/medulla-frontend.git
else
  echo "directory does exist";
fi


while true
do
  echo "waiting 300 seconds";
  sleep 300
  echo "checking if system needs to rebuild docker image";
  COMMIT_HASH=$(git ls-remote https://github.com/recro/medulla-frontend.git HEAD | awk '{ print $1}')
  echo "$COMMIT_HASH";

  LOCAL_ALL_HASHES=$(git --git-dir=./medulla-frontend/.git log -100  --pretty=format:"%H")

  if [[ "$LOCAL_ALL_HASHES" == *"$COMMIT_HASH"* ]]; then
    echo "It's there."
  else
    echo "local repository does not contain the latest hash so rebuilding";
    /app/build.sh
#    git --git-dir=./medulla-frontend/.git fetch
#    git --git-dir=./medulla-frontend/.git reset --hard origin/main
#    echo "building docker file";
#    cd "$(dirname "$0")" || exit 1
#    cd ./medulla-frontend/frontend/ || exit 1
#    docker rmi recrodeveloper/medulla-frontend:latest
#    docker build -t recrodeveloper/medulla-frontend:latest .
#    cd ../../
#    docker push recrodeveloper/medulla-frontend:latest
#    docker stop medulla
#    docker run -d --rm -p 80:5000 --name=medulla recrodeveloper/medulla-frontend:latest
  fi
done