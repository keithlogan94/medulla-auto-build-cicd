



if [ ! -d "medulla-frontend" ]; then
    echo "directory does not exist";
    git clone https://github.com/recro/medulla-frontend.git

else
    echo "directory does exist";

fi


while [ true ]
do

echo "waiting 10 seconds";
sleep 10
echo "checking if system needs to rebuild docker image";
COMMIT_HASH=$(git ls-remote https://github.com/recro/medulla-frontend.git HEAD | awk '{ print $1}')
echo "$COMMIT_HASH";

LOCAL_ALL_HASHES=$(git --git-dir=./medulla-frontend/.git log -100  --pretty=format:"%H")

#echo "$LOCAL_ALL_HASHES"

if [[ "$LOCAL_ALL_HASHES" == *"$COMMIT_HASH"* ]]; then
  echo "It's there."
fi


done



# build docker image
# cd medulla-frontend/frontend/
# docker build -t medulla-frontend .

# push image to 








