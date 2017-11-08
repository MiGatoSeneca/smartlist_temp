# Upstreams
# Note: if you want to run multiple meteor apps on the same server,
# make sure you define a separate port for each.
upstream citious {
    server 127.0.0.1:8000;
}

upstream app_citious {
    server 127.0.0.1:8001;
}

# HTTP Server
server {
    listen 80;
    server_name *.citious.com;
    location / {
        proxy_pass http://citious/;
        proxy_redirect off;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
server {
    listen 80;
    server_name  app.citious.com;
    charset UTF-8;
    location / {
        proxy_pass http://app_citious;
        proxy_redirect off;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
