## Reminder Service 

- Basic Configuration for Sequelize in `src/config` folder. Add new file `config.json` and add this.
```
    {
        "development": {
            "username": <YOUR_DATABASE_LOGIN_NAME>,
            "password": <YOUR_DATABASE_PASSWORD>,
            "database": <YOUR_DATABASE_NAME>,
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
    }
```

- Create New Database and Migrate it.
```npx sequelize db:create```

- Generate New Sequelize Mode
```npx sequelize model:generate --name NotificationTicket --attributes subject:string,content:string,recepientEmail:string,status:enum,notificationTime:date```

- Migrate the Changes to Database.
```npx sequelize db:migrate```

# Message Queue
```
    - [qps] -> query per secound !!
    -  [Service 1 (100qps)] ----------------> [Service 2 (20 qps)]
    # Solution 
    - [Service 1 (100qps) Publisher] ----------> Message Queue [msg1,msg2 .... msg n] ----------> [Service 2 (20 qps) Subscriber]
    
 ```