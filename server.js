import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;



const notifications = [
    {
        id:1,
        target_userId:101,
        notification_type:'email',
        message:'Welcome',
        status:'sent'

    },
    {
        id:2,
        target_userId:101,
        notification_type:'in-app',
        message:'New Notification',
        status:'sent'
    },
    {
        id:3,
        target_userId:102,
        notification_type:'email',
        message:'Welcome',
        status:'sent'
    },
    {
        id:4,
        target_userId:103,
        notification_type:'sms',
        message:'Welcome',
        status:'sent'
    }

]

const users = [
    {
        userId: 101,
        emailId:'idemail@gmail.com',
        number: '9876543210',
        notifications: [1,2]
    },
    {
        userId: 102,
        emailId:'emidail@gmail.com',
        number:'8765432109',
        notifications: [3]
    },
    {
        userId: 103,
        emailId:'emailid@gmail.com',
        number:'7654321098',
        notifications: [4]
    }
]

const NotificationStatus = ['sent', 'failed'];

const savedRequests = [];

let lastId = 4;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('📣 Welcome to the Notification System API! Check the README for usage.');
});


app.get("/users/:id/notifications", (req,res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.userId === id);
    if(user)
    {
        const userNotifications = notifications.filter(n => user.notifications.includes(n.id));
        res.json(userNotifications);
    }
    else
    {
        res.send("No user found!");
    }
    
})

function sendNotification(id, target_userId, notification_type, message)
{
    const statusOfNotification = Math.floor(Math.random()*NotificationStatus.length);
    const status = NotificationStatus[statusOfNotification];

    return {
        id: id,
        target_userId: target_userId,
        notification_type:  notification_type,
        message: message,
        status: status
    }
}

app.post("/notifications", (req,res) => {
    
    const newId = lastId + 1;
    let newNotification = sendNotification(newId, req.body.target_userId, req.body.notification_type, req.body.message);
    savedRequests.push(newNotification);

    if(newNotification.status != 'failed' )
    {
        notifications.push(newNotification);
        lastId++;
        const user = users.find(u => u.userId === newNotification.target_userId);
        if(!user) {
            return res.status(404).json(
                {
                    error: 'User not found!'
                });
        }
        user.notifications.push(newNotification.id);
        res.json(
            {
                message: "Notification sent successfully!", 
                data: newNotification
            });
    }
    else
    {
        let count = 0;
        while(count!=3 && newNotification.status != 'sent')
        {
            newNotification = sendNotification(newId, req.body.target_userId, req.body.notification_type, req.body.message);
            count++;
        }
        if (newNotification.status === 'sent') {
            notifications.push(newNotification);
            lastId++;
            const user = users.find(u => u.userId === newNotification.target_userId);
            if (!user) {
                return res.status(404).json(
                    { 
                        error: 'User not found after retry!' 
                    });
            }
            user.notifications.push(newNotification.id);
            return res.json(
                { 
                    message: `Notification sent successfully after ${count} retry attempt(s)!`, 
                    data: newNotification 
                });
        } else {
            return res.status(500).json(
                { 
                    message: `Notification failed.`, 
                    data: newNotification 
                });
        }
    } 
})

app.listen(port, () => {
    console.log(`Api is running on port ${port}`);
})
