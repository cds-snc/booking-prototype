const NotifyClient = require("notifications-node-client").NotifyClient;

if((!process.env.NOTIFY_API_KEY || !process.env.NOTIFY_API_BASE_URL) && process.env.NODE_ENV !=="test"){
  throw new Error("MISSING NOTIFY_API_KEY or NOTIFY_API_BASE_URL for NotifyClient")
}

const key = process.env.NOTIFY_API_KEY;
const baseUrl = process.env.NOTIFY_API_BASE_URL;

const notifyClient =
  process.env.NODE_ENV !== "test" ? new NotifyClient(baseUrl, key) : false;

const sendNotification = async (params = { email: null, templateId: null, options: {} }) => {
  const { templateId, email, options } = params;

  if (!templateId || !email) {
    console.log("no template ID or email was passed");
    return false;
  }

  try {
    const response = notifyClient.sendEmail(templateId, email, options);
    return response.body;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

module.exports = {
  sendNotification,
  notifyClient,
};