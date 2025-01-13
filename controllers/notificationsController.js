import Notification from "../models/notifications.js";

export const retrieveNotification = async (req, res) => {
    try {
        let notifications = await Notification.find({ team: req.user.team, user: { $ne: req.user.id } })
            .sort({ createdAt: -1 })
            .limit(10);
        // console.log(notifications)
        res.status(200).json({
            notifications
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

export const viewNotification = async (req, res) => {
    try {
        await Notification.updateMany(
            { team: req.user.team },
            { $set: { view: true } },
            { sort: { createdAt: -1 }, limit: 10 }
        );
        res.status(200).json({
            msg: "View Notifications"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

