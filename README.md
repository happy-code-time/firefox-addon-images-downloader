## Install npm packages to develop the addon locally

    rm -rf package-lock.json
    npm cache clear --force
    npm install
    
## Add html files, background and content script 

    npm run compile

## Popup window (React scripts)

- Work on the popup window in `production` mode
    
        npm run build:popup

- Work on the popup window in `development` mode
    
        npm run build:popup:dev

## Dashboard window (React scripts)

- Work on the dashboard window in `production` mode
    
        npm run build:dashboard

- Work on the dashboard window in `development` mode
    
        npm run build:dashboard:dev
