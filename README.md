# bravia-api for OpenHab
Simple API interface for TV Bravia

## Build to use with OpenHab or simply by using your browser
1. Clone repo
2. Run: `npm install` or `yarn install`
3. Edit `app/config/tv.json` and add your TV ip, port and password
4. Run: `node server.js`

Additionally, you can run:
```
PORT=8800 node server.js
```
To not interfere with OpenHabs ports

## On linux
You can set up supervisor to run this task as such:
Create a .conf file on: `/etc/supervisor/conf.d/` and add the folowing
```ruby
[program:bravia-api]
environment=PORT="8800"
command=node /home/openhabian/scripts/bravia-api/server.js
redirect_stderr=true
stdout_logfile=/var/log/bravia_api.log
stderr_logfile=/var/log/bravia_api.error_log
user=openhabian
autostart=true
autorestart=true
stopsignal=QUIT
```

Run: `supervisorctl reread && supervisorctl update`

The task should now be runing.
