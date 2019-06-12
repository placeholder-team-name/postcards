
ssh ec2-user@ec2-54-236-149-247.compute-1.amazonaws.com << EOF
cd postcards
git pull origin development
cd backend

sudo -s

pm2 delete index

export TLS_CERT=/etc/letsencrypt/live/uwinfotutor.me/fullchain.pem
export TLS_KEY=/etc/letsencrypt/live/uwinfotutor.me/privkey.pem
source ./sendgrid.env

pm2 start index
pm2 startup
pm2 save


EOF