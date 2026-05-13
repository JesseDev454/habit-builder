const Notification = require("../models/Notification");

const createNotification = async ({ user, type = "system", title, message, metadata = {} }) => {
  try {
    if (!user || !title || !message) return null;
    return await Notification.create({ user, type, title, message, metadata });
  } catch {
    return null;
  }
};

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
    res.status(200).json({ notifications });
  } catch (error) {
    next(error);
  }
};

const markNotificationRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({ notification });
  } catch (error) {
    next(error);
  }
};

const markAllNotificationsRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createNotification, getNotifications, markAllNotificationsRead, markNotificationRead };
