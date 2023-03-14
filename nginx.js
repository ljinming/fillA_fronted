// server {
//     listen 80;

//     server_name www.filadoge.fun filadoge.fun;

//     return 301 https://$host$request_uri;
// }

// server {
//     listen       443 ssl;

//     server_name  filadoge.fun filadoge.fun;

//     gzip on;
//     gzip_min_length 1k;
//     gzip_comp_level 5;
//     gzip_types  text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
//     gzip_vary on;

//     client_max_body_size 20m;

//     ssl_certificate_key        /opt/certificates/key.key;
//     ssl_certificate             /opt/certificates/key.pem;

//     access_log /var/log/nginx/fill/access.log;
//     error_log /var/log/nginx/fill/error.log;

//     location / {
//         root /opt/FILLA/build;
//         try_files $uri $uri/ /index.html;
//     }
// }